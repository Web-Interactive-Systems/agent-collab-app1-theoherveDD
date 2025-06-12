import { marked } from "marked";

export function Markdown({ children }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked.parse(children || "") }}
      style={{ whiteSpace: "pre-wrap" }}
    />
  );
}