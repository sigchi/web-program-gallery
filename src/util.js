export function getPath(obj, path) {
  return path.split('.').reduce((r, k) => r[k], obj);
}

export function shuffle([...array]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
