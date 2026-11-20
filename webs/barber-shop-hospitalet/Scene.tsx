import { useMemo } from 'react';
import { PhotoStage, FittedModel, Inertial, type FinishSpec } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/env.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Classic barber chair (Poly Haven, CC0): leather keeps its own maps, the chrome a sharp clearcoat; warm bar HDRI.
 */
const FINISH: FinishSpec = { desaturate: 0.35, clearcoat: 0.25, clearcoatRoughness: 0.3, sheen: 0.1, sheenColor: '#d8c6b8' };

export default function Scene({ active, reduced, onReady }: SceneProps) {
  const urls = useMemo(() => ({ desktop, mobile }), []);
  return (
    <PhotoStage
      active={active}
      reduced={reduced}
      onReady={onReady}
      camera={{ position: [0, 1.0, 7.4], fov: 26, target: [0, -0.1, 0] }}
      lighting={{
        hdr,
        envIntensity: 0.6,
        envRotation: [0, 0, 0],
        exposure: 0.95,
        key: { position: [3, 5, 4], intensity: 2.4, color: '#fff6ee' },
        fill: { position: [-5, 1.2, 3], intensity: 0.45, color: '#c9d3e0' },
        rim: { position: [-2, 3, -5], intensity: 2.4, color: '#f1eadf' },
        shadow: { y: -1.1, opacity: 0.6, blur: 2.4, scale: 5, color: '#120405' },
      }}
      post={{ ao: 1.2, bloom: 0.12, dof: false, grain: 0.04, vignette: 0.22 }}
    >
      <Inertial reduced={reduced} base={[0.12, -0.7]} idle={0.06} position={[0, 0, 0]}>
        <FittedModel urls={urls} size={3.0} orient={[0, 0, 0]} finish={FINISH} />
      </Inertial>
    </PhotoStage>
  );
}
