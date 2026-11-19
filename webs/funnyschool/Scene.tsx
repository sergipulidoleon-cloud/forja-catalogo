import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SceneCanvas, useFitScale, tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';

const BLOCKS = [
  { l: 'A', c: '#d2232a', x: -1.4, y: 3.2 },
  { l: 'B', c: '#3fb36e', x: 0, y: 4.4 },
  { l: 'C', c: '#8fd3f4', x: 1.4, y: 3.8 },
  { l: 'D', c: '#ffd23f', x: -0.7, y: 6.0 },
  { l: 'E', c: '#1b2a57', x: 0.8, y: 6.8 },
];

function letterTexture(letter: string, bg: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = bg;
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = 'rgba(255,255,255,0.9)';
  g.lineWidth = 14;
  g.strokeRect(18, 18, 220, 220);
  g.fillStyle = bg === '#ffd23f' || bg === '#8fd3f4' ? '#1b2a57' : '#ffffff';
  g.font = '170px "Lilita One", "Arial Black", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(letter, 128, 140);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

type Body = { p: THREE.Vector3; v: THREE.Vector3; r: THREE.Euler; w: number };

/** Tiny hand-rolled physics: gravity, floor bounce, walls, and a pointer that shoves the blocks. */
function Blocks({ reduced }: { reduced: boolean }) {
  const refs = useRef<THREE.Group[]>([]);
  const fit = useFitScale(4.6);
  const { viewport } = useThree();
  const textures = useMemo(() => BLOCKS.map((b) => letterTexture(b.l, b.c)), []);
  const bodies = useRef<Body[]>(
    BLOCKS.map((b, i) => ({
      p: new THREE.Vector3(b.x, reduced ? -0.95 + (i > 2 ? 1 : 0) : b.y, (i % 2) * 0.4 - 0.2),
      v: new THREE.Vector3(),
      r: new THREE.Euler(0, (i - 2) * 0.3, 0),
      w: (i % 2 ? 1 : -1) * 0.6,
    })),
  );
  const pointer = useRef(new THREE.Vector3(99, 99, 0));
  const prev = useRef(new THREE.Vector3(99, 99, 0));
  const vel = useRef(new THREE.Vector3());

  useFrame((state, dt) => {
    const d = Math.min(dt, 1 / 30);
    const half = viewport.width / 2 / fit - 0.6;
    prev.current.copy(pointer.current);
    pointer.current.set((state.pointer.x * viewport.width) / 2 / fit, (state.pointer.y * viewport.height) / 2 / fit, 0);
    vel.current.subVectors(pointer.current, prev.current).divideScalar(Math.max(d, 1e-3)).clampLength(0, 12);
    bodies.current.forEach((b, i) => {
      if (!reduced) {
        b.v.y -= 9.8 * d;
        // Pointer shove: a soft radial push when the cursor is close.
        const dx = b.p.x - pointer.current.x;
        const dy = b.p.y - pointer.current.y;
        const dist = Math.hypot(dx, dy);
        // The pointer only shoves when it moves: a flick knocks a block, a resting cursor does nothing.
        if (tilt.active && dist < 1.1 && vel.current.lengthSq() > 0.5) {
          const k = (1.1 - dist) * 0.45;
          b.v.x += vel.current.x * k;
          b.v.y += Math.max(0, vel.current.y * k) + Math.abs(vel.current.x) * k * 0.4;
          b.w += vel.current.x * k * 0.6;
        }
        b.p.addScaledVector(b.v, d);
        // floor
        const floor = -0.95 + (i > 2 ? 0 : 0);
        if (b.p.y < floor) {
          b.p.y = floor;
          b.v.y = Math.abs(b.v.y) > 0.6 ? -b.v.y * 0.45 : 0;
          b.v.x *= 0.82;
          b.w *= 0.7;
        }
        if (Math.abs(b.p.x) > half) {
          b.p.x = Math.sign(b.p.x) * half;
          b.v.x *= -0.5;
        }
        b.r.y += b.w * d;
        b.r.z = THREE.MathUtils.damp(b.r.z, b.p.y > floor + 0.05 ? b.w * 0.15 : 0, 6, d);
      }
      // simple separation so blocks stack instead of overlapping
      bodies.current.forEach((o, j) => {
        if (j <= i) return;
        const dx = o.p.x - b.p.x;
        const dy = o.p.y - b.p.y;
        if (Math.abs(dx) < 0.82 && Math.abs(dy) < 0.82) {
          if (Math.abs(dx) > Math.abs(dy)) {
            const push = (0.82 - Math.abs(dx)) / 2;
            b.p.x -= Math.sign(dx || 1) * push;
            o.p.x += Math.sign(dx || 1) * push;
          } else {
            const top = dy > 0 ? o : b;
            const bottom = dy > 0 ? b : o;
            top.p.y = bottom.p.y + 0.82;
            if (top.v.y < 0) top.v.y = 0;
          }
        }
      });
      const g = refs.current[i];
      if (g) {
        g.position.copy(b.p);
        g.rotation.copy(b.r);
      }
    });
  });

  return (
    <group scale={fit}>
      {BLOCKS.map((b, i) => (
        <group
          key={b.l}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
        >
          <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.08} smoothness={4}>
            <meshStandardMaterial map={textures[i]} roughness={0.55} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <SceneCanvas active={active} onReady={onReady} camera={{ position: [0, 0.9, 7], fov: 34 }} onCreated={({ gl, camera }) => {
      gl.toneMappingExposure = 1.05;
      camera.lookAt(0, 0.2, 0);
    }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 5]} intensity={1.4} />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={1} color="#ffffff" scale={[8, 4, 1]} position={[0, 4, 4]} />
      </Environment>
      <Blocks reduced={reduced} />
      <ContactShadows position={[0, -1.36, 0]} opacity={0.35} scale={9} blur={2.2} far={2.5} color="#1b2a57" />
    </SceneCanvas>
  );
}
