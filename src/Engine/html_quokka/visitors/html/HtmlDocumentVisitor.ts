import { TerminalNode } from 'antlr4ng';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';
import {
  HtmlDocumentContext,
  HtmlElementContext,
  ScriptletOrSeaWsContext,
} from '../../../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlElementVisitor } from './HtmlElementVisitor';

export class HtmlDocumentVisitor extends HtmlQuokkaVisitor<string> {
  visitHtmlDocument = (ctx: HtmlDocumentContext): string => {
    return ctx.children.map(child => child.accept(this)).join('\n');
  };

  visitHtmlElement = (ctx: HtmlElementContext): string => {
    return ctx.accept(new HtmlElementVisitor(this.indentLevel)) || '';
  };

  visitScriptletOrSeaWs: (ctx: ScriptletOrSeaWsContext) => string = ctx => {
    return ctx.getText();
  };

  visitTerminal = (node: TerminalNode): string => {
    return node.getText();
  };

  private indentLevel = 0;
}
