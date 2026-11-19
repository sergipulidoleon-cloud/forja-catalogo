import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

function usePlate() {
  return useMemo(() => {
    const pts = [
      [0, 0],
      [0.9, 0],
      [1.0, 0.03],
      [1.12, 0.1],
      [1.6, 0.16],
      [1.66, 0.19],
      [1.64, 0.21],
      [1.1, 0.14],
      [0.95, 0.06],
      [0, 0.05],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 128);
  }, []);
}

/** The sauce stroke: a flattened tube whose draw range grows with scroll. */
function useSauce() {
  return useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.85, 0.07, 0.35),
      new THREE.Vector3(-0.4, 0.07, 0.55),
      new THREE.Vector3(0.1, 0.07, 0.42),
      new THREE.Vector3(0.55, 0.07, 0.05),
      new THREE.Vector3(0.75, 0.07, -0.35),
    ]);
    const g = new THREE.TubeGeometry(curve, 120, 0.06, 10, false);
    g.scale(1, 0.35, 1);
    return g;
  }, []);
}

function Plate({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const sauce = useRef<THREE.Mesh>(null);
  const plate = usePlate();
  const sauceGeo = useSauce();
  const fit = useFitScale(4.2);
  const t = useRef(0);
  const total = sauceGeo.index ? sauceGeo.index.count : 0;

  const leaves = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = i * 2.3;
        return { p: [0.22 + Math.cos(a) * 0.22, 0.2 + (i % 3) * 0.04, -0.1 + Math.sin(a) * 0.18] as [number, number, number], r: [a, a * 1.7, a * 0.6] as [number, number, number], s: 0.08 + (i % 3) * 0.02 };
      }),
    [],
  );

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    const intro = reduced ? 1 : Math.min(1, t.current / 2.4);
    const scroll = Math.min(1, window.scrollY / (window.innerHeight * 0.7));
    const draw = Math.max(intro * 0.35, Math.min(1, 0.35 + scroll * 0.65));
    sauceGeo.setDrawRange(0, Math.floor((total * draw) / 3) * 3);
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, (reduced ? 0 : t.current * 0.08) + tilt.x * 0.4, 2, d);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.55 - tilt.y * 0.15, 2, d);
    }
  });

  return (
    <group ref={root} scale={fit} rotation={[0.55, 0, 0]}>
      {/* slate */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[4.2, 0.1, 2.6]} />
        <meshStandardMaterial color="#3b4045" roughness={0.9} />
      </mesh>
      <mesh geometry={plate}>
        <meshPhysicalMaterial color="#f5f4ef" roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={sauce} geometry={sauceGeo}>
        <meshPhysicalMaterial color="#6e1630" roughness={0.12} clearcoat={1} />
      </mesh>
      {/* beetroot, roasted and raw */}
      <mesh position={[-0.15, 0.2, -0.05]} scale={[0.26, 0.2, 0.26]}>
        <sphereGeometry args={[1, 40, 30]} />
        <meshPhysicalMaterial color="#8c1c3a" roughness={0.35} clearcoat={0.6} />
      </mesh>
      <mesh position={[0.18, 0.13, 0.25]} rotation={[0, 0.6, 0.2]} scale={[0.16, 0.06, 0.12]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshPhysicalMaterial color="#b02d55" roughness={0.3} clearcoat={0.4} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh key={i} position={l.p} rotation={l.r} scale={[l.s, l.s * 1.6, l.s]}>
          <circleGeometry args={[1, 6]} />
          <meshStandardMaterial color={i % 2 ? '#8da35a' : '#6f8a3d'} side={THREE.DoubleSide} roughness={0.6} />
        </mesh>
      ))}
      {/* a few drops of oil */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0.55 - i * 0.12, 0.075, -0.45 + i * 0.05]} scale={[0.03 + i * 0.006, 0.01, 0.03 + i * 0.006]}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshPhysicalMaterial color="#c9b23a" roughness={0.05} clearcoat={1} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 1.2, 5.2], fov: 32 }} onCreated={({ gl, camera }) => {
      gl.toneMappingExposure = 1.05;
      camera.lookAt(0, 0, 0);
    }}>
      <ambientLight intensity={0.2} />
      <spotLight position={[1.5, 5, 2]} angle={0.42} penumbra={1} intensity={65} color="#fff8ec" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.3} color="#ffffff" scale={[5, 2, 1]} position={[0, 4, 2]} rotation-x={Math.PI / 3} />
        <Lightformer form="rect" intensity={0.6} color="#8da35a" scale={[2, 4, 1]} position={[-4, 1, 0]} rotation-y={Math.PI / 2} />
      </Environment>
      <Plate reduced={reduced} />
      <ContactShadows position={[0, -0.95, 0]} opacity={0.4} scale={8} blur={2.6} far={2} color="#000000" />
    </SceneCanvas>
  );
}
