import "./vars.css";
import "./custom.css";
import Gallery from "./components/Gallery.svelte";
import program from "./data/uist-2020.program.json";

const element = document.querySelector("main");

export const app = new Gallery({
  hydrate: true,
  target: element,
  props: { program },
});
