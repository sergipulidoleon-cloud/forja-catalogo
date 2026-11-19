import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Breath cycle (also in App.tsx for the DOM guide): 4 s in, 6 s out. Returns 0..1 lung volume. */
function breath(time: number) {
  const t = time % 10;
  if (t < 4) {
    const p = t / 4;
    return 0.5 - 0.5 * Math.cos(p * Math.PI);
  }
  const p = (t - 4) / 6;
  return 0.5 + 0.5 * Math.cos(p * Math.PI);
}

function Breather({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 14), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  const fit = useFitScale(3.4);
  const t = useRef(0);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += reduced ? 0 : d;
    // Same wall clock as the on-page breathing guide, so the sphere and the words stay in step.
    const b = reduced ? 0.5 : breath(performance.now() / 1000);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const time = t.current * 0.35;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const z = base[i * 3 + 2];
      // slow, low-frequency organic surface
      const n = Math.sin(x * 2.1 + time) * 0.5 + Math.sin(y * 2.6 - time * 1.3) * 0.35 + Math.sin(z * 1.8 + time * 0.7) * 0.4;
      const r = 1 + n * 0.07 * (0.6 + b * 0.6);
      pos.setXYZ(i, x * r, y * r, z * r);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    if (mesh.current) {
      const s = (0.86 + b * 0.22) * fit;
      mesh.current.scale.setScalar(s);
      mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, tilt.x * 0.4 + t.current * 0.05, 1.5, d);
      mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, -tilt.y * 0.3, 1.5, d);
    }
  });

  return (
    <mesh ref={mesh} geometry={geo}>
      <meshPhysicalMaterial color="#e6d7c3" roughness={0.35} sheen={1} sheenColor="#b9b4e0" sheenRoughness={0.5} clearcoat={0.4} clearcoatRoughness={0.4} iridescence={0.25} iridescenceIOR={1.3} />
    </mesh>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0, 6], fov: 32 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.05)}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#fff1e0" />
      <directionalLight position={[-4, -2, -2]} intensity={0.8} color="#8f8ac4" />
      <Environment resolution={64}>
        <Lightformer form="ring" intensity={1.2} color="#e6d7c3" scale={4} position={[2, 2, 4]} />
        <Lightformer form="rect" intensity={0.8} color="#5b5a7a" scale={[6, 6, 1]} position={[-4, 0, 1]} rotation-y={Math.PI / 3} />
      </Environment>
      <Breather reduced={reduced} />
    </SceneCanvas>
  );
}
