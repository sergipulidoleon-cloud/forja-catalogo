import { useMemo } from 'react';
import { PhotoStage, FittedModel, Inertial, type Finish } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/env.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Three scanned limes (Poly Haven, CC0) — the soul of a ceviche — on the Pacific blue.
 * Waxy peel: sheen plus a thin clearcoat over the scan's own normal and roughness maps.
 */
const FINISH: Finish = { clearcoat: 0.3, clearcoatRoughness: 0.3, sheen: 0.18, sheenColor: '#d7ef9a' };

const LIMES: { position: [number, number, number]; orient: [number, number, number]; size: number }[] = [
  { position: [-0.7, -0.15, 0.2], orient: [0.3, 0.4, 1.4], size: 1.45 },
  { position: [0.75, -0.2, -0.1], orient: [-0.2, 2.2, 0.2], size: 1.4 },
  { position: [0.05, 0.75, -0.35], orient: [1.2, -0.8, 0.5], size: 1.35 },
];

export default function Scene({ active, reduced, onReady }: SceneProps) {
  const urls = useMemo(() => ({ desktop, mobile }), []);
  return (
    <PhotoStage
      active={active}
      reduced={reduced}
      onReady={onReady}
      camera={{ position: [0, 1.2, 7], fov: 26, target: [0, -0.05, 0] }}
      lighting={{
        hdr,
        envIntensity: 0.8,
        exposure: 1.0,
        key: { position: [3, 5, 4], intensity: 2.6, color: '#fff4dc' },
        fill: { position: [-5, 1.2, 3], intensity: 0.5, color: '#8fb0d8' },
        rim: { position: [-2, 3, -5], intensity: 2.6, color: '#ffffff' },
        shadow: { y: -0.95, opacity: 0.55, blur: 2.4, scale: 5, color: '#082343' },
      }}
      post={{ ao: 1.3, bloom: 0.12, dof: false, grain: 0.04, vignette: 0.22 }}
    >
      <Inertial reduced={reduced} base={[0.2, -0.3]} idle={0.05}>
        {LIMES.map((l, i) => (
          <group key={i} position={l.position}>
            <FittedModel urls={urls} size={l.size} orient={l.orient} finish={FINISH} />
          </group>
        ))}
      </Inertial>
    </PhotoStage>
  );
}
