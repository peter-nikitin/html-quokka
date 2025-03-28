
import {HtmlTemplate} from "./HtmlTemplate";

export const main = (input: string) => {
  const template = new HtmlTemplate(input);

  if (!template.formatterString) {
    throw new Error("Formatting error");
  }

  return template.formatterString;
}