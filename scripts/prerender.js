import { promises as fs } from "fs";
import Gallery from "../src/components/Gallery.svelte";
import program from "../build/js/program.js";

const page = "./build/index.html";
const { head, html } = Gallery.render({ program });

fs.readFile(page, "utf8")
  .then((text) => {
    const final = text
      .replace("<!-- svelte.head -->", head)
      .replace(
        "<!-- css.bundled -->",
        '<link rel="stylesheet" href="/bundle.css" />'
      )
      .replace("<!-- svelte.html -->", html);

    return fs.writeFile(page, final, "utf8");
  })
  .then(() => fs.rename("scripts/dist/bundle.css", "build/bundle.css"));
