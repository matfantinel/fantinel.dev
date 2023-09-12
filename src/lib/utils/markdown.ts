import type { marked } from 'marked';

export const SparklesHighlightTokenizerExtension: marked.TokenizerAndRendererExtension = {
  name: 'sparklesHighlight',
  // 'inline' looks for matches within a paragraph or other blocks
  level: 'inline',
  start(src: string) {
    // Marks the start of a match
    return src.indexOf('@@@');
  },
  tokenizer(src: string) {
    // Will match anything between @@@ and @@@. e.g. @@@sparkle@@@
    const rule = /^\@\@\@(.*?)\@\@\@/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'sparklesHighlight',
        raw: match[0],
        text: match[1],
        color: 'secondary'
      };
    }
  },
  renderer(token) {
    // This is the HTML that will be generated for the token
    // ⚠️ Only applies to the generated RSS file
    return `<span>${token.text}</span>`;
  }
};

export const MarkerHighlightTokenizerExtension: marked.TokenizerAndRendererExtension = {
  name: 'markerHighlight',
  level: 'inline',
  start(src: string) {
    return src.indexOf('///');
  },
  tokenizer(src: string) {
    // Will match anything between /// and ///. e.g. ///highlight///
    const rule = /^\/\/\/(.*?)\/\/\//;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'markerHighlight',
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    // This is the HTML that will be generated for the token
    // ⚠️ Only applies to the generated RSS file
    return `<span>${token.text}</span>`;
  }
};

export const ButtonTokenizerExtension: marked.TokenizerAndRendererExtension = {
  name: 'button',
  level: 'block',
  start(src: string) {
    return src.indexOf('[[[');
  },
  tokenizer(src: string) {
    // Will match anything between [[[ and ]]]. e.g. [[[button text]]]
    const rule = /^\[\[\[(.*?)\]\]\]/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'button',
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    // This is the HTML that will be generated for the token
    // ⚠️ Only applies to the generated RSS file
    const parts = token.text.split('||');
    const buttonText = parts[0].trim();
    const propsPart = parts[1]?.trim() || '';

    const propsArray = propsPart.split(/\s+/).map((prop: string) => {
      const [name, value] = prop.split('=');
      return { [name]: value };
    });

    // Get the first item in the array that has a property called "href"
    // and use that as the href for the button
    const href = propsArray.find((prop: any) => prop['href'])['href'];

    return `<a style="display:block" href="${href}">${buttonText}</a>`;
  }
};