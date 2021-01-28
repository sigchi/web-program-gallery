module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
    './contrib/program-examples': { url: '/data' },
  },
  plugins: [
    '@snowpack/plugin-svelte',
    [
      'qoala-flat',
      {
        input: ['.program.json'],
        output: ['.json'],
        options: {
          types: ['Paper', 'Poster', 'Demo', 'SIC', 'DC'],
          copy: ['title', 'abstract', 'keywords'],
          linkSections: {
            videos: /youtube\.com/,
            images: /\.jpg$/
          },
          tzOffset: 5 * 60 * 60 * 1000
        }
      }
    ]
  ],
}
