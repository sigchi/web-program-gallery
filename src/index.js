import Gallery from 'web-program-gallery/src/components/Gallery.svelte';
import program from './program.js';

const element = document.querySelector('main');

export const app = new Gallery({
  hydrate: true,
  target: element,
  props: { program },
});

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
