import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import run from '@rollup/plugin-run';
import svelte from 'rollup-plugin-svelte';

export default {
  input: 'scripts/prerender.js',
  output: {
    format: 'cjs',
    file: 'scripts/dist/prerender.js',
  },
  plugins: [
    nodeResolve(),
    json(),
    svelte({
      compilerOptions: {
        dev: false,
        generate: 'ssr',
        hydratable: true,
      },
    }),
    run(),
  ],
}
