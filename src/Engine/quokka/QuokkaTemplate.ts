import { CharStream, CommonTokenStream } from 'antlr4ng';

import { TemplateVisitor } from './visitors/TemplateVisitor';
import { QuokkaLex } from '../../generated/Quokka/QuokkaLex';
import { QuokkaParser } from '../../generated/Quokka/QuokkaParser';

export class QuokkaTemplate {
  formatterString: string | null;

  public constructor(templateText: string) {
    this.formatterString = this.parseAndFormat(templateText);
  }

  private parseAndFormat(templateText: string): string | null {
    const chars = CharStream.fromString(templateText);
    const lexer = new QuokkaLex(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new QuokkaParser(tokens);

    const rootContext = parser.template();

    return rootContext.accept(new TemplateVisitor());
  }
}
