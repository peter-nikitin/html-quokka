import { TemplateBlockVisitor } from './TemplateBlockVisitor';
import { TemplateContext } from '../../../generated/Quokka/QuokkaParser';
import { QuokkaVisitor } from '../../../generated/Quokka/QuokkaVisitor';

export class TemplateVisitor extends QuokkaVisitor<string | null> {
  visitTemplate = (ctx: TemplateContext): string | null => {
    const templateBlock = ctx.templateBlock();

    if (!templateBlock) {
      return '';
    }

    const result = templateBlock.accept(new TemplateBlockVisitor());
    return result;
  };
}
