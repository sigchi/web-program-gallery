import { writable } from 'svelte/store';

function stars(init) {
  const { subscribe, update } = writable(init);

  return {
    subscribe,
    toggle(id) {
      update(([...stars]) => {
        const idx = stars.indexOf(id);

        if(idx > -1) {
          stars.splice(idx, 1);
        } else {
          stars.push(id);
        }

        return stars;
      });
    }
  };
}

const STORAGE_KEY = 'sigchi-gallery-stars';
const init = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
const starStore = stars(init)

starStore.subscribe((stars) => {
  const json = JSON.stringify(stars);
  window.localStorage.setItem(STORAGE_KEY, json);
});

export default starStore;
