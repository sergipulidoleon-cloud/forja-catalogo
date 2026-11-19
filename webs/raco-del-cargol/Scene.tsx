import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { PhotoStage, usePhotoModel, prepareScene } from '../_kit/photo';
import { tilt } from '../_kit/three';
import type { SceneProps } from '../_kit';
import hdr from './assets/restaurant.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';
import imperfections from './assets/imperfections.webp?url';

/**
 * Land snail (Jungle Jim, CC-BY) in the warm light of the restaurant at night.
 * The shell gets a lacquered clearcoat, the foot a wet sheen with fine roughness variation.
 * It never hurries: it turns toward the pointer at a capped speed, with inertia.
 */
function Snail({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = usePhotoModel({ desktop, mobile });
  const rough = useLoader(THREE.TextureLoader, imperfections);
  const yaw = useRef(-0.9);

  const fitted = useMemo(() => {
    rough.wrapS = rough.wrapT = THREE.RepeatWrapping;
    rough.repeat.set(4, 4);
    rough.colorSpace = THREE.NoColorSpace;
    const root = scene.clone(true);
    prepareScene(root, (m, mesh) => {
      const mat = new THREE.MeshPhysicalMaterial({
        map: m.map,
        // The scan's albedo runs gold under warm light; a cool-grey tint brings it back to shell and flesh.
        color: new THREE.Color('#e8e2dc'),
        roughness: 0.46,
        roughnessMap: rough,
        metalness: 0,
        clearcoat: 0.35,
        clearcoatRoughness: 0.3,
        sheen: 0.12,
        sheenColor: new THREE.Color('#d9c6a8'),
        sheenRoughness: 0.6,
        specularIntensity: 0.4,
      });
      // The scan's albedo is over-saturated (it reads as bronze): pull 35 % of the chroma out of it.
      mat.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          '#include <map_fragment>\n  diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114))), diffuseColor.rgb, 0.65);',
        );
      };
      mesh.material = mat;
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const s = 3.7 / Math.max(size.x, size.y, size.z);
    root.scale.setScalar(s);
    root.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(s));
    return root;
  }, [scene, rough]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    // Capped angular speed: the snail turns slowly toward the pointer, then settles.
    const target = -0.9 + tilt.x * 0.7;
    const max = (reduced ? 0 : 0.35) * d;
    yaw.current += THREE.MathUtils.clamp(target - yaw.current, -max, max);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, yaw.current, 5, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.08 - tilt.y * 0.08, 3, d);
  });

  return (
    <group ref={group}>
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
      camera={{ position: [0, 1.0, 7.4], fov: 24, target: [0, -0.1, 0] }}
      lighting={{
        hdr,
        envIntensity: 0.6,
        exposure: 1.0,
        key: { position: [3, 5, 4], intensity: 2.6, color: '#fff0dc' },
        fill: { position: [-5, 1, 3], intensity: 0.35, color: '#c9b49a' },
        rim: { position: [-2, 3, -5], intensity: 3.2, color: '#ffe8cf' },
        shadow: { y: -0.95, opacity: 0.65, blur: 2.4, scale: 6, color: '#120408' },
      }}
      post={{ ao: 1.4, bloom: 0.16, dof: { focus: 0.02, bokeh: 1.0 }, grain: 0.05, vignette: 0.3 }}
    >
      <Snail reduced={reduced} />
    </PhotoStage>
  );
}
