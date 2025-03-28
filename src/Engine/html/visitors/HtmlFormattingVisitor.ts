// src/Engine/html/visitors/HtmlFormattingVisitor.ts
import {
  HtmlChardataContext, HtmlContentContext,
  HtmlDocumentContext, HtmlElementContext,
  HtmlMiscContext, HtmlAttributeContext
} from "../../../generated/HTML/HTMLParser";
import {HTMLParserVisitor} from "../../../generated/HTML/HTMLParserVisitor";
import {TerminalNode} from "antlr4ng";


export class HtmlFormattingVisitor extends HTMLParserVisitor<string> {
  private indentLevel = 0;

  private indent() {
    return ' '.repeat(this.indentLevel * 2);
  }


  visitHtmlDocument = (ctx: HtmlDocumentContext): string => {
    // Начинаем с пустой строки и обрабатываем все дочерние элементы
    return ctx.children
      .map(child => child.accept(this))
      .join('');
  }

  visitHtmlElement = (ctx: HtmlElementContext): string => {
    if (ctx.SCRIPTLET() || ctx.script() || ctx.style()) {
      return [this.indent(), ctx.getText()].join("");
    }

    if (ctx.TAG_SLASH_CLOSE()) {
      return [this.indent(), this.createSelfclosingTag(ctx), '\n'].join('');
    }

    const openTag = this.createOpenTag(ctx);
    const closeTag = this.createCloseTag(ctx);

    if (!ctx.htmlContent()) {
      return [this.indent(), openTag, closeTag, "\n"].join('');
    }

    const openPart = [this.indent(), openTag, '\n'];
    const contentPart = this.formatInnerContent(ctx);
    const closePart = [this.indent(), closeTag, '\n'];

    return openPart.concat(contentPart).concat(closePart).join('');
  }

  private formatInnerContent = (ctx: HtmlElementContext): string[] => {
    this.indentLevel++;
    const innerContent = ctx.htmlContent()?.accept(this);
    this.indentLevel--;

    return [innerContent].filter(Boolean) as string[]
  }

  private parseTag = (ctx: HtmlElementContext) => {
    const tagNames = ctx.TAG_NAME();

    if (!tagNames) {
      throw new Error('No tag name')
    }

    return tagNames.map((node) => node.accept(this))
  }

  private createOpenTagPart = (ctx: HtmlElementContext) => {
    const [openTag,] = this.parseTag(ctx);

    const attributes = ctx.htmlAttribute()
      .map(attr => attr.accept(this))
      .join(' ');

    const tagParts = ['<', openTag]

    if (attributes) {
      tagParts.push(' ');
      tagParts.push(attributes)
    }

    return tagParts
  }

  private createOpenTag = (ctx: HtmlElementContext) => {
    const tagParts = this.createOpenTagPart(ctx);

    tagParts.push('>')

    return tagParts.filter(Boolean).join('');

  }

  private createSelfclosingTag = (ctx: HtmlElementContext) => {
    const tagParts = this.createOpenTagPart(ctx);

    tagParts.push('/>')

    return tagParts.filter(Boolean).join('');
  }

  private createCloseTag = (ctx: HtmlElementContext) => {
    const [, closeTag] = this.parseTag(ctx);
    return `</${closeTag}>`
  }


  visitHtmlContent = (ctx: HtmlContentContext): string => {
    let result = '';

    ctx.children.forEach((child) => {
      if (child instanceof HtmlElementContext) {
        result += child.accept(this);

        return;
      }

      if (child instanceof HtmlChardataContext) {
        const text = child?.accept(this)?.trim();

        if (text) {
          result += `${this.indent()}${text}\n`;
        }

        return
      }
      result += `${this.indent()}${child.accept(this)}\n`;
    })

    return result;
  }

  visitHtmlAttribute = (ctx: HtmlAttributeContext): string => {
    const name = ctx.TAG_NAME().getText();

    if (ctx.TAG_EQUALS() && ctx.ATTVALUE_VALUE()) {
      return `${name}=${ctx.ATTVALUE_VALUE()?.getText()}`;
    }

    return name;
  }

  visitHtmlChardata = (ctx: HtmlChardataContext): string => {
    return ctx.getText();
  }

  visitHtmlMisc = (ctx: HtmlMiscContext): string => {
    return ctx.getText();
  }

  visitTerminal = (node: TerminalNode): string => {
    return node.getText();
  }
}