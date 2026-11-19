/* Imported only from lazy scene modules, so three.js never lands in a page's first chunk. */
import { Canvas, useFrame, useThree, type CanvasProps } from '@react-three/fiber';
import { useEffect, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import { tilt } from './tilt';

type Props = {
  active: boolean;
  onReady: () => void;
  children: ReactNode;
  camera?: CanvasProps['camera'];
  dpr?: CanvasProps['dpr'];
  shadows?: boolean;
  className?: string;
  /** Tone/background tweaks per site. */
  onCreated?: CanvasProps['onCreated'];
};

function ReadyProbe({ onReady }: { onReady: () => void }) {
  const fired = useRef(false);
  const frames = useRef(0);
  useFrame(() => {
    if (fired.current) return;
    // Wait two frames so the first visible frame is fully drawn before the poster fades.
    frames.current += 1;
    if (frames.current > 2) {
      fired.current = true;
      onReady();
    }
  });
  return null;
}

export function SceneCanvas({ active, onReady, children, camera, dpr = [1, 1.75], shadows, onCreated }: Props) {
  useEffect(() => {
    THREE.ColorManagement.enabled = true;
  }, []);
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={dpr}
      shadows={shadows}
      camera={camera ?? { position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        state.gl.outputColorSpace = THREE.SRGBColorSpace;
        onCreated?.(state);
      }}
    >
      {children}
      <ReadyProbe onReady={onReady} />
    </Canvas>
  );
}

/**
 * Damped pointer/gyro tilt for a group. `strength` is radians at full tilt.
 * Reduced motion keeps the object still unless the visitor moves the pointer.
 */
export function useTiltGroup(
  ref: React.RefObject<THREE.Object3D | null>,
  opts: { strength?: [number, number]; damping?: number; idleSpin?: number; reduced?: boolean; base?: [number, number, number] } = {},
) {
  const { strength = [0.35, 0.5], damping = 4, idleSpin = 0, reduced = false, base = [0, 0, 0] } = opts;
  const spin = useRef(0);
  useFrame((_, dt) => {
    const o = ref.current;
    if (!o) return;
    const d = Math.min(dt, 0.05);
    if (!reduced && idleSpin) spin.current += idleSpin * d;
    const tx = base[0] + -tilt.y * strength[0];
    const ty = base[1] + tilt.x * strength[1] + spin.current;
    o.rotation.x = THREE.MathUtils.damp(o.rotation.x, tx, damping, d);
    o.rotation.y = THREE.MathUtils.damp(o.rotation.y, ty, damping, d);
    o.rotation.z = base[2];
  });
}

export { tilt };

/** Shrinks the hero object on narrow (portrait) canvases so it never crops. `fit` = world width the object needs. */
export function useFitScale(fit = 4.2, max = 1) {
  const width = useThree((s) => s.viewport.width);
  return Math.min(max, width / fit);
}
