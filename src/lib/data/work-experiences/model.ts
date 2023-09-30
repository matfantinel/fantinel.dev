import type { TagType } from "$lib/utils/types"

type WorkExperience = {
  companySlug: string,
  company: string,
  jobTitle: string,
  timeframe: string,
  current?: boolean,
  location: string,
  description: string,
  tags: TagType[]
}

export const frontmatterToWorkExperience = (frontmatter: any): WorkExperience => {
  return {
    companySlug: frontmatter.companySlug,
    company: frontmatter.company,
    jobTitle: frontmatter.jobTitle,
    timeframe: frontmatter.timeframe,
    current: frontmatter.current,
    location: frontmatter.location,
    description: frontmatter.description,
    tags: frontmatter.technologies
  }
}

export default WorkExperience