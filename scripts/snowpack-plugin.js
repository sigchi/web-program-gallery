const fs = require("fs").promises;
const convert = require("./convert.js");

module.exports = function (
  snowpackConfig,
  { input, output, options = undefined }
) {
  return {
    name: "web-program-gallery",
    resolve: { input, output },
    async load({ filePath }) {
      const text = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(text);
      const converted = convert(data, options);

      return JSON.stringify(converted);
    },
  };
};
