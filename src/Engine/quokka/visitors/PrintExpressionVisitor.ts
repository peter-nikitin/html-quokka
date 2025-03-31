import { QuokkaVisitor } from '../../../generated/Quokka/QuokkaVisitor';
import {
  BooleanExpressionContext,
  ExpressionContext,
} from '../../../generated/Quokka/QuokkaParser';
import { TerminalNode } from 'antlr4ng';

export class PrintExpressionVisitor extends QuokkaVisitor<string | null> {
  visitExpression = (ctx: ExpressionContext): string | null => {
    // console.log(ctx);

    return ctx.getText();
  };

  visitTerminal(ctx: TerminalNode): string | null {
    const text = ctx.getText();
    return text;
  }

  visitBooleanExpression = (ctx: BooleanExpressionContext): string | null => {
    const text = ctx.getText();
    return text;
  };
}
