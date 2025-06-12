export type SiteMeta = {
  baseUrl: string;
  title: string;
  image: string;
  author: SiteAuthor;
  keywords: string[];
  description: string;
  lightThemeColor: string;
  darkThemeColor: string;
  fediverseCreator: string;
  newsletterCta: {
    heading: string;
    body: string;
    formUrl: string;
  };
};

export type SiteAuthor = {
  name: string;
  image: string | null;
  extraImages?: string[];
  bio?: string;
  shortBio?: string;
  socials?: SocialLink[];
}

export type SocialLink = {
  name: string;
  url: string;
  label?: string;
}