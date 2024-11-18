import githubStyle from "../styles/github.css?inline";
import newspaperStyle from "../styles/newspaper.css?inline";
import posterStyle from "../styles/poster.css?inline";
import slimStyle from "../styles/slim.css?inline";
import noteStyle from "../styles/note.css?inline";

export const markdownStyles = [
  { name: "github", css: githubStyle },
  { name: "newspaper", css: newspaperStyle },
  { name: "poster", css: posterStyle },
  { name: "slim", css: slimStyle },
  { name: "note", css: noteStyle },
];

export const loadCSS = (name: string) =>
  markdownStyles.find((style) => style.name === name)?.css;
