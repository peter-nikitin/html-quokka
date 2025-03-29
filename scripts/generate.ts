import { readdirSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const pathWithGrammar = "./src/Grammar";
const pathWithGenerated = "./src/generated";

const grammars = readdirSync(pathWithGrammar);

const createCommand = (grammarFolder: string, grammarFile: string) =>
  `antlr-ng -Dlanguage=TypeScript  -v -o ${join(
    pathWithGenerated,
    grammarFolder
  )}  --lib ./src/generated ${join(
    pathWithGrammar,
    grammarFolder,
    grammarFile
  )}`;

grammars.forEach((grammarFolder) =>
  readdirSync(join(pathWithGrammar, grammarFolder))
    .filter((file) => file.endsWith(".g4"))
    .sort((a) => (a.toLocaleLowerCase().includes("lex") ? -1 : 1))
    .forEach((file) => execSync(createCommand(grammarFolder, file)))
);
