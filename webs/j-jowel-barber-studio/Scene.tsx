import { useMemo } from 'react';
import { PhotoStage, FittedModel, Inertial, type FinishSpec } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/env.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Vintage straight razor (CC-BY): polished steel blade and handle with a lacquer coat, lit by a graffiti-shelter HDRI.
 */
const FINISH: FinishSpec = { clearcoat: 0.4, clearcoatRoughness: 0.2 };

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
        key: { position: [3, 5, 4], intensity: 2.4, color: '#fff2e6' },
        fill: { position: [-5, 1.2, 3], intensity: 0.45, color: '#2340ff' },
        rim: { position: [-2, 3, -5], intensity: 2.4, color: '#ff5a1f' },
        shadow: { y: -1.1, opacity: 0.5, blur: 2.4, scale: 5, color: '#1c1d1f' },
      }}
      post={{ ao: 1.2, bloom: 0.12, dof: false, grain: 0.04, vignette: 0.22 }}
    >
      <Inertial reduced={reduced} base={[0.1, -0.6]} idle={0.06} position={[0, 0, 0]}>
        <FittedModel urls={urls} size={3.0} orient={[Math.PI / 2, 0, 0.35]} finish={FINISH} />
      </Inertial>
    </PhotoStage>
  );
}
