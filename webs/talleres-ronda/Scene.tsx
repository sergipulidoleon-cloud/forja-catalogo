import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

const R = 0.55; // crank radius
const L = 1.7; // rod length

/** Single-cylinder slider-crank: crankshaft turns, rod follows, piston pumps. Scrolling revs the engine. */
function Engine({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const crank = useRef<THREE.Group>(null);
  const rod = useRef<THREE.Group>(null);
  const piston = useRef<THREE.Group>(null);
  const angle = useRef(0);
  const lastScroll = useRef(0);
  const fit = useFitScale(3.4);

  const steel = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#c3ccd6', metalness: 1, roughness: 0.3, clearcoat: 0.4 }), []);
  const dark = useMemo(() => new THREE.MeshStandardMaterial({ color: '#4b5866', metalness: 0.9, roughness: 0.4 }), []);
  const orange = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff7a00', roughness: 0.45 }), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const sy = window.scrollY;
    const rev = Math.min(30, Math.abs(sy - lastScroll.current) * 0.06);
    lastScroll.current = sy;
    angle.current += reduced ? 0 : d * (1.6 + rev);
    const a = angle.current;
    if (crank.current) crank.current.rotation.z = a;
    // crank pin position
    const px = Math.sin(a) * R;
    const py = Math.cos(a) * R;
    // piston height from slider-crank geometry
    const ph = py + Math.sqrt(L * L - px * px);
    if (piston.current) piston.current.position.y = ph;
    if (rod.current) {
      rod.current.position.set(px, py, 0.18);
      rod.current.rotation.z = Math.atan2(px, ph - py);
    }
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.5 + tilt.x * 0.6, 3, d);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.1 - tilt.y * 0.2, 3, d);
    }
  });

  return (
    <group ref={root} scale={fit * 0.8} position={[0, -1.0 * fit, 0]}>
      {/* crankshaft */}
      <group ref={crank}>
        <mesh material={dark} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 1.2, 32]} />
        </mesh>
        {[-0.12, 0.48].map((z) => (
          <mesh key={z} material={steel} position={[0, R / 2, z]}>
            <boxGeometry args={[0.5, R + 0.5, 0.12]} />
            <Edges color="#dce6f2" threshold={20} />
          </mesh>
        ))}
        <mesh material={orange} position={[0, -0.32, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.7, 6, 1, false, 0, Math.PI]} />
        </mesh>
      </group>
      {/* connecting rod */}
      <group ref={rod}>
        <mesh material={steel} position={[0, L / 2, 0]}>
          <boxGeometry args={[0.14, L, 0.1]} />
          <Edges color="#dce6f2" threshold={20} />
        </mesh>
        <mesh material={dark} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.06, 12, 32]} />
        </mesh>
      </group>
      {/* piston */}
      <group ref={piston} position={[0, R + L, 0.18]}>
        <mesh material={steel}>
          <cylinderGeometry args={[0.48, 0.48, 0.6, 48]} />
          <Edges color="#dce6f2" threshold={20} />
        </mesh>
        {[0.16, 0.06, -0.04].map((y) => (
          <mesh key={y} material={dark} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.485, 0.012, 6, 48]} />
          </mesh>
        ))}
      </group>
      {/* cylinder liner (ghosted, like a section on the drawing) */}
      <mesh position={[0, R + L, 0.18]}>
        <cylinderGeometry args={[0.56, 0.56, 1.9, 48, 1, true]} />
        <meshBasicMaterial color="#dce6f2" transparent opacity={0.08} side={THREE.DoubleSide} />
        <Edges color="#dce6f2" />
      </mesh>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0.6, 7], fov: 34 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.1)}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={2} color="#ffffff" scale={[2, 8, 1]} position={[3, 0, 3]} rotation-y={-Math.PI / 4} />
        <Lightformer form="rect" intensity={1} color="#ff7a00" scale={[2, 6, 1]} position={[-3, 0, 2]} rotation-y={Math.PI / 4} />
      </Environment>
      <Engine reduced={reduced} />
    </SceneCanvas>
  );
}
