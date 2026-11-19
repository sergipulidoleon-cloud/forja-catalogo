import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Instances, Instance, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Rough land mask from a few overlapping blobs, enough to read as continents on a dot globe. */
const LAND: [number, number, number][] = [
  // lat, lon, radius (degrees)
  [50, 10, 22], [40, -3, 10], [55, 40, 28], [30, 80, 30], [45, 110, 25], [10, 20, 25], [-10, 25, 22], [-25, 135, 16],
  [45, -100, 26], [60, -110, 20], [20, -100, 12], [-10, -60, 22], [-30, -65, 14], [70, -40, 10], [35, 135, 8], [65, 90, 22],
];

function isLand(lat: number, lon: number) {
  for (const [la, lo, r] of LAND) {
    const dLat = lat - la;
    let dLon = lon - lo;
    if (dLon > 180) dLon -= 360;
    if (dLon < -180) dLon += 360;
    if (dLat * dLat + (dLon * Math.cos((lat * Math.PI) / 180)) ** 2 < r * r) return true;
  }
  return false;
}

function bubbleTexture(label: string, bg: string, fg: string) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = bg;
  g.fillRect(0, 0, 256, 128);
  g.fillStyle = fg;
  g.font = '700 72px "Josefin Sans Variable", "Josefin Sans", Arial, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(label, 128, 70);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const BUBBLES = [
  { l: 'EN', bg: '#da202a', fg: '#ffffff', r: 2.05, speed: 0.35, tilt: 0.3, phase: 0 },
  { l: 'ES', bg: '#ffd23f', fg: '#13294b', r: 2.2, speed: -0.28, tilt: -0.45, phase: 2.1 },
  { l: 'CA', bg: '#ffffff', fg: '#13294b', r: 1.95, speed: 0.22, tilt: 0.8, phase: 4.2 },
];

function Globe({ reduced }: { reduced: boolean }) {
  const globe = useRef<THREE.Group>(null);
  const bubbles = useRef<THREE.Group[]>([]);
  const t = useRef(0);
  const fit = useFitScale(5);
  const dots = useMemo(() => {
    const out: { p: [number, number, number]; land: boolean }[] = [];
    const n = 1600;
    for (let i = 0; i < n; i++) {
      // Fibonacci sphere for even spacing
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(z, x) * 180) / Math.PI;
      out.push({ p: [x * 1.4, y * 1.4, z * 1.4], land: isLand(lat, lon) });
    }
    return out;
  }, []);
  const textures = useMemo(() => BUBBLES.map((b) => bubbleTexture(b.l, b.bg, b.fg)), []);

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += reduced ? 0 : d;
    if (globe.current) {
      globe.current.rotation.y += reduced ? 0 : d * 0.12;
      globe.current.rotation.x = THREE.MathUtils.damp(globe.current.rotation.x, 0.35 - tilt.y * 0.3, 3, d);
      globe.current.rotation.z = THREE.MathUtils.damp(globe.current.rotation.z, -tilt.x * 0.2, 3, d);
    }
    bubbles.current.forEach((g, i) => {
      if (!g) return;
      const b = BUBBLES[i];
      const a = b.phase + t.current * b.speed * 2;
      g.position.set(Math.cos(a) * b.r, Math.sin(a) * b.r * Math.sin(b.tilt) * 0.6 + b.tilt * 0.4, Math.sin(a) * b.r * Math.cos(b.tilt));
      g.quaternion.copy(state.camera.quaternion);
    });
  });

  return (
    <group scale={fit}>
      <group ref={globe}>
        <mesh>
          <sphereGeometry args={[1.36, 48, 32]} />
          <meshStandardMaterial color="#13294b" roughness={0.6} />
        </mesh>
        <Instances limit={dots.length}>
          <sphereGeometry args={[0.018, 6, 4]} />
          <meshStandardMaterial roughness={0.4} />
          {dots.map((d, i) => (
            <Instance key={i} position={d.p} color={d.land ? '#ffd23f' : '#2c4a78'} scale={d.land ? 1.35 : 0.8} />
          ))}
        </Instances>
      </group>
      {BUBBLES.map((b, i) => (
        <group
          key={b.l}
          ref={(el) => {
            if (el) bubbles.current[i] = el;
          }}
        >
          <RoundedBox args={[0.7, 0.38, 0.08]} radius={0.06} smoothness={3}>
            <meshStandardMaterial color={b.bg} roughness={0.5} />
          </RoundedBox>
          <mesh position={[0, 0, 0.042]}>
            <planeGeometry args={[0.6, 0.3]} />
            <meshBasicMaterial map={textures[i]} toneMapped={false} />
          </mesh>
          <mesh position={[-0.18, -0.24, 0]} rotation={[0, 0, 0.6]}>
            <coneGeometry args={[0.07, 0.16, 3]} />
            <meshStandardMaterial color={b.bg} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0, 6.6], fov: 34 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.05)}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={1} color="#ffffff" scale={[6, 4, 1]} position={[2, 3, 4]} />
      </Environment>
      <Globe reduced={reduced} />
    </SceneCanvas>
  );
}
