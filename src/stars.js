import { writable } from "svelte/store";

const STORAGE_KEY = "sigchi-gallery-stars";

function stars(init) {
  const { subscribe, update } = writable(init);

  return {
    subscribe,
    toggle(id) {
      update(([...stars]) => {
        const idx = stars.indexOf(id);

        if (idx > -1) {
          stars.splice(idx, 1);
        } else {
          stars.push(id);
        }

        return stars;
      });
    },
  };
}

function retrieveStars() {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
  } else {
    return [];
  }
}

const init = retrieveStars();
const starStore = stars(init);

if (typeof window !== "undefined") {
  starStore.subscribe((stars) => {
    const json = JSON.stringify(stars);
    window.localStorage.setItem(STORAGE_KEY, json);
  });
}

export default starStore;
