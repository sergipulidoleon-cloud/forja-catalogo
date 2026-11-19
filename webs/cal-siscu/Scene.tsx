import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { PhotoStage, usePhotoModel, useInertialRotation, prepareScene } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/cellar.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Cooked lobster (Ant Gregory, CC-BY) with its full PBR set, lit like a still life in the bodega:
 * cellar HDRI, warm tungsten key from above-right, brass-tinted fill and a cold rim that
 * separates the shell from the bottle-green page.
 */
function Lobster({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = usePhotoModel({ desktop, mobile });
  useInertialRotation(group, { base: [0.32, -0.75], idle: 0.05, reduced, tiltStrength: [0.12, 0.3] });

  const fitted = useMemo(() => {
    const root = scene.clone(true);
    prepareScene(root, (m, mesh) => {
      // A cooked shell has a wet, slightly lacquered sheen over a rough base.
      const phys = new THREE.MeshPhysicalMaterial({
        map: m.map,
        normalMap: m.normalMap,
        aoMap: m.aoMap,
        roughnessMap: m.roughnessMap,
        metalnessMap: m.metalnessMap,
        roughness: 1,
        metalness: m.metalness,
        clearcoat: 0.55,
        clearcoatRoughness: 0.28,
        sheen: 0.3,
        sheenColor: new THREE.Color('#ff9a6a'),
        sheenRoughness: 0.5,
      });
      if (m.normalMap) phys.normalScale = new THREE.Vector2(1, 1);
      mesh.material = phys;
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const s = 3.9 / Math.max(size.x, size.y, size.z);
    root.scale.setScalar(s);
    root.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(s));
    return root;
  }, [scene]);

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      <primitive object={fitted} />
    </group>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <PhotoStage
      active={active}
      reduced={reduced}
      onReady={onReady}
      camera={{ position: [0, 2.4, 6.2], fov: 27, target: [0, -0.1, 0] }}
      lighting={{
        hdr,
        envIntensity: 0.7,
        exposure: 1.0,
        key: { position: [3, 6, 3], intensity: 3.2, color: '#ffd9a8' },
        fill: { position: [-5, 1.5, 2], intensity: 0.5, color: '#c6a15b' },
        rim: { position: [-1.5, 3, -5], intensity: 3, color: '#dff0f2' },
        shadow: { y: -0.7, opacity: 0.72, blur: 2.2, scale: 7, color: '#040d0b' },
      }}
      post={{ ao: 1.6, bloom: 0.15, dof: { focus: 0.02, bokeh: 1.2 }, grain: 0.05, vignette: 0.32 }}
    >
      <Lobster reduced={reduced} />
    </PhotoStage>
  );
}
