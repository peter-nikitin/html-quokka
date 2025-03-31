import { QuokkaVisitor } from '../../../generated/Quokka/QuokkaVisitor';
import { TemplateBlockVisitor } from './TemplateBlockVisitor';
import {
  ElseConditionContext,
  ElseIfConditionContext,
  EndIfInstructionContext,
  IfConditionContext,
  IfStatementContext,
} from '../../../generated/Quokka/QuokkaParser';
import { PrintExpressionVisitor } from './PrintExpressionVisitor';
import { ExpressionVisitor } from './ExpressionVisitor';

export class IfBlockVisitor extends QuokkaVisitor<string | null> {
  templateBlockVisitor: TemplateBlockVisitor;

  constructor(templateBlockVisitor: TemplateBlockVisitor) {
    super();
    this.templateBlockVisitor = templateBlockVisitor;
  }

  visitIfStatement = (ctx: IfStatementContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('\n');
  };

  visitIfCondition = (ctx: IfConditionContext): string | null => {
    const instruction = ctx
      .ifInstruction()
      .children.map(child => child.accept(new PrintExpressionVisitor()))
      .join(' ');
    const template = ctx.templateBlock()?.accept(this.templateBlockVisitor);

    return [instruction, template].join('\n');
  };

  visitElseCondition = (ctx: ElseConditionContext): string | null => {
    return [
      ctx.elseInstruction().accept(new ExpressionVisitor()),
      ctx.templateBlock()?.accept(this.templateBlockVisitor),
    ].join('\n');
  };

  visitElseIfCondition = (ctx: ElseIfConditionContext): string | null => {
    return [
      ctx.elseIfInstruction().accept(new ExpressionVisitor()),
      ctx.templateBlock()?.accept(this.templateBlockVisitor),
    ].join('\n');
  };

  visitEndIfInstruction = (ctx: EndIfInstructionContext): string | null => {
    return ctx.children.map(child => child.accept(new ExpressionVisitor())).join(' ');
  };
}
