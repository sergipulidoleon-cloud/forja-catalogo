import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

const fur = new THREE.MeshStandardMaterial({ color: '#d9a066', roughness: 0.8, flatShading: true });
const cream = new THREE.MeshStandardMaterial({ color: '#fff1e2', roughness: 0.8, flatShading: true });
const dark = new THREE.MeshStandardMaterial({ color: '#2a1d16', roughness: 0.3 });
const ear = new THREE.MeshStandardMaterial({ color: '#8a5634', roughness: 0.8, flatShading: true });

/** Low-poly pup: eyes track the pointer, ears follow with a spring, head tilts when you hover. */
function Pup({ reduced }: { reduced: boolean }) {
  const head = useRef<THREE.Group>(null);
  const pupils = useRef<THREE.Mesh[]>([]);
  const ears = useRef<THREE.Group[]>([]);
  const earVel = useRef([0, 0]);
  const earAng = useRef([0, 0]);
  const t = useRef(0);
  const fit = useFitScale(3.6);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    const h = head.current;
    if (h) {
      const prevY = h.rotation.y;
      h.rotation.y = THREE.MathUtils.damp(h.rotation.y, tilt.x * 0.55, 4, d);
      h.rotation.x = THREE.MathUtils.damp(h.rotation.x, -tilt.y * 0.3, 4, d);
      h.rotation.z = THREE.MathUtils.damp(h.rotation.z, reduced ? 0 : Math.sin(t.current * 0.7) * 0.06 - tilt.x * 0.12, 3, d);
      // Ears: a damped spring driven by how fast the head turns.
      const turn = (h.rotation.y - prevY) / Math.max(d, 1e-3);
      ears.current.forEach((e, i) => {
        if (!e) return;
        const side = i ? -1 : 1;
        const target = side * 0.15 + (reduced ? 0 : Math.sin(t.current * 2.2 + i) * 0.03);
        const force = (target - earAng.current[i]) * 90 - earVel.current[i] * 9 - turn * 6 * (reduced ? 0 : 1);
        earVel.current[i] += force * d;
        earAng.current[i] += earVel.current[i] * d;
        e.rotation.z = earAng.current[i];
      });
    }
    pupils.current.forEach((p, i) => {
      if (!p) return;
      p.position.x = (i ? -0.32 : 0.32) + tilt.x * 0.05;
      p.position.y = 0.22 + tilt.y * 0.04;
    });
  });

  return (
    <group scale={fit} position={[0, -0.1, 0]}>
      {/* body suggestion */}
      <mesh material={fur} position={[0, -1.25, -0.3]} scale={[1.1, 0.8, 0.9]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      <mesh material={cream} position={[0, -1.05, 0.35]} scale={[0.55, 0.5, 0.35]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      <group ref={head}>
        <mesh material={fur} scale={[1, 0.9, 0.9]}>
          <icosahedronGeometry args={[0.9, 1]} />
        </mesh>
        {/* snout */}
        <mesh material={cream} position={[0, -0.22, 0.68]} scale={[0.52, 0.38, 0.5]}>
          <icosahedronGeometry args={[0.8, 1]} />
        </mesh>
        <mesh material={dark} position={[0, -0.08, 1.06]} scale={[0.16, 0.11, 0.1]}>
          <sphereGeometry args={[1, 16, 12]} />
        </mesh>
        <mesh material={dark} position={[0, -0.36, 0.98]} rotation={[0, 0, Math.PI]} scale={[0.12, 0.02, 0.02]}>
          <torusGeometry args={[1, 0.6, 6, 12, Math.PI]} />
        </mesh>
        {/* eyes */}
        {[1, -1].map((s, i) => (
          <group key={s}>
            <mesh position={[0.32 * s, 0.22, 0.7]} scale={[0.15, 0.17, 0.08]}>
              <sphereGeometry args={[1, 16, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            <mesh
              ref={(el) => {
                if (el) pupils.current[i] = el;
              }}
              material={dark}
              position={[0.32 * s, 0.22, 0.77]}
              scale={[0.075, 0.09, 0.04]}
            >
              <sphereGeometry args={[1, 16, 12]} />
            </mesh>
          </group>
        ))}
        {/* ears hang from the top of the head */}
        {[1, -1].map((s, i) => (
          <group
            key={s}
            ref={(el) => {
              if (el) ears.current[i] = el;
            }}
            position={[0.62 * s, 0.55, 0]}
          >
            <mesh material={ear} position={[0.2 * s, -0.45, 0]} rotation={[0, 0, s * 0.25]} scale={[0.28, 0.6, 0.12]}>
              <icosahedronGeometry args={[1, 1]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0, 6.2], fov: 32 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.05)}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 5]} intensity={1.4} color="#fff4e8" />
      <directionalLight position={[-4, 1, 2]} intensity={0.5} color="#cfe8f5" />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={1} color="#ffffff" scale={[6, 3, 1]} position={[0, 3, 4]} />
      </Environment>
      <Pup reduced={reduced} />
      <ContactShadows position={[0, -1.95, 0]} opacity={0.3} scale={6} blur={2.4} far={2} color="#1f2d2a" />
    </SceneCanvas>
  );
}
