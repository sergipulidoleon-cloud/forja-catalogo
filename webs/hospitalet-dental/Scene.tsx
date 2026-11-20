import { useMemo } from 'react';
import { PhotoStage, FittedModel, Inertial, type FinishSpec } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/env.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Spiral dental implant (MSDI, CC-BY) rendered as machined titanium on a high-contrast studio HDRI.
 */
const FINISH: FinishSpec = { color: '#c4c8cc', metalness: 1, roughness: 0.3, clearcoat: 0.15, clearcoatRoughness: 0.25, micro: 4 };

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
        key: { position: [3, 5, 4], intensity: 2.4, color: '#f4efe6' },
        fill: { position: [-5, 1.2, 3], intensity: 0.45, color: '#d9c6a5' },
        rim: { position: [-2, 3, -5], intensity: 2.4, color: '#e8eef2' },
        shadow: { y: -1.1, opacity: 0.55, blur: 2.4, scale: 5, color: '#000000' },
      }}
      post={{ ao: 1.2, bloom: 0.12, dof: false, grain: 0.04, vignette: 0.22 }}
    >
      <Inertial reduced={reduced} base={[0.25, -0.4]} idle={0.06} position={[0, 0, 0]}>
        <FittedModel urls={urls} size={2.8} orient={[0, 0, 0]} finish={FINISH} />
      </Inertial>
    </PhotoStage>
  );
}
