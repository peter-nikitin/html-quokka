import { HtmlQuokkaTemplate } from "./HtmlQuokkaTemplate";

export const parseHtml = (input: string) => {
  const template = new HtmlQuokkaTemplate(input);

  if (!template.formatterString) {
    throw new Error("Formatting error");
  }

  return template.formatterString;
};
