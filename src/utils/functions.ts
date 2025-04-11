export const calculateYearsSince = (date: Date) => {
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const cleanupSlashes = (str: string) => {
  // When there are double slashes (//) and they're not preceded by a colon (:)
  // Replace by a single slash
  return str.replace(/([^:])\/\//g, '$1/');
}

export const handleCmsMediaPath = (path: string) => {
  if (!path.startsWith('http')) {
    if (!path.startsWith('/cms')) {
      path = `/cms/${path}`;
    }

    path = cleanupSlashes(path);

    if (!path.startsWith('/cms/media')) {
      // Replace /cms/ with /cms/media/ to get the correct path
      path = path.replace('/cms/', '/cms/media/');
    }

    path = cleanupSlashes(path);
  }

  return path;
}