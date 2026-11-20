import { useMemo } from 'react';
import { PhotoStage, FittedModel, Inertial, type FinishSpec } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/env.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Scanned permanent dentition (University of Dundee, CC-BY): enamel with clearcoat, translucency and IOR 1.62 under a soft white studio.
 */
const FINISH: FinishSpec = { clearcoat: 0.85, clearcoatRoughness: 0.16, sheen: 0.25, sheenColor: '#f6efe2', roughness: 0.32, micro: 3 };

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
        key: { position: [3, 5, 4], intensity: 2.4, color: '#fff6ec' },
        fill: { position: [-5, 1.2, 3], intensity: 0.45, color: '#d9d0f0' },
        rim: { position: [-2, 3, -5], intensity: 2.4, color: '#ffffff' },
        shadow: { y: -1.1, opacity: 0.3, blur: 2.4, scale: 5, color: '#2a2240' },
      }}
      post={{ ao: 1.2, bloom: 0.12, dof: false, grain: 0.04, vignette: 0.22 }}
    >
      <Inertial reduced={reduced} base={[0.15, -0.35]} idle={0.06} position={[0, 0, 0]}>
        <FittedModel urls={urls} size={2.4} orient={[0, 0, 0]} finish={FINISH} />
      </Inertial>
    </PhotoStage>
  );
}
