import { HtmlContentVisitor } from '../html/HtmlContentVisitor';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';
import {
  IfStatementContext,
  IfConditionContext,
  ElseConditionContext,
  ElseIfConditionContext,
  EndIfInstructionContext,
} from '../../../../generated/HTML_Quokka/HtmlQuokka';
import { ExpressionVisitor } from './ExpressionVisitor';

export class IfBlockVisitor extends HtmlQuokkaVisitor<string> {
  indentLevel: number;

  constructor(indentLevel: number) {
    super();
    this.indentLevel = indentLevel;
  }

  visitIfStatement = (ctx: IfStatementContext): string => {
    return ctx.children.map(child => child.accept(this)).join('\n');
  };

  visitIfCondition = (ctx: IfConditionContext): string => {
    const instruction = ctx
      .ifInstruction()
      .children.map(child => child.accept(new ExpressionVisitor()))
      .join(' ');
    const template = ctx.htmlContent()?.accept(new HtmlContentVisitor(this.indentLevel + 1));

    return [instruction, template].join('\n');
  };

  visitElseCondition = (ctx: ElseConditionContext): string => {
    return [
      ctx.elseInstruction().accept(new ExpressionVisitor()),
      ctx.htmlContent()?.accept(new HtmlContentVisitor(this.indentLevel + 1)),
    ].join('\n');
  };

  visitElseIfCondition = (ctx: ElseIfConditionContext): string => {
    return [
      ctx.elseIfInstruction().accept(new ExpressionVisitor()),
      ctx.htmlContent()?.accept(new HtmlContentVisitor(this.indentLevel + 1)),
    ].join('\n');
  };

  visitEndIfInstruction = (ctx: EndIfInstructionContext): string => {
    return ctx.children.map(child => child.accept(new ExpressionVisitor())).join(' ');
  };
}
