import { QuokkaTemplate } from "./Engine/quokka/QuokkaTemplate";

export const runFormat = (input: string): string => {
  const template = new QuokkaTemplate(input);

  if (!template.formatterString) {
    throw new Error("Formatting error");
  }

  return template.formatterString;
};
