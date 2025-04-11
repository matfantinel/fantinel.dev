export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type SparkleType = {
  id: string,
  createdAt: number,
  color: string,
  size: number,
  style: any
}

export type TagType = {
  label: string,
  color?: 'primary' | 'secondary'
}

export type Project = {
  name: string,
  description: string,
  image: string,
  link?: string,
  sourceCode?: string,
  blogPostLink?: string,
  tags: TagType[]
}

export type Image = {
  src: string,
  alt: string
}

export type PaginatedResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  currentCategory?: string;
};