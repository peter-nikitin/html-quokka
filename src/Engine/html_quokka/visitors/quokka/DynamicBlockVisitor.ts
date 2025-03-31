import { ForBlockVisitor } from './ForBlockVisitor';
import { IfBlockVisitor } from './IfBlockVisitor';

import {
  DynamicBlockContext,
  CommentBlockContext,
  AssignmentBlockContext,
  IfStatementContext,
  ForStatementContext,
} from '../../../../generated/HTML_Quokka/HtmlQuokka';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';

export class DynamicBlockVisitor extends HtmlQuokkaVisitor<string | null> {
  private indentLevel: number;

  constructor(indentLevel: number) {
    super();
    this.indentLevel = indentLevel;
  }

  visitDynamicBlock = (ctx: DynamicBlockContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitCommentBlock = (ctx: CommentBlockContext): string | null => {
    return ctx.getText();
  };

  visitAssignmentBlock = (ctx: AssignmentBlockContext): string | null => {
    return ctx.children.map(c => c.getText()).join(' ');
  };

  visitIfStatement = (ctx: IfStatementContext): string | null => {
    return ctx.accept(new IfBlockVisitor(this.indentLevel + 1));
  };

  visitForStatement = (ctx: ForStatementContext): string | null => {
    return ctx.accept(new ForBlockVisitor(this.indentLevel + 1));
  };
}
