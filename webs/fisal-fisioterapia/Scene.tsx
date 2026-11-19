import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

const N = 22;
const bone = new THREE.MeshPhysicalMaterial({ color: '#f3efe6', roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.3 });
const disc = new THREE.MeshPhysicalMaterial({ color: '#ff7b6b', roughness: 0.3, clearcoat: 0.8, transmission: 0.2, thickness: 0.2 });

/** A spine as a spring chain: each vertebra eases toward a bend set by the pointer, the lower ones lagging behind. */
function Spine({ reduced }: { reduced: boolean }) {
  const segs = useRef<THREE.Group[]>([]);
  const vel = useRef(new Float32Array(N));
  const ang = useRef(new Float32Array(N));
  const t = useRef(0);
  const fit = useFitScale(2.6);

  useFrame((_, dt) => {
    const d = Math.min(dt, 1 / 30);
    t.current += d;
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      // natural S-curve (lordosis/kyphosis) plus a pointer-driven lateral bend
      const natural = Math.sin(u * Math.PI * 2) * 0.05;
      const breathe = reduced ? 0 : Math.sin(t.current * 1.2 + u * 3) * 0.012;
      const target = natural + tilt.x * 0.06 * Math.sin(u * Math.PI) + breathe;
      const k = 70 - u * 40;
      const f = (target - ang.current[i]) * k - vel.current[i] * 8;
      vel.current[i] += f * d;
      ang.current[i] += vel.current[i] * d;
      const g = segs.current[i];
      if (g) {
        g.rotation.z = ang.current[i];
        g.rotation.x = -tilt.y * 0.02;
      }
    }
  });

  // Nested chain so bends accumulate like a real column.
  const chain = (i: number): React.ReactNode => {
    if (i >= N) return null;
    const u = i / (N - 1);
    const w = THREE.MathUtils.lerp(0.42, 0.75, u); // vertebrae widen toward the lumbar end
    const h = THREE.MathUtils.lerp(0.14, 0.22, u);
    return (
      <group
        ref={(el) => {
          if (el) segs.current[i] = el;
        }}
        position={[0, i === 0 ? 0 : -(h + 0.06), 0]}
      >
        <RoundedBox args={[w, h, w * 0.7]} radius={h * 0.4} smoothness={3} material={bone} />
        {/* spinous process */}
        <mesh material={bone} position={[0, -0.02, -w * 0.45]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[h * 0.35, w * 0.55, 10]} />
        </mesh>
        {/* transverse processes */}
        {[-1, 1].map((s) => (
          <mesh key={s} material={bone} position={[s * w * 0.55, 0, -w * 0.12]} rotation={[0, 0, s * Math.PI / 2]}>
            <coneGeometry args={[h * 0.3, w * 0.35, 8]} />
          </mesh>
        ))}
        <mesh material={disc} position={[0, -h / 2 - 0.03, 0]}>
          <cylinderGeometry args={[w * 0.42, w * 0.42, 0.05, 24]} />
        </mesh>
        {chain(i + 1)}
      </group>
    );
  };

  return (
    <group scale={0.6 * fit} position={[0, 1.7 * fit, 0]} rotation={[0, -0.6, 0]}>
      {chain(0)}
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0, 7], fov: 34 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.1)}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 1]} intensity={0.6} color="#9fc3ef" />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={1.4} color="#ffffff" scale={[3, 8, 1]} position={[3, 0, 3]} rotation-y={-Math.PI / 4} />
        <Lightformer form="rect" intensity={0.8} color="#1f5fad" scale={[3, 8, 1]} position={[-3, 0, 2]} rotation-y={Math.PI / 4} />
      </Environment>
      <Spine reduced={reduced} />
    </SceneCanvas>
  );
}
