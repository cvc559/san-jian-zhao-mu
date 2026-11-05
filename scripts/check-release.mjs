import {readdir,readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const files=await readdir('dist');
const scripts=files.filter(f=>/^app-[a-f0-9]+\.js$/.test(f));
assert.equal(scripts.length,1);
assert(!files.includes('assets')&&!files.includes('app.js')&&!files.some(f=>f.endsWith('.map')));
const html=await readFile('dist/index.html','utf8');
assert(html.includes(scripts[0]));
for(const file of [scripts[0],'vendor/three.module.js']){
  const result=spawnSync(process.execPath,['--check','dist/'+file],{stdio:'inherit'});
  assert.equal(result.status,0);
}
console.log('Release syntax and publish boundary passed.');
