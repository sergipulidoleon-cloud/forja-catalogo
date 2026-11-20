import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, type RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { PhotoStage, usePhotoModel, physicalFrom } from '../_kit/photo';
import type { SceneProps } from '../_kit';
import hdr from './assets/env.hdr?url';
import desktop from './assets/model.glb?url';
import mobile from './assets/model-mobile.glb?url';

/**
 * Wooden alphabet blocks (CC-BY) with their painted-wood PBR maps and a varnish clearcoat.
 * Five of them spell FUNNY: they drop onto the floor with Rapier physics, tumble and settle,
 * and a quick swipe of the pointer nudges whichever block it passes over.
 */
const WORD = ['F', 'U', 'N', 'N', 'Y'];
const SIZE = 0.62; // block edge in world units
const FACE_TURN = -Math.PI / 2; // the source wall faces +X

function useBlocks() {
  const { scene } = usePhotoModel({ desktop, mobile });
  return useMemo(() => {
    scene.updateMatrixWorld(true);
    const byLetter = new Map<string, THREE.Mesh>();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      const letter = /^([A-Z])_low/.exec(o.name)?.[1];
      if (m.isMesh && letter && !byLetter.has(letter)) byLetter.set(letter, m);
    });
    return WORD.map((l) => {
      const src = byLetter.get(l)!;
      // Bake the node transform, then turn the block so its painted letter faces the camera (+Z).
      const geo = src.geometry.clone().applyMatrix4(src.matrixWorld);
      geo.rotateY(FACE_TURN);
      geo.computeBoundingBox();
      const box = geo.boundingBox!;
      const dim = box.getSize(new THREE.Vector3());
      const s = SIZE / Math.max(dim.x, dim.y, dim.z);
      geo.translate(...box.getCenter(new THREE.Vector3()).negate().toArray());
      geo.scale(s, s, s);
      const mat = physicalFrom(src.material as THREE.MeshStandardMaterial, { clearcoat: 0.35, clearcoatRoughness: 0.35, sheen: 0.1, sheenColor: '#fff2d6' });
      return { letter: l, geo, mat };
    });
  }, [scene]);
}

function Blocks({ reduced }: { reduced: boolean }) {
  const blocks = useBlocks();
  const bodies = useRef<(RapierRigidBody | null)[]>([]);
  const { pointer, camera } = useThree();
  const last = useRef(new THREE.Vector2());
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  // Start positions: a loose arc above the floor, slightly rotated, so the fall reads as hand-dropped.
  const starts = useMemo(
    () =>
      WORD.map((_, i) => ({
        position: [(i - 2) * 0.72, reduced ? -0.85 : 2.4 + i * 0.7, (i % 2) * 0.2] as [number, number, number],
        rotation: [reduced ? 0 : 0.4 * Math.sin(i * 1.7), reduced ? -0.25 + i * 0.1 : 0.8 * Math.cos(i * 2.3), reduced ? 0 : 0.3 * Math.sin(i)] as [number, number, number],
      })),
    [reduced],
  );

  useEffect(() => {
    last.current.copy(pointer);
  }, [pointer]);

  // A fast pointer sweep pushes the block under it (velocity-based, like a flick of the hand).
  useFrame((_, dt) => {
    if (reduced) return;
    const d = Math.max(dt, 1 / 120);
    const vx = (pointer.x - last.current.x) / d;
    const vy = (pointer.y - last.current.y) / d;
    last.current.copy(pointer);
    if (Math.hypot(vx, vy) < 1.2) return;
    ray.setFromCamera(pointer, camera);
    if (!ray.ray.intersectPlane(plane, hit)) return;
    bodies.current.forEach((b) => {
      if (!b) return;
      const p = b.translation();
      const dist = Math.hypot(p.x - hit.x, p.y - hit.y);
      if (dist < 0.7) b.applyImpulse({ x: THREE.MathUtils.clamp(vx, -6, 6) * 0.35, y: Math.abs(vy) * 0.15 + 0.8, z: 0 }, true);
    });
  });

  return (
    <>
      {blocks.map((b, i) => (
        <RigidBody
          key={i}
          ref={(r) => {
            bodies.current[i] = r;
          }}
          colliders={false}
          position={starts[i].position}
          rotation={starts[i].rotation}
          restitution={0.25}
          friction={0.8}
          linearDamping={0.15}
          angularDamping={0.3}
          type={reduced ? 'fixed' : 'dynamic'}
        >
          <CuboidCollider args={[SIZE / 2, SIZE / 2, SIZE / 2]} mass={0.4} />
          <mesh geometry={b.geo} material={b.mat} castShadow receiveShadow />
        </RigidBody>
      ))}
      {/* Floor and soft side walls keep the blocks inside the frame. */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[8, 0.1, 4]} position={[0, -1.15, 0]} />
        <CuboidCollider args={[0.1, 4, 4]} position={[-2.1, 2, 0]} />
        <CuboidCollider args={[0.1, 4, 4]} position={[2.1, 2, 0]} />
        <CuboidCollider args={[8, 4, 0.1]} position={[0, 2, -0.9]} />
        <CuboidCollider args={[8, 4, 0.1]} position={[0, 2, 1.0]} />
      </RigidBody>
    </>
  );
}

export default function Scene({ active, reduced, onReady }: SceneProps) {
  return (
    <PhotoStage
      active={active}
      reduced={reduced}
      onReady={onReady}
      camera={{ position: [0, 1.1, 8.2], fov: 30, target: [0, -0.2, 0] }}
      lighting={{
        hdr,
        envIntensity: 0.85,
        exposure: 1.05,
        key: { position: [3, 6, 4], intensity: 2.4, color: '#fff6e0' },
        fill: { position: [-5, 1.2, 3], intensity: 0.5, color: '#8fd3f4' },
        rim: { position: [-2, 3, -5], intensity: 2, color: '#ffffff' },
        shadow: { y: -1.24, opacity: 0.32, blur: 2.6, scale: 5.5, color: '#1b2a57' },
      }}
      post={{ ao: 1.2, bloom: 0.1, dof: false, grain: 0.035, vignette: 0.16 }}
    >
      <Physics gravity={[0, -9.81, 0]} paused={!active}>
        <Blocks reduced={reduced} />
      </Physics>
    </PhotoStage>
  );
}
