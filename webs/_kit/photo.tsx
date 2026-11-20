/*
 * Photoreal stage shared by the hero scenes. Imported only from lazy scene modules.
 *  - GLB with KTX2 (Basis) textures and Meshopt geometry, desktop/mobile variants.
 *  - Image-based lighting from a small Poly Haven HDRI + key / fill / rim lights with soft shadows.
 *  - AgX tone mapping, sRGB output, exposure per scene.
 *  - Adaptive quality: PerformanceMonitor drops post-processing and DPR below ~50 fps.
 *  - Restrained post: N8AO, highlight-only bloom, light DoF, near-invisible CA, vignette, fine grain.
 *  - Product rotation with inertia (drag + fling), damped pointer tilt and a slight hand-held sway.
 */
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, ContactShadows, Environment, PerformanceMonitor, useGLTF } from '@react-three/drei';
import { EffectComposer, N8AO, Bloom, DepthOfField, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { tilt } from './tilt';
import imperfectionsUrl from './assets/imperfections.webp?url';

export const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px), (pointer: coarse)').matches;

// Pages live at /webs/<slug>/; the Basis transcoder is published once at the site root.
const BASIS_PATH = new URL('../../basis/', typeof location !== 'undefined' ? location.href : 'http://x/webs/a/').href;
let ktx2: KTX2Loader | null = null;

/** useGLTF wired for KTX2 + Meshopt. Picks the mobile variant on small/touch screens. */
export function usePhotoModel(urls: { desktop: string; mobile: string }) {
  const gl = useThree((s) => s.gl);
  const url = isMobile() ? urls.mobile : urls.desktop;
  return useGLTF(url, false, true, (loader) => {
    if (!ktx2) ktx2 = new KTX2Loader().setTranscoderPath(BASIS_PATH).detectSupport(gl);
    loader.setKTX2Loader(ktx2 as unknown as Parameters<typeof loader.setKTX2Loader>[0]);
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
}

/** Rotation with momentum: drag/fling to spin, eases out; pointer tilt and slow idle drift when untouched. */
export function useInertialRotation(
  ref: React.RefObject<THREE.Object3D | null>,
  opts: { idle?: number; tiltStrength?: [number, number]; reduced?: boolean; base?: [number, number] } = {},
) {
  const { idle = 0.06, tiltStrength = [0.18, 0.35], reduced = false, base = [0, 0] } = opts;
  const { gl } = useThree();
  const st = useRef({ drag: false, lastX: 0, lastT: 0, vel: 0, yaw: base[1], pitch: base[0] });
  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      st.current.drag = true;
      st.current.lastX = e.clientX;
      st.current.lastT = performance.now();
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!st.current.drag) return;
      const now = performance.now();
      const dx = e.clientX - st.current.lastX;
      const dt = Math.max(1, now - st.current.lastT);
      st.current.yaw += dx * 0.008;
      st.current.vel = ((dx * 0.008) / dt) * 1000; // rad/s
      st.current.lastX = e.clientX;
      st.current.lastT = now;
    };
    const up = () => (st.current.drag = false);
    el.style.touchAction = 'pan-y';
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [gl]);
  useFrame((_, dt) => {
    const o = ref.current;
    if (!o) return;
    const d = Math.min(dt, 0.05);
    const s = st.current;
    if (!s.drag) {
      s.yaw += s.vel * d;
      s.vel *= Math.exp(-2.6 * d); // friction: a fling settles in ~1.5 s
      if (!reduced) s.yaw += idle * d;
    }
    const targetYaw = s.yaw + tilt.x * tiltStrength[1];
    const targetPitch = s.pitch - tilt.y * tiltStrength[0];
    o.rotation.y = THREE.MathUtils.damp(o.rotation.y, targetYaw, s.drag ? 18 : 6, d);
    o.rotation.x = THREE.MathUtils.damp(o.rotation.x, targetPitch, 4, d);
  });
}

/** A slow, low-amplitude hand-held drift on the camera; never noticeable as "motion". */
function HandheldCamera({ target, reduced }: { target: [number, number, number]; reduced: boolean }) {
  const camera = useThree((s) => s.camera);
  const base = useRef<THREE.Vector3 | null>(null);
  const look = useMemo(() => new THREE.Vector3(...target), [target]);
  useFrame(({ clock }) => {
    if (!base.current) base.current = camera.position.clone();
    const t = clock.elapsedTime;
    const a = reduced ? 0 : 1;
    camera.position.set(
      base.current.x + (Math.sin(t * 0.31) * 0.02 + Math.sin(t * 0.73) * 0.008) * a,
      base.current.y + (Math.sin(t * 0.47 + 1) * 0.015 + Math.sin(t * 0.91) * 0.006) * a,
      base.current.z,
    );
    camera.lookAt(look);
  });
  return null;
}

