import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Classic coil machine: L frame, twin copper coils, armature bar, grip tube and needle. A drop of ink falls on a loop. */
function Machine({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const armature = useRef<THREE.Group>(null);
  const drop = useRef<THREE.Mesh>(null);
  const ripple = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  const fit = useFitScale(3.6);

  const frameGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.9, -0.2);
    s.lineTo(0.7, -0.2);
    s.quadraticCurveTo(0.9, -0.2, 0.9, 0.0);
    s.lineTo(0.9, 1.3);
    s.lineTo(0.7, 1.3);
    s.lineTo(0.7, 0.05);
    s.lineTo(-0.9, 0.05);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.18, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 });
  }, []);

  const gold = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#c9a24a', metalness: 0.85, roughness: 0.32, clearcoat: 0.5 }), []);
  const iron = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2e3d', metalness: 0.8, roughness: 0.35 }), []);
  const copper = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#b5653a', metalness: 0.9, roughness: 0.3, clearcoat: 0.8 }), []);
  const ink = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#1b1e2b', roughness: 0.05, clearcoat: 1 }), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    if (armature.current && !reduced) armature.current.rotation.z = Math.sin(t.current * 60) * 0.015;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.6 + tilt.x * 0.7, 3, d);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.1 - tilt.y * 0.25, 3, d);
    }
    // ink drop: forms at the tip, falls, splashes into a ripple
    const cycle = reduced ? 0.2 : (t.current % 2.6) / 2.6;
    if (drop.current) {
      const fall = Math.max(0, (cycle - 0.35) / 0.45);
      drop.current.position.y = -1.62 - fall * fall * 1.1;
      const grow = Math.min(1, cycle / 0.35);
      drop.current.scale.setScalar(cycle > 0.8 ? 0.001 : 0.07 * grow);
      drop.current.scale.y *= 1 + fall * 0.4;
    }
    if (ripple.current) {
      const r = cycle > 0.8 ? (cycle - 0.8) / 0.2 : 0;
      ripple.current.scale.setScalar(0.05 + r * 0.6);
      (ripple.current.material as THREE.MeshBasicMaterial).opacity = r > 0 ? 0.5 * (1 - r) : 0;
    }
  });

  return (
    <group ref={root} scale={fit} position={[0, 0.25, 0]}>
      <group rotation={[0, 0, -0.08]}>
        <mesh geometry={frameGeo} material={gold} position={[0, 0, -0.09]} />
        {/* twin coils */}
        {[-0.55, -0.12].map((x) => (
          <group key={x} position={[x, 0.45, 0]}>
            <mesh material={copper}>
              <cylinderGeometry args={[0.17, 0.17, 0.7, 32]} />
            </mesh>
            {Array.from({ length: 10 }, (_, i) => (
              <mesh key={i} position={[0, -0.3 + i * 0.066, 0]} rotation={[Math.PI / 2, 0, 0]} material={copper}>
                <torusGeometry args={[0.175, 0.012, 6, 32]} />
              </mesh>
            ))}
            <mesh material={iron} position={[0, 0.38, 0]}>
              <cylinderGeometry args={[0.19, 0.19, 0.06, 32]} />
            </mesh>
          </group>
        ))}
        {/* armature bar + springs */}
        <group ref={armature} position={[0.45, 0.88, 0]}>
          <mesh material={iron} position={[-0.6, 0, 0]}>
            <boxGeometry args={[1.0, 0.07, 0.2]} />
          </mesh>
          <mesh material={gold} position={[-0.05, 0.08, 0]}>
            <boxGeometry args={[0.3, 0.025, 0.14]} />
          </mesh>
        </group>
        {/* tube vice and grip */}
        <mesh material={gold} position={[-1.05, -0.08, 0]}>
          <boxGeometry args={[0.24, 0.3, 0.3]} />
        </mesh>
        <mesh material={iron} position={[-1.05, -0.75, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 1.0, 24]} />
        </mesh>
        {Array.from({ length: 7 }, (_, i) => (
          <mesh key={i} material={gold} position={[-1.05, -0.42 - i * 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.14, 0.012, 6, 24]} />
          </mesh>
        ))}
        <mesh material={gold} position={[-1.05, -1.38, 0]}>
          <coneGeometry args={[0.13, 0.26, 24]} />
        </mesh>
        <mesh material={iron} position={[-1.05, -1.52, 0]}>
          <cylinderGeometry args={[0.008, 0.004, 0.12, 6]} />
        </mesh>
        <mesh ref={drop} material={ink} position={[-1.05, -1.62, 0]}>
          <sphereGeometry args={[1, 20, 16]} />
        </mesh>
        <mesh ref={ripple} position={[-1.05, -2.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1, 48]} />
          <meshBasicMaterial color="#1b1e2b" transparent opacity={0} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0, 6.6], fov: 32 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.1)}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} color="#fff4e0" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} color="#ffffff" scale={[2, 8, 1]} position={[3, 0, 3]} rotation-y={-Math.PI / 4} />
        <Lightformer form="rect" intensity={1} color="#e9e3d3" scale={[8, 2, 1]} position={[0, 4, 2]} rotation-x={Math.PI / 3} />
        <Lightformer form="ring" intensity={0.8} color="#9e2b25" scale={2} position={[-4, -1, 2]} />
        <Lightformer form="rect" intensity={1.6} color="#fff1d0" scale={[14, 10, 1]} position={[0, 0, 9]} />
        <Lightformer form="rect" intensity={1.2} color="#f3dfae" scale={[10, 3, 1]} position={[0, -4, 3]} rotation-x={-Math.PI / 3} />
      </Environment>
      <Machine reduced={reduced} />
      <ContactShadows position={[0, -2.35, 0]} opacity={0.3} scale={7} blur={2.6} far={3} color="#1b1e2b" />
    </SceneCanvas>
  );
}
