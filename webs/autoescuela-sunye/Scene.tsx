import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

function roofSign() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 96;
  const g = c.getContext('2d')!;
  g.fillStyle = '#0057b8';
  g.fillRect(0, 0, 256, 96);
  g.fillStyle = '#ffffff';
  g.font = '800 70px "Overpass Variable", Overpass, Arial, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('L', 128, 54);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Car({ reduced }: { reduced: boolean }) {
  const car = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Mesh[]>([]);
  const sign = useMemo(roofSign, []);
  const paint = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#f4f4f2', roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.08 }), []);
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#223044', roughness: 0.05, metalness: 0.3, clearcoat: 1 }), []);
  const tyre = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1b1e', roughness: 0.8 }), []);
  const steer = useRef(0);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    steer.current = THREE.MathUtils.damp(steer.current, tilt.x, 3, d);
    if (car.current) {
      car.current.position.x = steer.current * 0.9;
      car.current.rotation.y = -steer.current * 0.25;
      car.current.rotation.z = steer.current * 0.03;
      car.current.position.y = reduced ? 0 : Math.abs(Math.sin(performance.now() / 160)) * 0.008;
    }
    wheels.current.forEach((w) => w && (w.rotation.x -= reduced ? 0 : d * 8));
  });

  return (
    <group ref={car}>
      <RoundedBox args={[1.5, 0.5, 2.9]} radius={0.16} smoothness={4} position={[0, 0.45, 0]} material={paint} />
      <RoundedBox args={[1.3, 0.48, 1.5]} radius={0.16} smoothness={4} position={[0, 0.9, -0.2]} material={glass} />
      <RoundedBox args={[1.32, 0.08, 1.3]} radius={0.04} position={[0, 1.15, -0.2]} material={paint} />
      {/* roof sign */}
      <group position={[0, 1.33, -0.2]}>
        <mesh>
          <boxGeometry args={[0.6, 0.26, 0.12]} />
          <meshStandardMaterial color="#0057b8" />
        </mesh>
        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[0.58, 0.24]} />
          <meshBasicMaterial map={sign} toneMapped={false} />
        </mesh>
      </group>
      {/* rear lights */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.55, 0.55, 1.46]}>
          <boxGeometry args={[0.3, 0.12, 0.04]} />
          <meshStandardMaterial color="#d52b1e" emissive="#d52b1e" emissiveIntensity={0.6} />
        </mesh>
      ))}
      {[
        [-0.72, 0.28, 0.95],
        [0.72, 0.28, 0.95],
        [-0.72, 0.28, -0.95],
        [0.72, 0.28, -0.95],
      ].map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) wheels.current[i] = el;
          }}
          position={p as [number, number, number]}
          rotation={[0, 0, Math.PI / 2]}
          material={tyre}
        >
          <cylinderGeometry args={[0.3, 0.3, 0.22, 24]} />
        </mesh>
      ))}
    </group>
  );
}

/** Road: the dashed centre line streams past, faster while the visitor scrolls. */
function Road({ reduced }: { reduced: boolean }) {
  const dashes = useRef<THREE.Group>(null);
  const offset = useRef(0);
  const lastScroll = useRef(0);
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const sy = window.scrollY;
    const ds = Math.abs(sy - lastScroll.current);
    lastScroll.current = sy;
    offset.current += (reduced ? 0 : 1.2) * d + ds * 0.01;
    if (dashes.current) dashes.current.position.z = (offset.current % 2) ;
  });
  const marks = useMemo(() => Array.from({ length: 16 }, (_, i) => -26 + i * 2), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        <planeGeometry args={[7, 40]} />
        <meshStandardMaterial color="#3a3d43" roughness={0.95} />
      </mesh>
      {[-3.3, 3.3].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.005, -10]}>
          <planeGeometry args={[0.14, 40]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      <group ref={dashes}>
        <Instances limit={marks.length}>
          <planeGeometry args={[0.14, 1]} />
          <meshStandardMaterial color="#ffc72c" />
          {marks.map((z) => (
            <Instance key={z} position={[0, 0.006, z]} rotation={[-Math.PI / 2, 0, 0]} />
          ))}
        </Instances>
      </group>
    </group>
  );
}

function World({ reduced }: { reduced: boolean }) {
  const fit = useFitScale(5.2);
  return (
    <group scale={fit} position={[0, -1.1, 0]}>
      <Road reduced={reduced} />
      <group position={[1.4, 0, 0]}>
        <Car reduced={reduced} />
      </group>
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [3.2, 2.6, 5.6], fov: 36 }} onCreated={({ gl, camera, scene }) => {
      gl.toneMappingExposure = 1.05;
      camera.lookAt(0.8, -0.4, -1.5);
      scene.fog = new THREE.Fog('#2b2d31', 9, 22);
    }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#fff3dc" />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={1.6} color="#ffffff" scale={[10, 3, 1]} position={[0, 5, 2]} rotation-x={Math.PI / 3} />
        <Lightformer form="rect" intensity={0.8} color="#ffc72c" scale={[3, 3, 1]} position={[-4, 1, 2]} />
      </Environment>
      <World reduced={reduced} />
    </SceneCanvas>
  );
}