function ReadyProbe({ onReady }: { onReady: () => void }) {
  const n = useRef(0);
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    if (++n.current > 3) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

/** Exposes measured FPS on window.__fps and, with ?fps in the URL, as a small overlay. */
function FpsProbe() {
  const frames = useRef<number[]>([]);
  useFrame(() => {
    const now = performance.now();
    frames.current.push(now);
    while (frames.current.length && now - frames.current[0] > 2000) frames.current.shift();
    const fps = (frames.current.length - 1) / ((now - frames.current[0]) / 1000 || 1);
    (window as unknown as { __fps: number }).__fps = Math.round(fps);
    const el = document.getElementById('kit-fps');
    if (el) el.textContent = `${Math.round(fps)} fps`;
  });
  useEffect(() => {
    if (!new URLSearchParams(location.search).has('fps')) return;
    const el = document.createElement('div');
    el.id = 'kit-fps';
    el.style.cssText = 'position:fixed;right:10px;top:10px;z-index:99999;font:600 12px/1 system-ui;padding:6px 8px;border-radius:6px;background:#000c;color:#fff';
    document.body.appendChild(el);
    return () => el.remove();
  }, []);
  return null;
}

export type Lighting = {
  hdr: string;
  envIntensity?: number;
  envRotation?: [number, number, number];
  exposure?: number;
  key?: { position: [number, number, number]; intensity: number; color?: string };
  fill?: { position: [number, number, number]; intensity: number; color?: string };
  rim?: { position: [number, number, number]; intensity: number; color?: string };
  shadow?: { y: number; opacity?: number; blur?: number; scale?: number; color?: string };
};

export type PostFx = { ao?: number; bloom?: number; dof?: { focus: number; bokeh: number } | false; grain?: number; vignette?: number };

type StageProps = {
  active: boolean;
  reduced: boolean;
  onReady: () => void;
  lighting: Lighting;
  post?: PostFx;
  camera: { position: [number, number, number]; fov?: number; target?: [number, number, number] };
  children: ReactNode;
};

export function PhotoStage({ active, reduced, onReady, lighting, post = {}, camera, children }: StageProps) {
  const [tier, setTier] = useState<'high' | 'low'>(() => (isMobile() ? 'low' : 'high'));
  const target = camera.target ?? [0, 0, 0];
  const L = lighting;
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, tier === 'high' ? 1.75 : 1.25]}
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: camera.position, fov: camera.fov ?? 26, near: 0.1, far: 60 }}
      gl={{ antialias: tier === 'low', alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl, camera: c }) => {
        gl.toneMapping = THREE.AgXToneMapping;
        gl.toneMappingExposure = L.exposure ?? 1;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        c.lookAt(...target);
      }}
    >
      <PerformanceMonitor onDecline={() => setTier('low')} onIncline={() => !isMobile() && setTier('high')} flipflops={2} onFallback={() => setTier('low')} />
      <AdaptiveDpr pixelated={false} />
      <Suspense fallback={null}>
        <Environment files={L.hdr} environmentIntensity={L.envIntensity ?? 1} environmentRotation={L.envRotation ?? [0, 0, 0]} />
        {L.key && <directionalLight position={L.key.position} intensity={L.key.intensity} color={L.key.color ?? '#ffffff'} castShadow shadow-mapSize={tier === 'high' ? [2048, 2048] : [1024, 1024]} shadow-bias={-0.0004} shadow-normalBias={0.02} shadow-radius={6} />}
        {L.fill && <directionalLight position={L.fill.position} intensity={L.fill.intensity} color={L.fill.color ?? '#ffffff'} />}
        {L.rim && <directionalLight position={L.rim.position} intensity={L.rim.intensity} color={L.rim.color ?? '#ffffff'} />}
        {children}
        {L.shadow && <ContactShadows position={[0, L.shadow.y, 0]} opacity={L.shadow.opacity ?? 0.45} blur={L.shadow.blur ?? 2.6} scale={L.shadow.scale ?? 6} far={2.5} resolution={tier === 'high' ? 1024 : 512} color={L.shadow.color ?? '#000000'} frames={reduced ? 1 : Infinity} />}
        {tier === 'high' ? (
          <EffectComposer multisampling={4} enableNormalPass={false}>
            <N8AO aoRadius={0.35} intensity={post.ao ?? 1.4} distanceFalloff={0.6} quality="medium" halfRes />
            <Bloom intensity={post.bloom ?? 0.18} luminanceThreshold={0.92} luminanceSmoothing={0.15} mipmapBlur />
            {post.dof ? <DepthOfField focusDistance={post.dof.focus} focalLength={0.04} bokehScale={post.dof.bokeh} /> : <></>}
            <ChromaticAberration offset={new THREE.Vector2(0.00035, 0.00025)} radialModulation modulationOffset={0.6} />
            <Vignette offset={0.32} darkness={post.vignette ?? 0.28} />
            <Noise premultiply opacity={post.grain ?? 0.045} blendFunction={BlendFunction.OVERLAY} />
          </EffectComposer>
        ) : (
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Vignette offset={0.32} darkness={post.vignette ?? 0.24} />
            <Noise premultiply opacity={(post.grain ?? 0.045) * 0.7} blendFunction={BlendFunction.OVERLAY} />
          </EffectComposer>
        )}
      </Suspense>
      <HandheldCamera target={target} reduced={reduced} />
      <ReadyProbe onReady={onReady} />
      <FpsProbe />
    </Canvas>
  );
}

