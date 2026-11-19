import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

const rnd = (i: number) => {
  const s = Math.sin(i * 57.31 + 1.7) * 43758.5453;
  return s - Math.floor(s);
};

/** The Pacific: a plane whose vertices ride on summed sines; the pointer steers the swell. */
function Sea({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(36, 24, 110, 70).rotateX(-Math.PI / 2), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (reduced && t.current > 0) return;
    t.current += Math.min(dt, 0.05);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const k = 1 + tilt.x * 0.6;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      const y = Math.sin(x * 0.9 * k + t.current * 1.2) * 0.12 + Math.sin(z * 1.4 + t.current * 0.9 + x * 0.3) * 0.08 + Math.sin((x + z) * 2.2 + t.current * 2) * 0.025;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <mesh ref={ref} geometry={geo} position={[0, -0.9, -1.5]}>
      <meshPhysicalMaterial color="#0e4a8a" roughness={0.18} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  );
}

function Bowl({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const fit = useFitScale(4.2);
  const t = useRef(0);
  const bowl = useMemo(() => {
    const pts = [
      [0, -0.5],
      [0.45, -0.5],
      [0.5, -0.45],
      [0.95, -0.1],
      [1.15, 0.25],
      [1.1, 0.27],
      [0.9, 0.0],
      [0.45, -0.38],
      [0, -0.4],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 96);
  }, []);
  const fish = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ p: [(rnd(i) - 0.5) * 1.1, 0.1 + rnd(i + 3) * 0.08, (rnd(i + 7) - 0.5) * 1.1] as [number, number, number], r: [rnd(i + 1) * 2, rnd(i + 2) * 3, rnd(i + 4)] as [number, number, number] })), []);
  const onion = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ p: [(rnd(i + 20) - 0.5) * 1.2, 0.2, (rnd(i + 27) - 0.5) * 1.1] as [number, number, number], r: rnd(i + 30) * 6 })), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    if (!root.current) return;
    // The bowl rides the swell, a few beats behind it.
    root.current.position.y = reduced ? 0 : Math.sin(t.current * 1.2 - 0.6) * 0.06;
    root.current.rotation.z = reduced ? 0 : Math.sin(t.current * 0.9) * 0.03;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, tilt.x * 0.7 + t.current * (reduced ? 0 : 0.1), 2.5, d);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.35 - tilt.y * 0.2, 2.5, d);
  });

  return (
    <group ref={root} scale={fit}>
      <mesh geometry={bowl}>
        <meshPhysicalMaterial color="#f4f7f2" roughness={0.2} clearcoat={1} side={THREE.DoubleSide} />
      </mesh>
      {/* leche de tigre */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.92, 48]} />
        <meshPhysicalMaterial color="#e9ecd8" roughness={0.1} transmission={0.3} clearcoat={1} />
      </mesh>
      {fish.map((f, i) => (
        <RoundedBox key={i} args={[0.2, 0.15, 0.18]} radius={0.04} smoothness={3} position={f.p} rotation={f.r}>
          <meshPhysicalMaterial color="#f6f1ea" roughness={0.35} sheen={0.5} sheenColor="#f2a900" />
        </RoundedBox>
      ))}
      {onion.map((o, i) => (
        <mesh key={i} position={o.p} rotation={[Math.PI / 2, 0, o.r]}>
          <torusGeometry args={[0.16, 0.018, 8, 24, Math.PI * 1.1]} />
          <meshPhysicalMaterial color="#8e3b8f" roughness={0.3} clearcoat={0.6} />
        </mesh>
      ))}
      {/* choclo */}
      <mesh position={[0.55, 0.22, -0.2]} rotation={[0.3, 0.4, 1.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.38, 16]} />
        <meshStandardMaterial color="#f2c230" roughness={0.6} />
      </mesh>
      {/* lime wedge */}
      <mesh position={[-0.6, 0.24, 0.25]} rotation={[0.2, 0.8, Math.PI / 2]} scale={[0.17, 0.32, 0.17]}>
        <sphereGeometry args={[1, 24, 16, 0, Math.PI]} />
        <meshPhysicalMaterial color="#9cc54a" roughness={0.3} clearcoat={0.5} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.1 + i * 0.12, 0.26, 0.35 - i * 0.1]} rotation={[-1.2, i, 0]} scale={[0.08, 0.12, 0.08]}>
          <circleGeometry args={[1, 5]} />
          <meshStandardMaterial color="#3b8a2e" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 1.5, 5.6], fov: 34 }} onCreated={({ gl, camera }) => {
      gl.toneMappingExposure = 1.1;
      camera.lookAt(0, -0.2, 0);
    }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1.6} color="#fff6dd" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} color="#ffffff" scale={[10, 3, 1]} position={[0, 5, -3]} />
        <Lightformer form="rect" intensity={1} color="#f2a900" scale={[3, 3, 1]} position={[4, 1, 2]} />
      </Environment>
      <fog attach="fog" args={['#0b2e59', 5, 13]} />
      <Sea reduced={reduced} />
      <Bowl reduced={reduced} />
    </SceneCanvas>
  );
}
