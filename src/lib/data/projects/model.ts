import type { TagType } from "$lib/utils/types"

type Project = {
  name: string,
  description: string,
  image: string,
  link?: string,
  sourceCode?: string,
  blogPostLink?: string,
  tags: TagType[]
}

export const frontmatterToProject = (frontmatter: any): Project => {
  return {
    name: frontmatter.name,
    description: frontmatter.description,
    image: '/images' + frontmatter.image,
    link: frontmatter.link,
    sourceCode: frontmatter.sourceCode,
    blogPostLink: frontmatter.blogPostLink,
    tags: frontmatter.labels
  }
}

export default Project