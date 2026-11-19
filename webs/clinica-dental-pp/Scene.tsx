import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

const TEETH = 10;

/** A soft, cartoon smile: rounded teeth on a gum arc. The arc deepens into a grin and follows the pointer. */
function Smile({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const teeth = useRef<THREE.Group[]>([]);
  const gum = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  const fit = useFitScale(4.4);
  // Upper gum line: a soft tube that follows the top of the grin.
  const lip = useMemo(() => {
    const pts = Array.from({ length: 24 }, (_, i) => {
      const u = i / 23 - 0.5;
      return new THREE.Vector3(u * 3.6, -Math.cos(u * Math.PI) * 0.5 + 0.3 + 0.32, Math.cos(u * Math.PI) * 0.3);
    });
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.16, 16, false);
  }, []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    // Grin: depth of the arc oscillates gently, deeper when the pointer is near the centre.
    const base = 0.42 + (1 - Math.min(1, Math.abs(tilt.x))) * 0.18;
    const grin = reduced ? base : base + Math.sin(t.current * 1.6) * 0.08;
    teeth.current.forEach((g, i) => {
      if (!g) return;
      const u = i / (TEETH - 1) - 0.5; // -0.5 .. 0.5
      const x = u * 3.2;
      const y = -Math.cos(u * Math.PI) * grin + grin * 0.6;
      g.position.x = x;
      g.position.y = THREE.MathUtils.damp(g.position.y, y, 8, d);
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, u * grin * 1.4, 8, d);
      const bob = reduced ? 0 : Math.sin(t.current * 3 + i * 0.7) * 0.015;
      g.position.z = Math.cos(u * Math.PI) * 0.35 + bob;
    });
    if (gum.current) gum.current.position.y = THREE.MathUtils.damp(gum.current.position.y, (grin - 0.5) * 0.8, 8, d);
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, tilt.x * 0.55, 3, d);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -tilt.y * 0.3, 3, d);
    }
  });

  return (
    <group ref={root} scale={fit}>
      <mesh ref={gum} geometry={lip} position={[0, 0, -0.12]}>
        <meshPhysicalMaterial color="#e98fb0" roughness={0.4} clearcoat={0.6} />
      </mesh>
      {Array.from({ length: TEETH }, (_, i) => {
        const u = i / (TEETH - 1) - 0.5;
        const w = 0.3 - Math.abs(u) * 0.08;
        return (
          <group
            key={i}
            ref={(el) => {
              if (el) teeth.current[i] = el;
            }}
          >
            <RoundedBox args={[w, 0.46 - Math.abs(u) * 0.12, 0.26]} radius={0.1} smoothness={5}>
              <meshPhysicalMaterial color="#ffffff" roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} sheen={0.4} sheenColor="#f7e27a" />
            </RoundedBox>
          </group>
        );
      })}
      {/* a little sparkle on the front tooth: the brand's wink */}
      <mesh position={[0.25, 0.55, 0.6]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshBasicMaterial color="#f7e27a" />
      </mesh>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0.2, 6], fov: 32 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.2)}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 5]} intensity={1.3} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.4} color="#ffffff" scale={[8, 3, 1]} position={[0, 3, 4]} />
        <Lightformer form="ring" intensity={1.2} color="#e9e4f7" scale={3} position={[-3, 0, 3]} />
        <Lightformer form="rect" intensity={0.8} color="#f7e27a" scale={[3, 3, 1]} position={[3, -2, 2]} />
      </Environment>
      <Smile reduced={reduced} />
      <ContactShadows position={[0, -1.1, 0]} opacity={0.25} scale={7} blur={2.8} far={2} color="#2a2240" />
    </SceneCanvas>
  );
}
