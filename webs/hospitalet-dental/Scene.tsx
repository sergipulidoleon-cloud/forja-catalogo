import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Titanium fixture: tapered core plus a helical thread. */
function useScrew() {
  return useMemo(() => {
    const core = new THREE.CylinderGeometry(0.28, 0.16, 1.5, 32, 1);
    const turns = 7;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= turns * 40; i++) {
      const t = i / (turns * 40);
      const a = t * turns * Math.PI * 2;
      const y = 0.7 - t * 1.4;
      const r = THREE.MathUtils.lerp(0.3, 0.18, t);
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    const thread = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), turns * 60, 0.045, 8, false);
    return { core, thread };
  }, []);
}

function useCrown() {
  return useMemo(() => {
    const g = new THREE.SphereGeometry(0.62, 64, 48);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      v.y *= 0.75;
      if (v.y > 0.1) {
        const bump = Math.cos(v.x * 6) * Math.cos(v.z * 6) * 0.04;
        v.y += bump;
      }
      if (v.y < -0.15) v.y = -0.15 + (v.y + 0.15) * 0.25; // flatten base for the abutment
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

function Implant({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const abut = useRef<THREE.Group>(null);
  const crown = useRef<THREE.Group>(null);
  const screw = useScrew();
  const crownGeo = useCrown();
  const fit = useFitScale(3.2);
  const t = useRef(0);
  const titanium = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#b9c2ca', metalness: 1, roughness: 0.28, clearcoat: 0.4 }), []);
  const ceramic = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#f4efe6', roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0.4, sheenColor: new THREE.Color('#d9c6a5') }), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    // Exploded view driven by scroll through the first screen; a slow assembled turn otherwise.
    const explode = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    const e = explode * explode * (3 - 2 * explode);
    if (abut.current) abut.current.position.y = THREE.MathUtils.damp(abut.current.position.y, 0.98 + e * 0.55, 6, d);
    if (crown.current) crown.current.position.y = THREE.MathUtils.damp(crown.current.position.y, 1.42 + e * 1.15, 6, d);
    if (root.current) {
      const spin = reduced ? 0 : t.current * 0.25;
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, spin + tilt.x * 0.6, 2.5, d);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -tilt.y * 0.2 + 0.08, 2.5, d);
    }
  });

  return (
    <group ref={root} scale={0.95 * fit} position={[0, -0.9, 0]}>
      <mesh geometry={screw.core} material={titanium} />
      <mesh geometry={screw.thread} material={titanium} />
      <mesh material={titanium} position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.08, 32]} />
      </mesh>
      <group ref={abut} position={[0, 0.98, 0]}>
        <mesh material={titanium}>
          <cylinderGeometry args={[0.16, 0.24, 0.32, 6]} />
        </mesh>
        <mesh material={titanium} position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 0.12, 24]} />
        </mesh>
      </group>
      <group ref={crown} position={[0, 1.42, 0]}>
        <mesh geometry={crownGeo} material={ceramic} />
      </group>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0.4, 6.4], fov: 30 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.15)}>
      <ambientLight intensity={0.15} />
      <spotLight position={[3, 5, 4]} angle={0.45} penumbra={0.9} intensity={70} color="#fff4e2" />
      <directionalLight position={[-4, 1, -2]} intensity={0.8} color="#8fb3d6" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} color="#e8eef2" scale={[2, 8, 1]} position={[3, 0, 3]} rotation-y={-Math.PI / 4} />
        <Lightformer form="rect" intensity={1.4} color="#d9c6a5" scale={[2, 8, 1]} position={[-3, 0, 2]} rotation-y={Math.PI / 4} />
        <Lightformer form="rect" intensity={0.6} color="#ffffff" scale={[10, 2, 1]} position={[0, 5, 0]} rotation-x={Math.PI / 2} />
      </Environment>
      <Implant reduced={reduced} />
      <ContactShadows position={[0, -1.75, 0]} opacity={0.6} scale={6} blur={2.4} far={3} color="#000000" />
    </SceneCanvas>
  );
}
