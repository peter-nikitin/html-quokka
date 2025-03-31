import { QuokkaVisitor } from '../../../generated/Quokka/QuokkaVisitor';
import {
  ConstantBlockContext,
  OutputBlockContext,
  StaticBlockContext,
} from '../../../generated/Quokka/QuokkaParser';
import { PrintExpressionVisitor } from './PrintExpressionVisitor';

export class StaticBlockVisitor extends QuokkaVisitor<string | null> {
  visitStaticBlock = (ctx: StaticBlockContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitConstantBlock = (ctx: ConstantBlockContext): string | null => {
    return ctx.getText();
  };

  visitOutputBlock = (ctx: OutputBlockContext): string | null => {
    return ctx.children.map(child => child.accept(new PrintExpressionVisitor())).join(' ');
  };
}
