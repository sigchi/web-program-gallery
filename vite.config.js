const svelte = require("@sveltejs/vite-plugin-svelte");
const { defineConfig } = require("vite");

module.exports = defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";

  return {
    optimizeDeps: {
      exclude: ["yargs", "glob"],
    },
    plugins: [svelte({})],
    build: {
      minify: isProduction,
    },
  };
});
