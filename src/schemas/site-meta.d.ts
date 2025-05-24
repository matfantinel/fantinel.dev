export type SiteMeta = {
  baseUrl: string;
  title: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  keywords: string[];
  description: string;
  lightThemeColor: string;
  darkThemeColor: string;
  fediverseCreator: string;
};