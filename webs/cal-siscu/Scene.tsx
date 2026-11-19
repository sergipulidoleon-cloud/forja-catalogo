import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

const shell = new THREE.MeshPhysicalMaterial({ color: '#c2412d', roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.35, sheen: 0.4, sheenColor: new THREE.Color('#ff9c6e') });
const shellDark = new THREE.MeshPhysicalMaterial({ color: '#8f2a1d', roughness: 0.5, clearcoat: 0.4 });
const eyeMat = new THREE.MeshStandardMaterial({ color: '#1a0d0a', roughness: 0.2 });

/** One claw: upper arm, forearm and a pincer whose finger opens and closes. */
function Claw({ side, reduced }: { side: 1 | -1; reduced: boolean }) {
  const arm = useRef<THREE.Group>(null);
  const finger = useRef<THREE.Group>(null);
  const t = useRef(side === 1 ? 0 : 1.3);
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    if (arm.current) {
      // The claws reach toward the pointer, with a slow spring-like lag.
      const targetY = side * 0.35 + tilt.x * 0.35;
      const targetZ = 0.15 + tilt.y * 0.2;
      arm.current.rotation.y = THREE.MathUtils.damp(arm.current.rotation.y, targetY, 2.5, d);
      arm.current.rotation.z = THREE.MathUtils.damp(arm.current.rotation.z, targetZ * side, 2.5, d);
    }
    if (finger.current) {
      const snap = reduced ? 0.15 : 0.12 + Math.max(0, Math.sin(t.current * 1.6)) * 0.38;
      finger.current.rotation.z = THREE.MathUtils.damp(finger.current.rotation.z, snap, 10, d);
    }
  });
  return (
    <group position={[0.38 * side, 0.02, 0.55]}>
      <group ref={arm}>
        <mesh material={shell} position={[0.18 * side, 0, 0.18]} rotation={[0, (side * Math.PI) / 4, Math.PI / 2]}>
          <capsuleGeometry args={[0.07, 0.36, 8, 16]} />
        </mesh>
        <group position={[0.36 * side, 0, 0.5]} rotation={[0, (-side * Math.PI) / 9, 0]}>
          <mesh material={shell} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.09, 0.34, 8, 16]} />
          </mesh>
          {/* palm */}
          <mesh material={shell} position={[0, 0, 0.5]} scale={[0.34, 0.22, 0.5]}>
            <sphereGeometry args={[1, 32, 24]} />
          </mesh>
          {/* fixed finger */}
          <mesh material={shellDark} position={[side * 0.08, -0.02, 1.08]} rotation={[Math.PI / 2, 0, 0]} scale={[1.3, 1, 1]}>
            <coneGeometry args={[0.12, 0.55, 16]} />
          </mesh>
          {/* moving finger */}
          <group ref={finger} position={[-side * 0.12, 0.02, 0.8]}>
            <mesh material={shellDark} position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.1, 0.55, 16]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Lobster({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group[]>([]);
  const fit = useFitScale(4.4);
  const segments = 6;
  const t = useRef(0);

  const antenna = useMemo(() => {
    const make = (side: number) =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([new THREE.Vector3(0.08 * side, 0.08, 0.7), new THREE.Vector3(0.45 * side, 0.35, 1.5), new THREE.Vector3(1.2 * side, 0.2, 2.1), new THREE.Vector3(1.9 * side, -0.25, 2.2)]),
        40,
        0.012,
        6,
        false,
      );
    return [make(1), make(-1)];
  }, []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    t.current += d;
    const g = root.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.5 + tilt.x * 0.6, 3, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.35 - tilt.y * 0.2, 3, d);
    // The tail breathes: each segment flexes a little after the one before it.
    tail.current.forEach((seg, i) => {
      if (!seg) return;
      const wave = reduced ? 0 : Math.sin(t.current * 1.3 - i * 0.55) * 0.05;
      seg.rotation.x = 0.06 + wave;
    });
  });

  // Nested tail segments so each one inherits the previous bend.
  const tailChain = (i: number): React.ReactNode => {
    if (i >= segments) {
      return (
        <group position={[0, 0, -0.16]}>
          {[-0.5, -0.17, 0.17, 0.5].map((a) => (
            <mesh key={a} material={shell} position={[Math.sin(a) * 0.18, 0, -0.12]} rotation={[0, a, 0]} scale={[0.12, 0.025, 0.2]}>
              <sphereGeometry args={[1, 16, 12]} />
            </mesh>
          ))}
        </group>
      );
    }
    const r = 0.27 - i * 0.025;
    return (
      <group
        ref={(el) => {
          if (el) tail.current[i] = el;
        }}
        position={[0, 0, i === 0 ? -0.55 : -0.2]}
      >
        <mesh material={i % 2 ? shell : shellDark} scale={[r, r * 0.75, 0.15]}>
          <sphereGeometry args={[1, 32, 20]} />
        </mesh>
        {tailChain(i + 1)}
      </group>
    );
  };

  return (
    <group ref={root} scale={0.95 * fit} position={[0, 0.15, 0]}>
      {/* carapace */}
      <mesh material={shell} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.82]}>
        <capsuleGeometry args={[0.28, 0.75, 12, 24]} />
      </mesh>
      {/* rostrum */}
      <mesh material={shellDark} position={[0, 0.06, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.06, 0.3, 12]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} material={eyeMat} position={[0.1 * s, 0.17, 0.62]}>
          <sphereGeometry args={[0.04, 16, 12]} />
        </mesh>
      ))}
      {antenna.map((g, i) => (
        <mesh key={i} geometry={g} material={shellDark} />
      ))}
      {/* walking legs */}
      {[0, 1, 2, 3].map((i) =>
        [-1, 1].map((s) => (
          <mesh key={`${i}${s}`} material={shellDark} position={[0.3 * s, -0.12, 0.25 - i * 0.18]} rotation={[0, 0, s * 1.05]}>
            <cylinderGeometry args={[0.022, 0.012, 0.6, 6]} />
          </mesh>
        )),
      )}
      <Claw side={1} reduced={reduced} />
      <Claw side={-1} reduced={reduced} />
      {tailChain(0)}
    </group>
  );
}

