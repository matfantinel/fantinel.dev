<script lang="ts">
  import SectionHeader from '@components/molecules/SectionHeader';
  import BlogPostCards from '@components/molecules/BlogPostCards';
  import BlogPostCard from '@components/molecules/BlogPostCard';
  import type { BlogPost } from '@schemas/blog';
  import { blogPostToBlogPostCardProps } from '@utils/prop-mapping';

  let {
    title,
    button,
    posts,
    class: className,
  }: {
    title: string;
    button?: { text: string; url: string };
    posts: BlogPost[];
    class?: string;
  } = $props();
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
