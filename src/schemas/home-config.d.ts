import type { ContentWithImageProps } from "@components/organisms/ContentWithImage";
import type { HomePageHeroProps } from "@components/organisms/HomePageHero";

export type HomeConfig = {
  hero: HomePageHeroProps;
  blogSection: ContentWithImageProps;
  coolLinksSection: ContentWithImageProps;
  quickReviewsSection: ContentWithImageProps;
  photographySection: ContentWithImageProps;
};