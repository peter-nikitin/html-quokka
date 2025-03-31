import {
  ForStatementContext,
  ForInstructionContext,
  IterationVariableContext,
  EndForInstructionContext,
} from '../../../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';
import { printIndent } from '../../../../helpers/printIndent';
import { HtmlContentVisitor } from '../html/HtmlContentVisitor';
import { ExpressionVisitor } from './ExpressionVisitor';

export class ForBlockVisitor extends HtmlQuokkaVisitor<string | null> {
  indentLevel: number;

  constructor(indentLevel: number) {
    super();
    this.indentLevel = indentLevel;
  }

  visitForStatement = (ctx: ForStatementContext): string | null => {
    return [
      [printIndent(this.indentLevel), ctx.forInstruction().accept(this)].join(''),
      ctx.htmlContent()?.accept(new HtmlContentVisitor(this.indentLevel + 1)) || '',
      [printIndent(this.indentLevel), ctx.endForInstruction().accept(this)].join(''),
    ].join('\n');
  };

  visitForInstruction = (ctx: ForInstructionContext): string | null => {
    const expressionVisitor = new ExpressionVisitor();
    return ctx.children.map(child => child.accept(expressionVisitor)).join(' ');
  };

  visitIterationVariable = (ctx: IterationVariableContext): string | null => {
    return ctx.getText();
  };

  visitEndForInstruction = (ctx: EndForInstructionContext): string | null => {
    const expressionVisitor = new ExpressionVisitor();
    return ctx.children.map(child => child.accept(expressionVisitor)).join(' ');
  };
}
