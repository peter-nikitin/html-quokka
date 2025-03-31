import { CharStream, CommonTokenStream } from 'antlr4ng';
import { HtmlQuokka } from '../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlQuokkaLexer } from '../../generated/HTML_Quokka/HtmlQuokkaLexer';
import { HtmlDocumentVisitor } from './visitors/html/HtmlDocumentVisitor';

export class HtmlQuokkaTemplate {
  formatterString: string | null;

  public constructor(templateText: string) {
    this.formatterString = this.parseAndFormat(templateText);
  }

  private parseAndFormat(templateText: string): string | null {
    const chars = CharStream.fromString(templateText);
    const lexer = new HtmlQuokkaLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new HtmlQuokka(tokens);

    const rootContext = parser.htmlDocument();

    return rootContext.accept(new HtmlDocumentVisitor());
  }
}
