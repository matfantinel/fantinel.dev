import type { ButtonProps } from "@components/atoms/Button";
import type { GenericHeroProps } from "@components/organisms/GenericHero";
import type { HomePageHeroProps } from "@components/organisms/HomePageHero";
import type { SubscribeCtaProps } from "@components/organisms/SubscribeCta";

export type HomeConfig = {
  hero: HomePageHeroProps;
  latestSection?: {
    title?: string;
    headerBody?: string;
    button?: ButtonProps;
  };
};

export type CoolLinkSingleConfig = {
  about?: string;
  timelineIntro?: string;
};

export type CoolLinkArchiveConfig = {
  pageTitle: string;
  pageDescription: string;
  pagePreviewImage?: string;
  hero: GenericHeroProps
};

export type QuickReviewArchiveConfig = {
  pageTitle: string;
  pageDescription: string;
  pagePreviewImage?: string;
  hero: GenericHeroProps;
};

export type PhotographyArchiveConfig = {
  pageTitle: string;
  pageDescription: string;
  pagePreviewImage?: string;
  hero: GenericHeroProps;
};

export type BlogArchiveConfig = {
  pageTitle: string;
  pageDescription: string;
  pagePreviewImage?: string;
  hero: GenericHeroProps;
};

export type TimelineArchiveConfig = {
  pageTitle: string;
  pageDescription: string;
  pagePreviewImage?: string;
  hero: GenericHeroProps;
};

export type QuickReviewSingleConfig = {
  about?: string;
  timelineIntro?: string;
};

export type PhotographySingleConfig = {
  about?: string;
  timelineIntro?: string;
};

export type GardenPageLink = {
  title: string;
  url: string;
  excerpt: string;
};

export type GardenConfig = {
  pageTitle: string;
  pageDescription: string;
  pagePreviewImage?: string;
  hero: GenericHeroProps;
  pages: GardenPageLink[];
};

export type SubscribeConfig = {
  pageTitle: string;
  pageDescription: string;
  pagePreviewImage?: string;
  hero: GenericHeroProps;
  // Any field left empty falls back to the site meta's subscribeCta
  subscribeCta?: Partial<Pick<SubscribeCtaProps, 'heading' | 'body' | 'items'>>;
};

export type BlogSingleConfig = {
  commentCta?: {
    content?: string;
    contentBr?: string;
  };
  relatedPosts?: {
    heading?: string;
    button?: {
      text?: string;
      href?: string;
    };
  };
};