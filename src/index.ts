import { readFileSync } from "fs";
import { Template } from "./Engine/Template";


const path = {
  input:
    "/Users/nikitin/Documents/training/quokka-formatter/src/Grammar/Quokka/sample inputs/01. Simple parameter no spaces.txt",
  output: "output.txt",
};

const templateString = "@{set asd=1}";

const string = readFileSync(path.input, "utf-8");
const template = new Template(templateString);
console.log(template.formatterString);
