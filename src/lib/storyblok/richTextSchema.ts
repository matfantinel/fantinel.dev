import type { ISbNode, NodeSchema, MarkSchema, ISbComponentType } from 'storyblok-js-client/src/interfaces'

// =====================================================
// Modifications of the original storyblok-js-client/src/schema.ts
// to match my needs:
// - Change the 'highlight' tag from <span> to <mark>
// - Add "/m/" to the end of the image URLs to enable Storyblok's Image Service optimizations
// - Don't wrap emojis in other tags
// =====================================================

const pick = function (attrs: Attrs, allowed: string[]) {
  const h = {} as Attrs

  for (const key in attrs) {
    const value = attrs[key]
    if (allowed.indexOf(key) > -1 && value !== null) {
      h[key] = value
    }
  }
  return h
}

const isEmailLinkType = (type: string) => type === 'email'

type Attrs = {
  [key: string]: string | number | Array<ISbComponentType<any>>
}

// nodes
const horizontal_rule: NodeSchema = () => {
  return {
    singleTag: 'hr',
  }
}
const blockquote: NodeSchema = () => {
  return {
    tag: 'blockquote',
  }
}
const bullet_list: NodeSchema = () => {
  return {
    tag: 'ul',
  }
}
const code_block: NodeSchema = (node: ISbNode) => {
  return {
    tag: [
      'pre',
      {
        tag: 'code',
        attrs: node.attrs,
      },
    ],
  }
}
const hard_break: NodeSchema = () => {
  return {
    singleTag: 'br',
  }
}
const heading: NodeSchema = (node: ISbNode) => {
  return {
    tag: `h${node.attrs.level}`,
  }
}

const image: NodeSchema = (node: ISbNode) => {
  return {
    singleTag: [
      {
        tag: 'img',
        attrs: {
          src: `${node.attrs.src}/m/`,
          ...pick(node.attrs, ['alt', 'title'])
        },
      },
    ],
  }
}
const list_item: NodeSchema = () => {
  return {
    tag: 'li',
  }
}
const ordered_list: NodeSchema = () => {
  return {
    tag: 'ol',
  }
}
const paragraph: NodeSchema = () => {
  return {
    tag: 'p',
  }
}

const emoji: NodeSchema = (node: ISbNode) => {
  return {
    emoji
  }
}

// marks
const bold: MarkSchema = () => {
  return {
    tag: 'b',
  }
}
const strike: MarkSchema = () => {
  return {
    tag: 'strike',
  }
}
const underline: MarkSchema = () => {
  return {
    tag: 'u',
  }
}
const strong: MarkSchema = () => {
  return {
    tag: 'strong',
  }
}
const code: MarkSchema = () => {
  return {
    tag: 'code',
  }
}
const italic: MarkSchema = () => {
  return {
    tag: 'i',
  }
}
const link: MarkSchema = (node: ISbNode) => {
  const attrs = { ...node.attrs }
  const { linktype = 'url' } = node.attrs

  if (isEmailLinkType(linktype)) {
    attrs.href = `mailto:${attrs.href}`
  }

  if (attrs.anchor) {
    attrs.href = `${attrs.href}#${attrs.anchor}`
    delete attrs.anchor
  }

  if (attrs.custom) {
    for (const key in attrs.custom) {
      attrs[key] = attrs.custom[key]
    }
    delete attrs.custom
  }

  return {
    tag: [
      {
        tag: 'a',
        attrs: attrs,
      },
    ],
  }
}

const styled: MarkSchema = (node: ISbNode) => {
  return {
    tag: [
      {
        tag: 'span',
        attrs: node.attrs,
      },
    ],
  }
}

const subscript: MarkSchema = () => {
  return {
    tag: 'sub',
  }
}

const superscript: MarkSchema = () => {
  return {
    tag: [
      {
        tag: 'span',
        attrs: {
          class: 'sparkles-wrapper highlight'
        },
      },
      {
        tag: 'strong',
        attrs: {
          class: 'sparkles-content'
        },
      },
    ],
  }
}

const anchor: MarkSchema = (node: ISbNode) => {
  return {
    tag: [
      {
        tag: 'span',
        attrs: node.attrs,
      },
    ],
  }
}

const highlight: MarkSchema = (node: ISbNode) => {
  return {
    tag: [
      {
        tag: 'mark'
      },
    ],
  }
}

const textStyle: MarkSchema = (node: ISbNode) => {
  if (!node.attrs?.color) return {
    tag: '',
  }

  const attrs = {
    ['style']: `color:${node.attrs.color}`,
  }
  return {
    tag: [
      {
        tag: 'span',
        attrs,
      },
    ],
  }
}

export default {
  nodes: {
    horizontal_rule,
    blockquote,
    bullet_list,
    code_block,
    hard_break,
    heading,
    image,
    list_item,
    ordered_list,
    paragraph,
    emoji
  },
  marks: {
    bold,
    strike,
    underline,
    strong,
    code,
    italic,
    link,
    styled,
    subscript,
    superscript,
    anchor,
    highlight,
    textStyle,
  },
}