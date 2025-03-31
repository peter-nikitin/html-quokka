import { HtmlContentContext, HtmlDocumentContext } from '../../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlQuokkaVisitor } from '../../../generated/HTML_Quokka/HtmlQuokkaVisitor';

export class BaseVisitor extends HtmlQuokkaVisitor<string | null> {
  visitHtmlContent = (ctx: HtmlContentContext) => {
    console.log(ctx.children);

    return ctx.getText();
  };

  visitHtmlDocument = (ctx: HtmlDocumentContext) => {
    console.log(ctx.children);
    return ctx.getText();
  };

  // visitOutputBlock = (ctx: OutputBlockContext): string | null => {
  //   return ctx.getText();
  // };
}
