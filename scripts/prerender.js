import { promises as fs } from "fs";
import Gallery from "../src/components/Gallery.svelte";
import program from "../src/data/uist-2020.program.json";

const pages = ["./dist/index.html"];
const { head, html } = Gallery.render({ program });

pages.forEach((page) =>
  fs.readFile(page, "utf8").then((text) => {
    const final = text
      .replace("<!-- svelte.head -->", head)
      .replace("<!-- svelte.html -->", html);

    return fs.writeFile(page, final, "utf8");
  })
);
