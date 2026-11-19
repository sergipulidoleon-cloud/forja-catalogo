import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Conical log-spiral shell with saffron/umber growth bands baked as vertex colours. */
function useShell() {
  return useMemo(() => {
    const turns = 3.2;
    const pts: THREE.Vector3[] = [];
    const radii: number[] = [];
    const steps = 220;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * turns * Math.PI * 2;
      const r = 0.06 + 0.62 * Math.pow(t, 1.35);
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, (1 - t) * 0.42));
      radii.push(0.03 + 0.4 * Math.pow(t, 1.25));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const radial = 28;
    const tube = new THREE.TubeGeometry(curve, steps, 1, radial, false);
    const pos = tube.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const p = new THREE.Vector3();
    const saffron = new THREE.Color('#e3a72f');
    const umber = new THREE.Color('#6b3a1c');
    const cream = new THREE.Color('#efe6d8');
    const c = new THREE.Color();
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const center = curve.getPoint(t);
      for (let k = 0; k <= radial; k++) {
        const idx = s * (radial + 1) + k;
        p.fromBufferAttribute(pos, idx).sub(center).normalize().multiplyScalar(radii[s]).add(center);
        pos.setXYZ(idx, p.x, p.y, p.z);
        const band = 0.5 + 0.5 * Math.sin(t * 70 + Math.sin(k / 4) * 0.6);
        c.copy(umber).lerp(saffron, band * 0.85);
        if (t > 0.97) c.lerp(cream, (t - 0.97) / 0.03);
        colors.set([c.r, c.g, c.b], idx * 3);
      }
    }
    tube.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    tube.computeVertexNormals();
    return tube;
  }, []);
}

function Snail({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const stalks = useRef<THREE.Group[]>([]);
  const shell = useShell();
  const fit = useFitScale(6.2);
  const t = useRef(0);
  const x = useRef(0);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    const g = root.current;
    if (!g) return;
    // A snail never hurries: it creeps toward the pointer at a capped speed.
    const target = THREE.MathUtils.clamp(tilt.x * 1.4, -1.4, 1.4);
    const maxStep = (reduced ? 0 : 0.22) * d;
    const delta = THREE.MathUtils.clamp(target - x.current, -maxStep, maxStep);
    x.current += delta;
    g.position.x = x.current * fit;
    const facing = Math.abs(target - x.current) < 0.02 ? 0 : Math.sign(target - x.current);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, facing < 0 ? Math.PI * 0.85 : 0.15, 2, d);
    if (body.current) {
      // Peristaltic stretch while it moves.
      const moving = Math.abs(delta) > 1e-4 ? 1 : 0;
      body.current.scale.x = 1 + (reduced ? 0 : Math.sin(t.current * 3) * 0.04 * moving);
    }
    stalks.current.forEach((s, i) => {
      if (!s) return;
      s.rotation.z = (i ? -0.25 : 0.05) + (reduced ? 0 : Math.sin(t.current * 1.7 + i) * 0.12);
      s.rotation.x = reduced ? 0 : Math.sin(t.current * 1.1 + i * 2) * 0.1 + tilt.y * 0.2;
    });
  });

  return (
    <group ref={root} scale={fit * 1.35}>
      {/* foot / body */}
      <mesh ref={body} position={[0.1, -0.52, 0]} scale={[1.45, 0.24, 0.42]}>
        <sphereGeometry args={[1, 48, 24]} />
        <meshPhysicalMaterial color="#8a7a5c" roughness={0.32} clearcoat={1} clearcoatRoughness={0.15} />
      </mesh>
      {/* head */}
      <mesh position={[1.25, -0.32, 0]} scale={[0.36, 0.3, 0.3]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshPhysicalMaterial color="#8f7f60" roughness={0.3} clearcoat={1} clearcoatRoughness={0.15} />
      </mesh>
      {[0, 1].map((i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) stalks.current[i] = el;
          }}
          position={[1.36, -0.14, i ? -0.1 : 0.1]}
        >
          <mesh position={[0.08, 0.28, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.025, 0.04, 0.56, 10]} />
            <meshPhysicalMaterial color="#8f7f60" roughness={0.3} clearcoat={1} />
          </mesh>
          <mesh position={[0.17, 0.56, 0]}>
            <sphereGeometry args={[0.055, 16, 12]} />
            <meshStandardMaterial color="#1e0a10" roughness={0.25} />
          </mesh>
        </group>
      ))}
      {/* shell */}
      <mesh geometry={shell} position={[-0.05, 0.28, 0]} rotation={[0, -0.25, 0.12]} scale={1.05}>
        <meshPhysicalMaterial vertexColors roughness={0.38} clearcoat={0.8} clearcoatRoughness={0.25} sheen={0.3} sheenColor="#efe6d8" />
      </mesh>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0.6, 6.4], fov: 32 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.1)}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffe2b0" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.4} color="#e3a72f" scale={[6, 2, 1]} position={[0, 3, 3]} />
        <Lightformer form="rect" intensity={0.8} color="#efe6d8" scale={[2, 6, 1]} position={[-4, 0, 2]} rotation-y={Math.PI / 3} />
      </Environment>
      <Snail reduced={reduced} />
      <ContactShadows position={[0, -0.76, 0]} opacity={0.55} scale={8} blur={2.4} far={1.5} color="#120408" />
    </SceneCanvas>
  );
}
