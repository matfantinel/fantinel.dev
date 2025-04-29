export class LoremIpsum {
  static paragraph = "Do ut officia reprehenderit. Aute aliquip qui sit qui pariatur est fugiat velit tempor labore laboris aute. Nisi labore adipisicing adipisicing esse enim. Ipsum consequat laborum cupidatat aliqua cupidatat cupidatat elit incididunt minim tempor do dolor. Excepteur tempor magna deserunt proident incididunt laborum.";
  
  static sentence = "Cillum fugiat excepteur non est minim qui sit est officia excepteur ipsum.";

  static words = "Lorem ipsum dolor sit amet";

  static jsCode = "function foo() {\n  return 'bar';\n}"
  static cssCode = "body {\n  background-color: #000;\n}"
  static htmlCode = `<h1>${LoremIpsum.words}</h1>\n<p>${LoremIpsum.sentence}</p>`
  static mdCode = `
  ## ${LoremIpsum.words}

  ${LoremIpsum.sentence} ==${LoremIpsum.words}==
  
  - ${LoremIpsum.sentence}
  - ${LoremIpsum.sentence}
  `;
}