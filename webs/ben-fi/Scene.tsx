import { useMemo } from 'react';
import { PhotoStage, FittedModel, Inertial, type FinishSpec } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/env.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Cosmetic serum bottle with dropper (CC-BY): dark glass with transmission and IOR 1.5, rubber bulb with sheen; soft small-studio HDRI.
 */
const FINISH: FinishSpec = (m) =>
  /bottle/i.test(m.name)
    ? { color: '#3b2a22', transmission: 0.45, roughness: 0.06, ior: 1.5, thickness: 0.4, attenuationColor: '#5a3424', attenuationDistance: 0.5, clearcoat: 1, clearcoatRoughness: 0.04, micro: 6 }
    : /rubber/i.test(m.name)
      ? { color: '#2e2a2b', roughness: 0.7, sheen: 0.4, sheenColor: '#6b5f60', micro: 4 }
      : { clearcoat: 0.3, clearcoatRoughness: 0.2 };

export default function Scene({ active, reduced, onReady }: SceneProps) {
  const urls = useMemo(() => ({ desktop, mobile }), []);
  return (
    <PhotoStage
      active={active}
      reduced={reduced}
      onReady={onReady}
      camera={{ position: [0, 1.2, 7], fov: 26, target: [0, -0.1, 0] }}
      lighting={{
        hdr,
        envIntensity: 0.8,
        envRotation: [0, 0, 0],
        exposure: 1.0,
        key: { position: [3, 5, 4], intensity: 2.4, color: '#fff3ee' },
        fill: { position: [-5, 1.2, 3], intensity: 0.45, color: '#f3d9d3' },
        rim: { position: [-2, 3, -5], intensity: 2.4, color: '#ffffff' },
        shadow: { y: -1.1, opacity: 0.35, blur: 2.4, scale: 5, color: '#2e2a2b' },
      }}
      post={{ ao: 1.2, bloom: 0.12, dof: false, grain: 0.04, vignette: 0.22 }}
    >
      <Inertial reduced={reduced} base={[0.08, -0.5]} idle={0.06} position={[0, 0, 0]}>
        <FittedModel urls={urls} size={2.9} orient={[0, 0, 0]} finish={FINISH} />
      </Inertial>
    </PhotoStage>
  );
}
