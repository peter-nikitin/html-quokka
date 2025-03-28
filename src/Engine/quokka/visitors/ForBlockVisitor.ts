import {TemplateBlockVisitor} from "./TemplateBlockVisitor";
import {QuokkaVisitor} from "../../../generated/Quokka/QuokkaVisitor";
import {
  EndForInstructionContext,
  ForInstructionContext,
  ForStatementContext,
  IterationVariableContext
} from "../../../generated/Quokka/QuokkaParser";
import {ExpressionVisitor} from "./ExpressionVisitor";

export class ForBlockVisitor extends QuokkaVisitor<string | null> {
  templateBlockVisitor: TemplateBlockVisitor;

  constructor(templateBlockVisitor: TemplateBlockVisitor) {
    super();
    this.templateBlockVisitor = templateBlockVisitor;
  }

  visitForStatement = (ctx: ForStatementContext): string | null => {
    return [
      ctx.forInstruction().accept(this),
      ctx.templateBlock()?.accept(this.templateBlockVisitor) || "",
      ctx.endForInstruction().accept(this),
    ].join("\n");
  };

  visitForInstruction = (ctx: ForInstructionContext): string | null => {
    const expressionVisitor = new ExpressionVisitor();
    return ctx.children
      .map((child) => child.accept(expressionVisitor))
      .join(" ");
  };

  visitIterationVariable = (ctx: IterationVariableContext): string | null => {
    return ctx.getText();
  };

  visitEndForInstruction = (ctx: EndForInstructionContext): string | null => {
    const expressionVisitor = new ExpressionVisitor();
    return ctx.children
      .map((child) => child.accept(expressionVisitor))
      .join(" ");
  };
}
