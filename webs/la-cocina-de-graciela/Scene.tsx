import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, useTiltGroup } from '../_kit/three';
import type { SceneProps } from '../_kit';

function hash(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Basalt bowl: a lathe profile with pitted, uneven stone. */
function useBowl() {
  return useMemo(() => {
    const profile: THREE.Vector2[] = [];
    // outside, from the foot up to the lip, then back down the inside
    const outer = [
      [0.0, -0.55],
      [0.55, -0.55],
      [0.95, -0.35],
      [1.18, 0.0],
      [1.22, 0.32],
      [1.12, 0.42],
    ];
    const inner = [
      [0.98, 0.36],
      [0.95, 0.1],
      [0.75, -0.18],
      [0.35, -0.3],
      [0.0, -0.32],
    ];
    for (const [x, y] of [...outer, ...inner]) profile.push(new THREE.Vector2(x, y));
    const g = new THREE.LatheGeometry(profile, 96);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = hash(Math.round(v.x * 18), Math.round(v.y * 18), Math.round(v.z * 18));
      const len = Math.hypot(v.x, v.z);
      if (len > 0.01) {
        const k = 1 + (n - 0.5) * 0.035;
        v.x *= k;
        v.z *= k;
      }
      v.y += (n - 0.5) * 0.012;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

function Chile({ color, position, rotation, scale = 1 }: { color: string; position: [number, number, number]; rotation: [number, number, number]; scale?: number }) {
  const geo = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.35, 0.12, 0), new THREE.Vector3(0.7, -0.08, 0));
    const tube = new THREE.TubeGeometry(curve, 32, 1, 16, false);
    const pos = tube.attributes.position as THREE.BufferAttribute;
    const p = new THREE.Vector3();
    for (let s = 0; s <= 32; s++) {
      const t = s / 32;
      const c = curve.getPoint(t);
      const r = 0.11 * Math.sin(Math.min(1, t * 1.15) * Math.PI * 0.5 + 0.35) * (1 - t * 0.85) + 0.012;
      for (let k = 0; k <= 16; k++) {
        const idx = s * 17 + k;
        p.fromBufferAttribute(pos, idx).sub(c).normalize().multiplyScalar(r).add(c);
        pos.setXYZ(idx, p.x, p.y, p.z);
      }
    }
    tube.computeVertexNormals();
    return tube;
  }, []);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geo}>
        <meshPhysicalMaterial color={color} roughness={0.22} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[-0.04, 0.03, 0]} rotation={[0, 0, 1.2]}>
        <cylinderGeometry args={[0.02, 0.03, 0.14, 8]} />
        <meshStandardMaterial color="#3e6b2a" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Molcajete({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const bowl = useBowl();
  const fit = useFitScale(4.2);
  useTiltGroup(group, { strength: [0.35, 0.9], idleSpin: 0.22, reduced, base: [0.42, 0, 0] });
  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3a3532', roughness: 0.92, metalness: 0, flatShading: false }), []);
  const pestle = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    t.current += Math.min(dt, 0.05);
    if (pestle.current && !reduced) pestle.current.rotation.z = -0.55 + Math.sin(t.current * 1.4) * 0.06;
  });
  return (
    <Float speed={reduced ? 0 : 1.2} floatIntensity={reduced ? 0 : 0.4} rotationIntensity={0}>
      <group ref={group} scale={fit}>
        <mesh geometry={bowl} material={stone} />
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh key={i} material={stone} position={[Math.cos(a) * 0.62, -0.72, Math.sin(a) * 0.62]}>
              <cylinderGeometry args={[0.14, 0.2, 0.36, 12]} />
            </mesh>
          );
        })}
        {/* salsa surface inside the bowl */}
        <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.9, 48]} />
          <meshPhysicalMaterial color="#b3261e" roughness={0.35} clearcoat={0.7} />
        </mesh>
        <Chile color="#d0261c" position={[-0.45, 0.2, 0.2]} rotation={[0.3, 0.4, 0.2]} />
        <Chile color="#2f8a2b" position={[0.05, 0.22, -0.3]} rotation={[-0.2, 2.1, 0.1]} scale={0.9} />
        <Chile color="#e0461c" position={[0.25, 0.18, 0.35]} rotation={[0.2, -0.9, -0.1]} scale={0.8} />
        <group ref={pestle} position={[0.55, 0.45, 0]} rotation={[0, 0, -0.55]}>
          <mesh material={stone}>
            <capsuleGeometry args={[0.15, 0.75, 8, 16]} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 1.4, 5.4], fov: 32 }} onCreated={({ gl, camera }) => {
      gl.toneMappingExposure = 1.15;
      camera.lookAt(0, -0.1, 0);
    }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 3]} intensity={1.8} color="#fff1d6" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.6} color="#f6a21e" scale={[6, 3, 1]} position={[2, 3, 3]} />
        <Lightformer form="rect" intensity={1.2} color="#0e9aa7" scale={[3, 5, 1]} position={[-4, 1, 1]} rotation-y={Math.PI / 3} />
        <Lightformer form="ring" intensity={1} color="#d6246e" scale={2} position={[0, -2, 3]} />
      </Environment>
      <Molcajete reduced={reduced} />
      <ContactShadows position={[0, -1.05, 0]} opacity={0.45} scale={6} blur={2.4} far={2} color="#2b1a12" />
    </SceneCanvas>
  );
}
