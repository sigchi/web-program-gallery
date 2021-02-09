# web-program-gallery

Repo for the web gallery developed at UIST 2020.

Deployed for UIST 2020 at
http://uist.acm.org/uist2020/gallery.html?filter=titles

See the current version here
https://sigchi.github.io/web-program-gallery/

## Using the gallery

To get started with the example setup, clone this repo with the `site-template`
branch checked out:

> `git clone --branch site-template https://github.com/sigchi/web-program-gallery.git`

To run the example, start the site:

> `yarn && yarn programs && yarn start`

You can then visit the gallery in a browser at http://localhost:3000

To bundle the site, run:

> `yarn build`

and the output will be available in `dist`. The example is built with the `vite`
bundler, using the `svite` frontend. You can set various options in
[vite.config.js](https://vitejs.dev/config/) and the
[svite](https://github.com/dominikg/svite) CLI. You can use other bundlers as
well, as long as they can bundle svelte components.

## Adding your own programs

To use your own program, add the corresponding JSON file to
`contrib/program-examples`. Then, change `src/main.js` and
`scripts/prerender.js` to use the new program.

```
// src/main.js

import Gallery from "./components/Gallery.svelte";
// import program from "./data/uist-2020.program.json";
import program from "./data/my-conference-2021.program.json";
```

```
// scripts/prerender.js

import Gallery from "web-program-gallery";
// import program from "../src/data/uist-2020.program.json";
import program from "../src/data/my-conference-2021.program.json";
```

Run `yarn program` to convert the program data, then `yarn start` to confirm
your changes. You can change how the gallery data is represented by customizing
`web-gallery.config.js`.

## Customizing styles

The web gallery tries to use semantic HTML and styles as much as possible. While
there are some rules for properly flowing content inside the gallery tiles, much
of the gallery is left untouched for you to provide extra CSS rules. The example
uses [Water CSS](https://watercss.kognise.dev/) to get a basic look and feel,
but you're not required to keep this stylesheet and can replace it with your own.

To configure various aspects of how the gallery displays content, you can
customize the variables in `src/vars.css`.

## Further customization/build pipelines

The prior documentation covers usage of two main parts, the
`web-program-gallery` svelte component, and the `convert.js` script which
creates data for the component to use. You're free to use your own build systems
with these components. We will be continually updating this documentation to
better illustrate how to use these tools on their own.
