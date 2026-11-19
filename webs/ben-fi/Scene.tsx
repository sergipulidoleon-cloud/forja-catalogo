import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Glass dropper bottle with serum inside; a drop forms on the pipette and falls. */
function Bottle({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const pipette = useRef<THREE.Group>(null);
  const drop = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  const fit = useFitScale(3.4);

  const glassGeo = useMemo(() => {
    const pts = [
      [0, -1],
      [0.62, -1],
      [0.7, -0.92],
      [0.72, 0.35],
      [0.66, 0.52],
      [0.3, 0.7],
      [0.28, 0.88],
      [0, 0.88],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 96);
  }, []);
  const serumGeo = useMemo(() => {
    const pts = [
      [0, -0.94],
      [0.6, -0.94],
      [0.64, -0.86],
      [0.65, 0.1],
      [0, 0.1],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 64);
  }, []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, tilt.x * 0.6 + (reduced ? 0 : t.current * 0.15), 2, d);
      root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, -tilt.x * 0.06, 2, d);
    }
    // the pipette lifts out of the bottle, a drop forms, falls, and it goes back
    const cyc = reduced ? 0.45 : (t.current % 5) / 5;
    const lift = cyc < 0.3 ? cyc / 0.3 : cyc < 0.8 ? 1 : 1 - (cyc - 0.8) / 0.2;
    const e = lift * lift * (3 - 2 * lift);
    if (pipette.current) {
      pipette.current.position.y = 0.88 + e * 0.9;
      pipette.current.position.x = e * 0.75;
    }
    if (drop.current) {
      const form = cyc > 0.3 && cyc < 0.55 ? (cyc - 0.3) / 0.25 : cyc >= 0.55 && cyc < 0.8 ? 1 : 0;
      const fall = cyc >= 0.55 && cyc < 0.8 ? (cyc - 0.55) / 0.25 : 0;
      drop.current.visible = form > 0;
      drop.current.scale.set(0.07 * form, 0.09 * form * (1 + fall * 0.5), 0.07 * form);
      drop.current.position.set(0.75 * e, 0.88 + e * 0.9 - 0.62 - fall * fall * 2.4, 0);
    }
  });

  return (
    <Float speed={reduced ? 0 : 1.1} floatIntensity={reduced ? 0 : 0.3} rotationIntensity={0}>
      <group scale={fit} position={[0, -0.25, 0]}>
        <group ref={root}>
          <mesh geometry={glassGeo}>
            <meshPhysicalMaterial color="#f7e3dc" roughness={0.04} transmission={1} thickness={0.6} ior={1.5} attenuationColor="#e8b6aa" attenuationDistance={1.8} clearcoat={1} />
          </mesh>
          <mesh geometry={serumGeo}>
            <meshPhysicalMaterial color="#e8a990" roughness={0.1} transmission={0.6} thickness={1} ior={1.38} />
          </mesh>
          {/* label */}
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.725, 0.725, 0.55, 64, 1, true, -0.9, 1.8]} />
            <meshStandardMaterial color="#fbf8f6" roughness={0.7} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.728, 0.728, 0.06, 64, 1, true, -0.9, 1.8]} />
            <meshStandardMaterial color="#5e7f6e" side={THREE.DoubleSide} />
          </mesh>
        </group>
        {/* pipette: rubber bulb + glass stem */}
        <group ref={pipette} position={[0, 0.88, 0]}>
          <mesh position={[0, 0.3, 0]}>
            <capsuleGeometry args={[0.2, 0.32, 8, 24]} />
            <meshPhysicalMaterial color="#5e7f6e" roughness={0.5} clearcoat={0.3} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.14, 48]} />
            <meshStandardMaterial color="#c98f86" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.32, 0]}>
            <cylinderGeometry args={[0.05, 0.03, 0.6, 16]} />
            <meshPhysicalMaterial color="#ffffff" transmission={1} roughness={0.05} thickness={0.1} />
          </mesh>
        </group>
        <mesh ref={drop}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshPhysicalMaterial color="#e8a990" roughness={0.02} transmission={0.7} thickness={0.3} clearcoat={1} />
        </mesh>
        {/* a eucalyptus sprig beside the bottle */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[-1.1 + i * 0.06, -0.95 + i * 0.28, 0.2]} rotation={[0.3, 0.5, 0.5 + i * 0.25]} scale={[0.16, 0.2, 0.02]}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color={i % 2 ? '#7a9a88' : '#5e7f6e'} roughness={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0.4, 6.2], fov: 32 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.05)}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} color="#fff1ea" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} color="#ffffff" scale={[2, 7, 1]} position={[2.5, 0, 3]} rotation-y={-Math.PI / 4} />
        <Lightformer form="rect" intensity={1.4} color="#f3d9d3" scale={[8, 4, 1]} position={[0, 4, -3]} />
        <Lightformer form="ring" intensity={0.9} color="#5e7f6e" scale={2} position={[-3, -1, 2]} />
      </Environment>
      <Bottle reduced={reduced} />
      <ContactShadows position={[0, -1.3, 0]} opacity={0.3} scale={6} blur={2.6} far={2} color="#2e2a2b" />
    </SceneCanvas>
  );
}
