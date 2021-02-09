module.exports = {
  alias: {
    "web-program-gallery/src": "./src",
  },
  mount: {
    src: { url: "/web-program-gallery/src" },
    public: { url: "/" },
    "contrib/program-examples": { url: "/data" },
  },
  buildOptions: {
    baseUrl: "/web-program-gallery/",
    sourcemap: true,
  },
  plugins: [
    "@snowpack/plugin-svelte",
    [
      "./scripts/snowpack-plugin.js",
      {
        input: [".program.json"],
        output: [".json"],
        options: {
          types: ["Paper", "Poster", "Demo", "SIC", "DC"],
          copy: ["title", "abstract", "keywords"],
          linkSections: {
            videos: /youtube\.com/,
            images: /\.jpg$/,
          },
          tzOffset: 5 * 60 * 60 * 1000,
        },
      },
    ],
    [
      "@snowpack/plugin-webpack",
      {
        htmlMinifierOptions: {
          removeComments: false,
        },
      },
    ],
  ],
};
