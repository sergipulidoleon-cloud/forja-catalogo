import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Generic cordless clipper (no brand): body, orange grip band, steel blade with teeth. Buzzes while hovered. */
function Clipper({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const buzz = useRef(0);
  const t = useRef(0);
  const fit = useFitScale(3.4);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    buzz.current = THREE.MathUtils.damp(buzz.current, hovered.current && !reduced ? 1 : 0, 12, d);
    if (body.current) {
      const b = buzz.current;
      body.current.position.x = Math.sin(t.current * 90) * 0.012 * b;
      body.current.position.z = Math.cos(t.current * 77) * 0.01 * b;
      body.current.rotation.z = Math.sin(t.current * 83) * 0.012 * b;
    }
    if (root.current) {
      const idle = reduced ? 0 : Math.sin(t.current * 0.6) * 0.15;
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.5 + tilt.x * 0.7 + idle, 3, d);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -tilt.y * 0.3, 3, d);
    }
  });

  return (
    <group ref={root} scale={fit} rotation={[0, 0, -0.35]}>
      <group
        ref={body}
        onPointerOver={() => (hovered.current = true)}
        onPointerOut={() => (hovered.current = false)}
        onPointerDown={() => (hovered.current = true)}
        onPointerUp={() => (hovered.current = false)}
      >
        {/* body */}
        <RoundedBox args={[0.78, 2.4, 0.52]} radius={0.24} smoothness={6} position={[0, -0.2, 0]}>
          <meshPhysicalMaterial color="#1c1d1f" roughness={0.35} clearcoat={0.8} clearcoatRoughness={0.3} />
        </RoundedBox>
        {/* grip band */}
        <RoundedBox args={[0.8, 0.7, 0.54]} radius={0.22} smoothness={6} position={[0, -0.75, 0]}>
          <meshStandardMaterial color="#ff5a1f" roughness={0.55} />
        </RoundedBox>
        {/* knurled texture rings */}
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[0, -0.48 - i * 0.1, 0.27]} scale={[0.6, 0.012, 0.02]}>
            <boxGeometry />
            <meshStandardMaterial color="#c9431a" />
          </mesh>
        ))}
        {/* power switch */}
        <RoundedBox args={[0.18, 0.32, 0.06]} radius={0.04} position={[0, 0.25, 0.27]}>
          <meshStandardMaterial color="#2340ff" roughness={0.4} />
        </RoundedBox>
        {/* blade head */}
        <group position={[0, 1.08, 0.02]}>
          <mesh>
            <boxGeometry args={[0.86, 0.16, 0.34]} />
            <meshStandardMaterial color="#c8ccd0" metalness={1} roughness={0.22} />
          </mesh>
          {Array.from({ length: 21 }, (_, i) => (
            <mesh key={i} position={[-0.4 + i * 0.04, 0.12, 0.08]}>
              <boxGeometry args={[0.018, 0.1, 0.12]} />
              <meshStandardMaterial color="#e6e9ec" metalness={1} roughness={0.18} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0, 6.2], fov: 32 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.1)}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} color="#ffffff" scale={[2, 8, 1]} position={[3, 0, 3]} rotation-y={-Math.PI / 4} />
        <Lightformer form="rect" intensity={1.6} color="#ff5a1f" scale={[2, 8, 1]} position={[-3, 0, 2]} rotation-y={Math.PI / 4} />
        <Lightformer form="rect" intensity={1.2} color="#2340ff" scale={[6, 2, 1]} position={[0, -3, 2]} />
      </Environment>
      <Clipper reduced={reduced} />
      <ContactShadows position={[0, -1.85, 0]} opacity={0.5} scale={6} blur={2.4} far={3} color="#000000" />
    </SceneCanvas>
  );
}
