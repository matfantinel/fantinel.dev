import type { ButtonProps } from "@components/atoms/Button";
import type { ContentWithImageProps } from "@components/organisms/ContentWithImage";
import type { GenericHeroProps } from "@components/organisms/GenericHero";
import type { HomePageHeroProps } from "@components/organisms/HomePageHero";

export type HomeConfig = {
  hero: HomePageHeroProps;
  blogSection: ContentWithImageProps;
  coolLinksSection: ContentWithImageProps;
  quickReviewsSection: ContentWithImageProps;
  photographySection: ContentWithImageProps;
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

export type BlogSingleConfig = {
  commentCta?: {
    content?: string;
  };
  relatedPosts?: {
    heading?: string;
    button?: {
      text?: string;
      href?: string;
    };
  };
};