/** Crushed ice bed: instanced, slightly frosted chunks. */
function Ice() {
  const chunks = useMemo(() => {
    const rnd = (a: number, b: number, i: number) => a + (b - a) * (Math.sin(i * 12.9898) * 43758.5453 - Math.floor(Math.sin(i * 12.9898) * 43758.5453));
    return Array.from({ length: 140 }, (_, i) => {
      const ang = rnd(0, Math.PI * 2, i);
      const rad = Math.sqrt(rnd(0, 1, i + 7)) * 2.4;
      return { p: [Math.cos(ang) * rad, -0.72 + rnd(0, 0.12, i + 3), Math.sin(ang) * rad * 0.65] as [number, number, number], s: rnd(0.08, 0.2, i + 11), r: rnd(0, 3, i + 5) };
    });
  }, []);
  return (
    <Instances limit={chunks.length}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial color="#cfe8ee" roughness={0.08} transmission={0.75} thickness={0.5} ior={1.31} clearcoat={1} />
      {chunks.map((c, i) => (
        <Instance key={i} position={c.p} scale={c.s} rotation={[c.r, c.r * 2, c.r * 0.5]} />
      ))}
    </Instances>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 1.6, 5.2], fov: 34 }} onCreated={({ gl, camera }) => {
      gl.toneMappingExposure = 1.05;
      camera.lookAt(0, -0.1, 0);
    }}>
      <ambientLight intensity={0.25} />
      <spotLight position={[2.5, 5, 3]} angle={0.5} penumbra={0.8} intensity={60} color="#ffe6c2" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.2} color="#c6a15b" scale={[8, 3, 1]} position={[0, 4, -3]} />
        <Lightformer form="rect" intensity={0.8} color="#e9f1f2" scale={[3, 6, 1]} position={[-4, 1, 2]} rotation-y={Math.PI / 3} />
      </Environment>
      <Lobster reduced={reduced} />
      <Ice />
      <ContactShadows position={[0, -0.8, 0]} opacity={0.5} scale={7} blur={2.2} far={2} color="#06140f" />
    </SceneCanvas>
  );
}
