<script lang="ts">
  import SectionHeader from '@components/molecules/SectionHeader';
  import BlogPostCards from '@components/molecules/BlogPostCards';
  import BlogPostCard from '@components/molecules/BlogPostCard';
  import type { BlogPost } from '@schemas/blog';

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

<div class={['o-posts-section', className]}>
  <div class="o-posts-section__container u-container">
    <SectionHeader 
      class="o-posts-section__header"
      title={title}
      button={button} 
    />
    <BlogPostCards class='l-posts-section__grid' maxPerRow={2}>
      {#each posts as post}
        <BlogPostCard
          class="l-posts-section__card"
          title={post.title}
          slug={post.slug}
          url={`/blog/${post.slug}`}
          image={post.coverImage ?? undefined}
          imageAlt={post.coverImageAlt ?? undefined}
          readingTime={post.readingTime ?? undefined}
          excerpt={post.excerpt}
          tags={post.categories?.slice(0, 1)}
          hideImage
        />
      {/each}
    </BlogPostCards>
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-posts-section {
    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }
  }  
</style>
