import {
  HtmlAttributeContext,
  HtmlElementContext,
  HtmlMiscContext,
} from '../../../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';
import { printIndent } from '../../../../helpers/printIndent';
import { HtmlContentVisitor } from './HtmlContentVisitor';

export class HtmlElementVisitor extends HtmlQuokkaVisitor<string> {
  visitHtmlAttribute = (ctx: HtmlAttributeContext): string => {
    const name = ctx.TAG_NAME().getText();

    if (ctx.TAG_EQUALS() && ctx.ATTVALUE_VALUE()) {
      return `${name}=${ctx.ATTVALUE_VALUE()?.getText()}`;
    }

    return name;
  };

  visitHtmlElement = (ctx: HtmlElementContext): string => {
    if (ctx.SCRIPTLET() || ctx.script() || ctx.style()) {
      return [printIndent(this.indentLevel), ctx.getText()].join('');
    }

    if (ctx.TAG_SLASH_CLOSE()) {
      return [printIndent(this.indentLevel), this.createSelfclosingTag(ctx), '\n'].join('');
    }

    const openTag = this.createOpenTag(ctx);
    const closeTag = this.createCloseTag(ctx);

    if (!ctx.htmlContent()) {
      return [printIndent(this.indentLevel), openTag, closeTag, '\n'].join('');
    }

    const openPart = [printIndent(this.indentLevel), openTag];
    const contentPart = this.formatInnerContent(ctx);
    const closePart = [printIndent(this.indentLevel), closeTag];

    return openPart.concat(contentPart).concat(closePart).join('\n');
  };

  visitHtmlMisc = (ctx: HtmlMiscContext): string => {
    return ctx.getText();
  };

  private parseTag = (ctx: HtmlElementContext) => {
    const tagNames = ctx.TAG_NAME();

    if (!tagNames) {
      throw new Error('No tag name');
    }

    return tagNames.map(node => node.getText());
  };

  private createCloseTag = (ctx: HtmlElementContext) => {
    const [, closeTag] = this.parseTag(ctx);
    return `</${closeTag}>`;
  };

  private createOpenTagPart = (ctx: HtmlElementContext) => {
    const [openTag] = this.parseTag(ctx);

    const attributes = ctx
      .htmlAttribute()
      .map(attr => attr.accept(this))
      .join(' ');

    const tagParts = ['<', openTag];

    if (attributes) {
      tagParts.push(' ');
      tagParts.push(attributes);
    }

    return tagParts;
  };

  private createOpenTag = (ctx: HtmlElementContext) => {
    const tagParts = this.createOpenTagPart(ctx);

    tagParts.push('>');

    return tagParts.filter(Boolean).join('');
  };

  private createSelfclosingTag = (ctx: HtmlElementContext) => {
    const tagParts = this.createOpenTagPart(ctx);

    tagParts.push('/>');

    return tagParts.filter(Boolean).join('');
  };

  private indentLevel;

  private formatInnerContent = (ctx: HtmlElementContext): string => {
    return ctx.htmlContent()?.accept(new HtmlContentVisitor(this.indentLevel + 1)) || '';
  };

  constructor(indentLevel: number) {
    super();
    this.indentLevel = indentLevel;
  }
}
