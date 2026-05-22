import type { BlogPost } from "@schemas/blog";
import dateformat from "dateformat";

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

export const isInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export const generateOgPathFromPost = (post: BlogPost) => {
  let result = '/opengraph';
  result += `/${btoa(encodeURIComponent(post.title))}`;
  if (post.date) {
    result += `/${btoa(encodeURIComponent(
      dateformat(post.date, 'mmm dd, yyyy')
    ))}`;
  }
  result += '/image.png';

  return result;
}

export const generateOgPathFromCoolLinksPost = (post: BlogPost) => {
  let result = '/opengraph/cool-links';
  const title = post.title.split(':')[0];
  result += `/${btoa(encodeURIComponent(title))}`;
  if (post.date) {
    result += `/${btoa(encodeURIComponent(
      post.date.toISOString()
    ))}`;
  }
  result += '/image.png';

  return result;
}

/**
 * Recursively walks an object, array, or primitive and applies a transform
 * function to every string value found, preserving the original structure and type.
 * @param data The value to walk. Can be a string, array, object, or any primitive.
 * @param transform A function applied to each string value encountered.
 * @returns The same structure as `data`, with all strings transformed.
 */
export function transformStrings<T>(data: T, transform: (value: string) => string): T {
  if (typeof data === 'string') {
    return transform(data) as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => transformStrings(item, transform)) as T;
  }
  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, transformStrings(value, transform)])
    ) as T;
  }
  return data;
}