
import { ForBlockVisitor } from "./ForBlockVisitor";
import { IfBlockVisitor } from "./IfBlockVisitor";

import {TemplateBlockVisitor} from "./TemplateBlockVisitor";
import {
  AssignmentBlockContext,
  CommentBlockContext,
  DynamicBlockContext, ForStatementContext,
  IfStatementContext
} from "../../../generated/Quokka/QuokkaParser";
import {QuokkaVisitor} from "../../../generated/Quokka/QuokkaVisitor";


export class DynamicBlockVisitor extends QuokkaVisitor<string | null> {
  templateBlockVisitor: TemplateBlockVisitor;

  constructor(templateBlockVisitor: TemplateBlockVisitor) {
    super();
    this.templateBlockVisitor = templateBlockVisitor;
  }

  visitDynamicBlock = (ctx: DynamicBlockContext): string | null => {
    return ctx.children.map((child) => child.accept(this)).join("");
  };

  visitCommentBlock = (ctx: CommentBlockContext): string | null => {
    return ctx.getText();
  };

  visitAssignmentBlock = (ctx: AssignmentBlockContext): string | null => {
    return ctx.children.map((c) => c.getText()).join(" ");
  };

  visitIfStatement = (ctx: IfStatementContext): string | null => {
    return ctx.accept(new IfBlockVisitor(this.templateBlockVisitor));
  };

  visitForStatement = (ctx: ForStatementContext): string | null => {
    return ctx.accept(new ForBlockVisitor(this.templateBlockVisitor));
  };
}
