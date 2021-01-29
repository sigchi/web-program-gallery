export function getPath(obj, path) {
  return path.split('.').reduce((r, k) => r[k], obj);
}
