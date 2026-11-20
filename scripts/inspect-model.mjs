// node scripts/inspect-model.mjs <file.glb>... : prints size, meshes and material maps (for tuning hero scenes).
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptDecoder } from 'meshoptimizer';
import { getBounds } from '@gltf-transform/core';
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder });
for (const f of process.argv.slice(2)) {
  const doc = await io.read(f);
  const r = doc.getRoot();
  const b = getBounds(r.listScenes()[0]);
  const sz = b.max.map((v, i) => +(v - b.min[i]).toFixed(3));
  console.log('##', f, 'size', sz.join(' x '));
  console.log('  meshes:', r.listNodes().filter((n) => n.getMesh()).map((n) => n.getName()).slice(0, 30).join(', '));
  console.log('  materials:', r.listMaterials().map((m) => `${m.getName()}[${['getBaseColorTexture','getNormalTexture','getMetallicRoughnessTexture','getOcclusionTexture','getEmissiveTexture'].filter((k)=>m[k]()).map(k=>k.slice(3,7)).join('/')} a=${m.getAlphaMode()} m=${m.getMetallicFactor()} r=${m.getRoughnessFactor()}]`).join(', '));
}
