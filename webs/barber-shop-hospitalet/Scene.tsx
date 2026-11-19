import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Straight-razor blade: curved spine, square point and a tang that sits on the pivot. */
function useBlade() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.08);
    s.lineTo(0.35, 0.12); // tang
    s.quadraticCurveTo(1.4, 0.16, 2.4, 0.1); // spine
    s.lineTo(2.45, -0.46); // square point
    s.quadraticCurveTo(1.4, -0.5, 0.5, -0.36); // edge
    s.lineTo(0.35, -0.1);
    s.lineTo(0, -0.08);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 24 });
    g.translate(0, 0, -0.0175);
    return g;
  }, []);
}

function useScale() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.12, 0.16);
    s.quadraticCurveTo(1.3, 0.24, 2.7, 0.14);
    s.quadraticCurveTo(2.86, 0, 2.7, -0.14);
    s.quadraticCurveTo(1.3, -0.22, -0.12, -0.16);
    s.quadraticCurveTo(-0.26, 0, -0.12, 0.16);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4, curveSegments: 32 });
    return g;
  }, []);
}

function Razor({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const blade = useRef<THREE.Group>(null);
  const bladeGeo = useBlade();
  const scaleGeo = useScale();
  const fit = useFitScale(5.2);
  const t = useRef(0);
  const steel = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#e4e8eb', metalness: 0.9, roughness: 0.2, clearcoat: 0.6 }), []);
  const horn = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#f1eadf', roughness: 0.35, clearcoat: 0.8, clearcoatRoughness: 0.2, sheen: 0.5, sheenColor: new THREE.Color('#c9a55a') }), []);
  const brass = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9a55a', metalness: 1, roughness: 0.3 }), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    // Opens on arrival, then all the way as the visitor scrolls the hero away.
    const intro = reduced ? 1 : Math.min(1, t.current / 1.6);
    const scroll = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
    const open = THREE.MathUtils.lerp(0.04, 0.62, 1 - Math.pow(1 - intro, 3)) + scroll * 0.38;
    if (blade.current) blade.current.rotation.z = THREE.MathUtils.damp(blade.current.rotation.z, Math.PI * (1 - open), 6, d);
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, tilt.x * 0.5 - 0.25, 3, d);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -tilt.y * 0.3 + 0.2, 3, d);
    }
  });

  return (
    <group ref={root} scale={0.82 * fit} position={[0, -0.1, 0]}>
      <group rotation={[0, 0, -0.18]} position={[-1.3, 0, 0]}>
        {/* handle: two horn scales either side of the blade */}
        <mesh geometry={scaleGeo} material={horn} position={[0, 0, 0.04]} />
        <mesh geometry={scaleGeo} material={horn} position={[0, 0, -0.09]} />
        {/* pivot pin and end pin */}
        {[0, 2.62].map((x) => (
          <mesh key={x} material={brass} position={[x, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.22, 20]} />
          </mesh>
        ))}
        <group ref={blade} rotation={[0, 0, Math.PI]}>
          <mesh geometry={bladeGeo} material={steel} />
        </group>
      </group>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0, 7], fov: 30 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.05)}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 4, 5]} intensity={1.2} color="#fff1dc" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#ffffff" scale={[10, 1.2, 1]} position={[0, 3, 2]} rotation-x={Math.PI / 2.5} />
        <Lightformer form="rect" intensity={1.6} color="#f1eadf" scale={[12, 8, 1]} position={[0, 0, 8]} />
        <Lightformer form="rect" intensity={1.5} color="#c9a55a" scale={[2, 6, 1]} position={[-4, 0, 2]} rotation-y={Math.PI / 3} />
        <Lightformer form="rect" intensity={1} color="#2c4a7a" scale={[2, 6, 1]} position={[4, 0, -1]} rotation-y={-Math.PI / 3} />
      </Environment>
      <Razor reduced={reduced} />
      <ContactShadows position={[0, -1.4, 0]} opacity={0.45} scale={9} blur={2.8} far={3} color="#120304" />
    </SceneCanvas>
  );
}
