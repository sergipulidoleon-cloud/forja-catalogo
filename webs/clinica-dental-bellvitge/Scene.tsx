import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useTiltGroup, useFitScale } from '../_kit/three';
import type { SceneProps } from '../_kit';

/** Crown: a squashed sphere with four soft cusps raised on the occlusal face. */
function useCrownGeometry() {
  return useMemo(() => {
    const g = new THREE.SphereGeometry(1, 96, 64);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    const cusps = [
      [0.42, 0.38],
      [-0.42, 0.38],
      [0.42, -0.38],
      [-0.42, -0.38],
    ];
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Box-ish body: push sides out a little so it reads as a molar, not an egg.
      const side = Math.sqrt(v.x * v.x + v.z * v.z);
      const squareness = 1 + 0.12 * Math.pow(Math.abs(Math.sin(2 * Math.atan2(v.z, v.x))), 2) * side;
      v.x *= 1.08 * squareness;
      v.z *= 0.95 * squareness;
      v.y *= 0.62;
      if (v.y > 0) {
        let bump = 0;
        for (const [cx, cz] of cusps) {
          const dx = v.x - cx;
          const dz = v.z - cz;
          bump += Math.exp(-(dx * dx + dz * dz) / 0.09);
        }
        // Central fissure between cusps.
        const fissure = Math.exp(-(v.x * v.x) / 0.01) * 0.5 + Math.exp(-(v.z * v.z) / 0.01) * 0.5;
        v.y += (bump * 0.22 - fissure * 0.06) * Math.min(1, v.y * 3);
      }
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

/** A tapered, slightly curved root built from a tube along a bent path. */
function Root({ x, z, lean, length, material }: { x: number; z: number; lean: number; length: number; material: THREE.Material }) {
  const geometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x, -0.15, z),
      new THREE.Vector3(x + lean * 0.35, -0.15 - length * 0.5, z),
      new THREE.Vector3(x + lean, -0.15 - length, z * 0.8),
    ]);
    const tube = new THREE.TubeGeometry(path, 48, 1, 24, false);
    // Taper the radius along the tube.
    const pos = tube.attributes.position as THREE.BufferAttribute;
    const p = new THREE.Vector3();
    const segments = 49;
    const ring = 25;
    for (let s = 0; s < segments; s++) {
      const t = s / (segments - 1);
      const center = path.getPoint(t);
      const r = THREE.MathUtils.lerp(0.36, 0.06, Math.pow(t, 1.3));
      for (let k = 0; k < ring; k++) {
        const idx = s * ring + k;
        p.fromBufferAttribute(pos, idx).sub(center).normalize().multiplyScalar(r).add(center);
        pos.setXYZ(idx, p.x, p.y, p.z);
      }
    }
    tube.computeVertexNormals();
    return tube;
  }, [x, z, lean, length]);
  return <mesh geometry={geometry} material={material} />;
}

function Molar({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const crown = useCrownGeometry();
  const fit = useFitScale(3.6);
  useTiltGroup(group, { strength: [0.45, 0.8], idleSpin: 0.18, reduced, base: [0.25, -0.4, 0] });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#f5f1e8'),
        roughness: 0.26,
        transmission: 0.22,
        thickness: 1.4,
        ior: 1.52,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        attenuationColor: new THREE.Color('#f3e7d6'),
        attenuationDistance: 2.2,
        sheen: 0.3,
        sheenColor: new THREE.Color('#e6f1f0'),
      }),
    [],
  );

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.6}>
      <group ref={group} position={[0, 0.25, 0]} scale={1.05 * fit}>
        <mesh geometry={crown} material={material} position={[0, 0.25, 0]} />
        {[
          { x: 0.48, z: 0.1, lean: 0.18, length: 1.35 },
          { x: -0.48, z: 0.1, lean: -0.2, length: 1.25 },
          { x: 0, z: -0.42, lean: 0.02, length: 1.1 },
        ].map((r, i) => (
          <Root key={i} {...r} material={material} />
        ))}
      </group>
    </Float>
  );
}

/** One authored moment: a softbox sweeps across the enamel once when the scene appears. */
function Sweep({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current += Math.min(dt, 0.05);
    const p = reduced ? 1 : Math.min(1, t.current / 2.2);
    const e = 1 - Math.pow(1 - p, 4);
    ref.current.position.x = THREE.MathUtils.lerp(-6, 3, e);
  });
  return <Lightformer ref={ref} form="rect" intensity={6} color="#ffffff" scale={[1.4, 6, 1]} position={[-6, 1, 3]} rotation-y={Math.PI / 2.4} />;
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0.3, 6.2], fov: 30 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.08)}>
      <ambientLight intensity={0.12} />
      <directionalLight position={[3, 5, 4]} intensity={0.9} />
      <directionalLight position={[-4, -1, -3]} intensity={0.6} color="#9cc3c0" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={1.1} color="#e6f1f0" scale={[10, 4, 1]} position={[0, 4, -4]} />
        <Lightformer form="rect" intensity={0.9} color="#ffffff" scale={[3, 8, 1]} position={[4, 0, 2]} rotation-y={-Math.PI / 3} />
        <Lightformer form="ring" intensity={1.2} color="#d9858c" scale={2} position={[-4, -2, 2]} />
        <Sweep reduced={reduced} />
      </Environment>
      <Molar reduced={reduced} />
      <ContactShadows position={[0, -1.85, 0]} opacity={0.28} scale={6} blur={2.6} far={3} color="#0e3b43" />
    </SceneCanvas>
  );
}
