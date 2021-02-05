const fs = require('fs').promises;

module.exports = function (snowpackConfig, { input, output, options = undefined }) {
  const convertModule = import('./convert.mjs');

  return {
    name: 'qoala-flat',
    resolve: { input, output },
    async load({ filePath }) {
      const { default: convert } = await convertModule;
      const text = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(text);
      const converted = convert(data, options);

      return JSON.stringify(converted)
    },
  };
};
