const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess(),
  compilerOptions: {
    hydratable: true,
  },
};
