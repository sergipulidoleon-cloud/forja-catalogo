import { useEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { PhotoStage, usePhotoModel, useInertialRotation, prepareScene } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/studio.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';
import imperfections from './assets/imperfections.webp?url';

/**
 * Real scanned human lower first molar (University of Dundee, CC-BY), lit like a product shot:
 * soft white studio HDRI, warm key, cool fill, crisp rim. Enamel gets clearcoat, a touch of
 * translucency and fingerprint-level roughness variation so it never reads as plastic.
 */
function Molar({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = usePhotoModel({ desktop, mobile });
  const rough = useLoader(THREE.TextureLoader, imperfections);
  useInertialRotation(group, { base: [0.28, -0.5], idle: 0.08, reduced });

  const fitted = useMemo(() => {
    rough.wrapS = rough.wrapT = THREE.RepeatWrapping;
    rough.repeat.set(3, 3);
    rough.colorSpace = THREE.NoColorSpace;
    const root = scene.clone(true);
    prepareScene(root, (m, mesh) => {
      const phys = new THREE.MeshPhysicalMaterial({
        map: m.map,
        color: new THREE.Color('#fffdf8'),
        roughness: 0.32,
        roughnessMap: rough,
        metalness: 0,
        clearcoat: 0.9,
        clearcoatRoughness: 0.14,
        sheen: 0.25,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color('#f6efe2'),
        transmission: 0.08,
        thickness: 0.6,
        ior: 1.62, // enamel ≈ 1.62
        attenuationColor: new THREE.Color('#f1dfc4'),
        attenuationDistance: 1.4,
        specularIntensity: 0.6,
      });
      mesh.material = phys;
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const s = 1.95 / Math.max(size.x, size.y, size.z);
    root.scale.setScalar(s);
    const c = box.getCenter(new THREE.Vector3()).multiplyScalar(s);
    root.position.sub(c);
    return root;
  }, [scene, rough]);

  useEffect(() => () => fitted.traverse((o) => ((o as THREE.Mesh).isMesh ? ((o as THREE.Mesh).material as THREE.Material).dispose() : null)), [fitted]);

  return (
    <group ref={group} position={[0, 0.12, 0]}>
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
      camera={{ position: [0, 0.35, 7.2], fov: 22, target: [0, -0.05, 0] }}
      lighting={{
        hdr,
        envIntensity: 0.85,
        exposure: 1.05,
        key: { position: [3.5, 5, 4], intensity: 2.2, color: '#fff4e6' },
        fill: { position: [-5, 1, 3], intensity: 0.45, color: '#cfe3e1' },
        rim: { position: [-2, 3, -5], intensity: 2.6, color: '#ffffff' },
        shadow: { y: -1.05, opacity: 0.34, blur: 2.4, scale: 3.2, color: '#27474c' },
      }}
      post={{ ao: 1.1, bloom: 0.12, dof: false, grain: 0.035, vignette: 0.18 }}
    >
      <Molar reduced={reduced} />
    </PhotoStage>
  );
}