/** Applies shadows to every mesh of a loaded scene and gently tunes materials (no flat colours). */
export function prepareScene(root: THREE.Object3D, tweak?: (m: THREE.MeshStandardMaterial, mesh: THREE.Mesh) => void) {
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((m) => {
      const sm = m as THREE.MeshStandardMaterial;
      if (sm.map) sm.map.anisotropy = 8;
      tweak?.(sm, mesh);
      sm.needsUpdate = true;
    });
  });
  return root;
}

/* ------------------------------------------------------------------------------------------ */
/* PhotoHero: the common case — one scanned model, fitted, with inertia and microvariation.   */
/* ------------------------------------------------------------------------------------------ */


let imperfections: THREE.Texture | null = null;
/** Shared fingerprint/smudge roughness map (ambientCG Fingerprints002, CC0). */
function getImperfections() {
  if (!imperfections) {
    imperfections = new THREE.TextureLoader().load(imperfectionsUrl);
    imperfections.wrapS = imperfections.wrapT = THREE.RepeatWrapping;
    imperfections.colorSpace = THREE.NoColorSpace;
  }
  return imperfections;
}

export type Finish = {
  /** Lacquer / wet layer. */
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
  sheenColor?: string;
  sheenRoughness?: number;
  /** Glass and liquids. */
  transmission?: number;
  ior?: number;
  thickness?: number;
  attenuationColor?: string;
  attenuationDistance?: number;
  iridescence?: number;
  /** Multiplies the base colour (keeps the albedo map). */
  tint?: string;
  /** Replaces the albedo map with a colour (for scans whose texture is baked lighting or noise). */
  color?: string;
  /** Pulls chroma out of an over-saturated scan albedo (0 = none, 1 = grey). */
  desaturate?: number;
  /** Overrides when the scan has no maps for them. */
  roughness?: number;
  metalness?: number;
  envMapIntensity?: number;
  /** Scales the scan's emissive map (0 removes baked glints). */
  emissive?: number;
  /** Repeats of the fingerprint map on materials that have no roughness map of their own. */
  micro?: number;
};

