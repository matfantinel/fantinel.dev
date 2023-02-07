import type { Srcset } from "./types";

export const calculateYearsSince = (date: Date) => {
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const getSrcsetFromImport = (imageImport: any[]): Srcset => {
  return {
    avif: imageImport.find((set: any) => set.format === 'avif').src,
    webp: imageImport.find((set: any) => set.format === 'webp').src,
    png: imageImport.find((set: any) => set.format === 'png').src
  };
}