export function getFullFileName(path: string) {
  return path.replace(/^.*[\\/]/, '');
}

export function getFileName(path: string) {
  return getFullFileName(path).replace(/\.[^/.]+$/, '');
}

export function getFileExtension(path: string) {
  return path.split('.').pop() || '';
}
