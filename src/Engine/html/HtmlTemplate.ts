import { CharStream, CommonTokenStream } from 'antlr4ng';
import { HTMLLexer } from '../../generated/HTML/HTMLLexer';
import { HTMLParser } from '../../generated/HTML/HTMLParser';

import { HtmlFormattingVisitor } from './visitors/HtmlFormattingVisitor';

export class HtmlTemplate {
  formatterString: string | null;

  public constructor(templateText: string) {
    this.formatterString = this.parseAndFormat(templateText);
  }

  private parseAndFormat(templateText: string): string | null {
    const chars = CharStream.fromString(templateText);
    const lexer = new HTMLLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new HTMLParser(tokens);

    const rootContext = parser.htmlDocument();

    return rootContext.accept(new HtmlFormattingVisitor());
  }
}
