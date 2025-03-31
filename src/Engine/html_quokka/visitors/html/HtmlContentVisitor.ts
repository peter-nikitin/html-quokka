import {
  HtmlContentContext,
  HtmlChardataContext,
  OutputBlockContext,
  HtmlElementContext,
  DynamicBlockContext,
} from '../../../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';
import { printIndent } from '../../../../helpers/printIndent';
import { DynamicBlockVisitor } from '../quokka/DynamicBlockVisitor';
import { OutputBlockVisitor } from '../quokka/OutputBlockVisitor';

import { HtmlElementVisitor } from './HtmlElementVisitor';

export class HtmlContentVisitor extends HtmlQuokkaVisitor<string> {
  private indentLevel: number;

  constructor(indentLevel: number) {
    super();
    this.indentLevel = indentLevel;
  }

  visitHtmlChardata = (ctx: HtmlChardataContext): string => {
    const text = ctx.getText().trim();

    if (text) {
      return [printIndent(this.indentLevel), text, '\n'].join('');
    }

    return '';
  };

  visitHtmlContent = (ctx: HtmlContentContext): string => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitOutputBlock: (ctx: OutputBlockContext) => string = ctx => {
    const outputBlockContent = ctx.accept(new OutputBlockVisitor()) || '';
    return [printIndent(this.indentLevel), outputBlockContent].join('');
  };

  visitHtmlElement: (ctx: HtmlElementContext) => string = ctx => {
    return ctx.accept(new HtmlElementVisitor(this.indentLevel + 1)) || '';
  };

  visitDynamicBlock?: (ctx: DynamicBlockContext) => string = (ctx: DynamicBlockContext) => {
    return ctx.accept(new DynamicBlockVisitor(this.indentLevel + 1)) || '';
  };
}
