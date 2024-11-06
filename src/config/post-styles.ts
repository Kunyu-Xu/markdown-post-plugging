export const markdownStyles = [
  { name: "github", css: "" },
  { name: "newspaper", css: "" },
  { name: "poster", css: "" },
  { name: "slim", css: "" },
  { name: "note", css: "" },
];

export const loadCSS = (name: string) =>
  markdownStyles.find((style) => style.name === name)?.css; 