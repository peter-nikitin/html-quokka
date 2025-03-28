
import { DynamicBlockVisitor } from "./DynamicBlockVisitor";
import {StaticBlockVisitor} from "./StaticBlockVisitor";
import {DynamicBlockContext, StaticBlockContext, TemplateBlockContext} from "../../../generated/Quokka/QuokkaParser";
import {QuokkaVisitor} from "../../../generated/Quokka/QuokkaVisitor";


export class TemplateBlockVisitor extends QuokkaVisitor<string> {
  defaultResult(): string {
    throw new Error("not supported");
  }

  visitTemplateBlock = (ctx: TemplateBlockContext): string => {
    return ctx.children.map((child) => child.accept(this)).join("");
  };

  visitStaticBlock = (ctx: StaticBlockContext): string => {
    return ctx.accept(new StaticBlockVisitor())!;
  };

  visitDynamicBlock = (ctx: DynamicBlockContext): string => {
    return ctx.accept(new DynamicBlockVisitor(this))!;
  };
}
