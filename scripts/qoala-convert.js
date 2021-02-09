#!/usr/bin/env node

const convert = require("./convert.js");
const path = require("path");
const fs = require("fs").promises;
const glob = require("glob");

async function convertFile(name, output, options) {
  const outfile = path.resolve(output, path.basename(name));
  const text = await fs.readFile(name, "utf8");
  const data = JSON.parse(text);
  const converted = convert(data, options);

  await fs.writeFile(outfile, JSON.stringify(converted), "utf8");
}

require("yargs")
  .scriptName("qoala-convert")
  .usage("$0 <cmd> [args]")
  .command(
    "convert [files]",
    "convert QOALA programs to gallery json format",
    (yargs) => {
      yargs
        .positional("files", {
          type: "string",
          default: "",
          describe: "glob pattern of QOALA programs to convert",
        })
        .option("o", {
          alias: "output",
          default: "./",
          describe: "output directory",
        })
        .option("c", {
          alias: "config",
          default: "web-gallery.config.js",
          describe: "path to conversion options",
        });
    },
    async (argv) => {
      let options;

      if (argv.config) {
        const resolved = path.resolve(argv.config);

        if (resolved) {
          options = require(resolved);
        }
      }

      await fs.mkdir(argv.output);

      glob(argv.files, (e, files) => {
        files.forEach((fname) => convertFile(fname, argv.output, options));
      });
    }
  )
  .help().argv;