/** Converts a glTF standard material into a physical one with the given finish, keeping every map. */
export function physicalFrom(m: THREE.MeshStandardMaterial, f: Finish = {}) {
  const p = new THREE.MeshPhysicalMaterial();
  THREE.MeshStandardMaterial.prototype.copy.call(p, m);
  // Standard.copy() resets the shader defines to STANDARD only; physical features need PHYSICAL back.
  p.defines = { STANDARD: '', PHYSICAL: '' };
  p.name = m.name;
  if (f.color) {
    p.map = null;
    p.color = new THREE.Color(f.color);
  }
  if (f.tint) p.color.multiply(new THREE.Color(f.tint));
  if (f.roughness !== undefined && !m.roughnessMap) p.roughness = f.roughness;
  if (f.metalness !== undefined && !m.metalnessMap) p.metalness = f.metalness;
  if (!m.roughnessMap && (f.micro ?? 3) > 0) {
    const t = getImperfections().clone();
    t.repeat.set(f.micro ?? 3, f.micro ?? 3);
    t.needsUpdate = true;
    p.roughnessMap = t;
  }
  p.clearcoat = f.clearcoat ?? 0;
  p.clearcoatRoughness = f.clearcoatRoughness ?? 0.25;
  p.sheen = f.sheen ?? 0;
  if (f.sheenColor) p.sheenColor = new THREE.Color(f.sheenColor);
  p.sheenRoughness = f.sheenRoughness ?? 0.6;
  if (f.transmission) {
    p.transmission = f.transmission;
    p.thickness = f.thickness ?? 0.5;
    p.transparent = false;
  }
  if (f.ior) p.ior = f.ior;
  if (f.attenuationColor) p.attenuationColor = new THREE.Color(f.attenuationColor);
  if (f.attenuationDistance) p.attenuationDistance = f.attenuationDistance;
  if (f.iridescence) p.iridescence = f.iridescence;
  if (f.envMapIntensity !== undefined) p.envMapIntensity = f.envMapIntensity;
  if (f.emissive !== undefined) p.emissiveIntensity = f.emissive;
  if (f.desaturate) {
    const k = (1 - f.desaturate).toFixed(3);
    p.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `#include <map_fragment>\n  diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114))), diffuseColor.rgb, ${k});`,
      );
    };
    p.customProgramCacheKey = () => 'desat' + k;
  }
  return p;
}

/** One finish for every material, or a function that picks one per material (null keeps it as is). */
export type FinishSpec = Finish | ((m: THREE.MeshStandardMaterial, mesh: THREE.Mesh) => Finish | null);

type FitProps = {
  urls: { desktop: string; mobile: string };
  /** Largest dimension after fitting, in world units. */
  size: number;
  /** Orientation of the raw model before it is measured (fixes Z-up scans). */
  orient?: [number, number, number];
  /** Finish for every material, or per material name / per material. */
  finish?: FinishSpec;
  /** Hide meshes whose name or material name matches (props, plinths baked into a scan). */
  hide?: RegExp;
};

/** Loads, re-materials and fits a model so its largest side is `size`, centred on the origin. */
export function FittedModel({ urls, size, orient = [0, 0, 0], finish = {}, hide }: FitProps) {
  const { scene } = usePhotoModel(urls);
  const holder = useMemo(() => {
    const root = scene.clone(true);
    root.rotation.set(...orient);
    if (hide) root.traverse((o) => ((o as THREE.Mesh).isMesh && (hide.test(o.name) || hide.test(((o as THREE.Mesh).material as THREE.Material).name)) ? (o.visible = false) : null));
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const swap = (m: THREE.Material) => {
        const sm = m as THREE.MeshStandardMaterial;
        if (!sm.isMeshStandardMaterial) return m;
        if (sm.map) sm.map.anisotropy = 8;
        const f = typeof finish === 'function' ? finish(sm, mesh) : finish;
        return f ? physicalFrom(sm, f) : sm;
      };
      mesh.material = Array.isArray(mesh.material) ? mesh.material.map(swap) : swap(mesh.material);
    });
    const g = new THREE.Group();
    g.add(root);
    g.updateMatrixWorld(true);
    const box = new THREE.Box3();
    root.traverse((o) => (o as THREE.Mesh).isMesh && o.visible && box.expandByObject(o));
    const dim = box.getSize(new THREE.Vector3());
    const s = size / Math.max(dim.x, dim.y, dim.z);
    root.scale.multiplyScalar(s);
    root.position.copy(box.getCenter(new THREE.Vector3()).multiplyScalar(-s));
    return g;
    // Literal props (orient, hide) are new objects on every render: key the memo on their values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, size, orient.join(','), finish, hide?.source]);
  return <primitive object={holder} />;
}

/** Wrapper that gives its children drag-to-spin inertia, pointer tilt and idle drift. */
export function Inertial({
  children,
  reduced,
  base = [0.2, -0.5],
  idle = 0.06,
  tiltStrength,
  position,
}: {
  children: ReactNode;
  reduced: boolean;
  base?: [number, number];
  idle?: number;
  tiltStrength?: [number, number];
  position?: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  useInertialRotation(ref, { base, idle, reduced, tiltStrength });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}
