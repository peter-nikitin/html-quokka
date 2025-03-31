import { OutputBlockContext } from '../../../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';
import { ExpressionVisitor } from './ExpressionVisitor';

export class OutputBlockVisitor extends HtmlQuokkaVisitor<string> {
  visitOutputBlock: (ctx: OutputBlockContext) => string = ctx => {
    return ctx.children.map(child => child.accept(new ExpressionVisitor())).join(' ') || '';
  };
}
