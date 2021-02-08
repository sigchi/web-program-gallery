import { promises as fs } from "fs";
import Gallery from "../src/components/Gallery.svelte";
import program from "../build/js/program.js";

const pages = ["./build/index.html", "./build/index-water.html"];
const { head, html } = Gallery.render({ program });

pages.forEach((page) =>
  fs.readFile(page, "utf8").then((text) => {
    const final = text
      .replace("<!-- svelte.head -->", head)
      .replace("<!-- svelte.html -->", html);

    return fs.writeFile(page, final, "utf8");
  })
);
