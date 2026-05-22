<script lang="ts">
  import SectionHeader from '@components/molecules/SectionHeader';
  import BlogPostCards from '@components/molecules/BlogPostCards';
  import BlogPostCard from '@components/molecules/BlogPostCard';
  import type { BlogPost } from '@schemas/blog';
  import { blogPostToBlogPostCardProps } from '@utils/prop-mapping';
  import type { ButtonProps } from '@components/atoms/Button';
  import type { BaseProps } from '@utils/types';

  export type FeaturedPostsProps = BaseProps & {
    title: string;
    button?: ButtonProps & { icon?: any };
    posts: BlogPost[];
  };

  let {
    title,
    button,
    posts,
    class: className,
  }: FeaturedPostsProps = $props();
</script>

<div class={['o-featured-posts', className]}>
  <div class="o-featured-posts__container">
    <SectionHeader 
      class="o-featured-posts__header"
      title={title}
      button={button} 
    />
    <BlogPostCards class='o-featured-posts__grid' maxPerRow={2}>
      {#each posts as post}
        <BlogPostCard
          class="o-featured-posts__card"
          {...blogPostToBlogPostCardProps(post)}
          hideImage
        />
      {/each}
    </BlogPostCards>
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-featured-posts {
    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }
  }  
</style>
