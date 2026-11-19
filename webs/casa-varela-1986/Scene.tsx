import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, useTiltGroup } from '../_kit/three';
import type { SceneProps } from '../_kit';

const rnd = (i: number) => {
  const s = Math.sin(i * 91.345 + 3.1) * 47453.5453;
  return s - Math.floor(s);
};

function usePan() {
  return useMemo(() => {
    const pts = [
      [0, -0.08],
      [1.55, -0.08],
      [1.75, 0.0],
      [1.82, 0.16],
      [1.86, 0.18],
      [1.8, 0.02],
      [1.6, -0.06],
      [0, -0.06],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 96);
  }, []);
}

function Prawn({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.22, 0.05, 0.12), new THREE.Vector3(0.38, 0.06, -0.02), new THREE.Vector3(0.3, 0.04, -0.2)]);
    const tube = new THREE.TubeGeometry(curve, 30, 1, 12, false);
    const pos = tube.attributes.position as THREE.BufferAttribute;
    const p = new THREE.Vector3();
    for (let s = 0; s <= 30; s++) {
      const t = s / 30;
      const c = curve.getPoint(t);
      const r = 0.085 * (1 - t * 0.7) + 0.01;
      for (let k = 0; k <= 12; k++) {
        const idx = s * 13 + k;
        p.fromBufferAttribute(pos, idx).sub(c).normalize().multiplyScalar(r).add(c);
        pos.setXYZ(idx, p.x, p.y, p.z);
      }
    }
    tube.computeVertexNormals();
    return tube;
  }, []);
  return (
    <mesh geometry={geo} position={position} rotation={[0, rotation, 0]}>
      <meshPhysicalMaterial color="#ef6a3a" roughness={0.35} clearcoat={0.8} />
    </mesh>
  );
}

function Steam({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 60;
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions.set([(rnd(i) - 0.5) * 2.4, rnd(i + 9) * 1.6, (rnd(i + 3) - 0.5) * 2.4], i * 3);
      speeds[i] = 0.15 + rnd(i + 5) * 0.25;
    }
    return { positions, speeds };
  }, []);
  useFrame((_, dt) => {
    if (reduced || !ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * Math.min(dt, 0.05);
      if (y > 1.7) y = 0.05;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(y * 3 + i) * 0.002);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.22} transparent opacity={0.16} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function Paella({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pan = usePan();
  const fit = useFitScale(4.4);
  useTiltGroup(group, { strength: [0.25, 0.35], idleSpin: 0.08, reduced, base: [0, 0, 0] });

  const grains = useMemo(
    () =>
      Array.from({ length: 900 }, (_, i) => {
        const a = rnd(i) * Math.PI * 2;
        const r = Math.sqrt(rnd(i + 1000)) * 1.52;
        return { p: [Math.cos(a) * r, -0.02 + rnd(i + 7) * 0.05, Math.sin(a) * r] as [number, number, number], ry: rnd(i + 3) * Math.PI, rz: rnd(i + 4) * 0.6 };
      }),
    [],
  );

  return (
    <group ref={group} scale={fit}>
      <mesh geometry={pan}>
        <meshStandardMaterial color="#2b2b2e" metalness={0.75} roughness={0.42} side={THREE.DoubleSide} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 2.0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.035, 10, 24]} />
          <meshStandardMaterial color="#2b2b2e" metalness={0.8} roughness={0.35} />
        </mesh>
      ))}
      {/* rice bed */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.58, 64]} />
        <meshStandardMaterial color="#c9861f" roughness={0.8} />
      </mesh>
      <Instances limit={grains.length}>
        <capsuleGeometry args={[0.018, 0.05, 2, 6]} />
        <meshStandardMaterial color="#f2b630" roughness={0.55} />
        {grains.map((g, i) => (
          <Instance key={i} position={g.p} rotation={[Math.PI / 2, g.ry, g.rz]} />
        ))}
      </Instances>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + 0.3;
        return <Prawn key={i} position={[Math.cos(a) * 0.95, 0.04, Math.sin(a) * 0.95]} rotation={-a + Math.PI / 2} />;
      })}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = (i / 7) * Math.PI * 2;
        const r = i % 2 ? 0.45 : 1.3;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.03, Math.sin(a) * r]} rotation={[-Math.PI / 2 + 0.2, 0, a]} scale={[0.14, 0.24, 0.07]}>
            <sphereGeometry args={[1, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial color="#1b1d2b" roughness={0.25} clearcoat={1} />
          </mesh>
        );
      })}
      {[0, 1].map((i) => (
        <mesh key={i} position={[i ? -0.3 : 0.25, 0.1, i ? 0.25 : -0.2]} rotation={[0, i * 1.8, Math.PI / 2]} scale={[0.12, 0.3, 0.12]}>
          <sphereGeometry args={[1, 20, 12, 0, Math.PI]} />
          <meshPhysicalMaterial color="#e8e36a" roughness={0.3} clearcoat={0.6} />
        </mesh>
      ))}
      <Steam reduced={reduced} />
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 5.6, 2.6], fov: 34 }} onCreated={({ gl, camera }) => {
      gl.toneMappingExposure = 1.1;
      camera.lookAt(0, 0, 0);
    }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 6, 3]} intensity={1.6} color="#fff3d6" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.6} color="#ffffff" scale={[8, 4, 1]} position={[0, 6, 0]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={0.8} color="#1d4e89" scale={[4, 4, 1]} position={[-4, 2, 0]} rotation-y={Math.PI / 2} />
      </Environment>
      <Paella reduced={reduced} />
      <ContactShadows position={[0, -0.12, 0]} opacity={0.35} scale={6} blur={2.6} far={1} color="#1d4e89" />
    </SceneCanvas>
  );
}
