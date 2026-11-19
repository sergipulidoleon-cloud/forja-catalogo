/*
 * Premium option: Gaussian Splatting hero with Spark (sparkjs.dev).
 * Drop the exported scan (.spz preferred, .ply or .splat also work) in webs/<slug>/assets/
 * and render <SplatStage url={scanUrl} …/> inside the lazy Scene instead of <PhotoStage>.
 * Not wired to any demo yet: it is used only when a business gives permission to scan.
 */
import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';
import { tilt } from './tilt';

function Splat({ url, scale = 1, rotation = [Math.PI, 0, 0] as [number, number, number], onReady }: { url: string; scale?: number; rotation?: [number, number, number]; onReady: () => void }) {
  const { gl, scene } = useThree();
  const group = useRef<THREE.Group>(null);
  useEffect(() => {
    const spark = new SparkRenderer({ renderer: gl });
    scene.add(spark);
    // Phone captures come in Y-down / Z-forward: the default rotation turns them upright.
    const mesh = new SplatMesh({ url, onLoad: () => onReady() });
    mesh.rotation.set(...rotation);
    mesh.scale.setScalar(scale);
    group.current?.add(mesh);
    return () => {
      group.current?.remove(mesh);
      scene.remove(spark);
      mesh.dispose?.();
    };
  }, [gl, scene, url, scale, rotation, onReady]);
  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    // Gentle parallax only: a splat of a real place looks fake if spun around freely.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tilt.x * 0.12, 3, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -tilt.y * 0.05, 3, d);
  });
  return <group ref={group} />;
}

export function SplatStage({ url, active, onReady, camera = { position: [0, 0, 3], fov: 40 } }: { url: string; active: boolean; onReady: () => void; camera?: { position: [number, number, number]; fov: number } }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.5]} camera={camera} gl={{ antialias: false, alpha: true }}>
      <PerformanceMonitor />
      <AdaptiveDpr pixelated={false} />
      <Splat url={url} onReady={onReady} />
    </Canvas>
  );
}
