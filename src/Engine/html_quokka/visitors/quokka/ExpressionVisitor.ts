import { TerminalNode } from 'antlr4ng';
import { HtmlQuokkaVisitor } from '../../../../generated/HTML_Quokka/HtmlQuokkaVisitor';
import {
  AndExpressionContext,
  ArgumentListContext,
  ArithmeticAtomContext,
  ArithmeticComparisonExpressionContext,
  ArithmeticExpressionContext,
  BooleanAtomContext,
  BooleanExpressionContext,
  DivisionOperandContext,
  ExpressionContext,
  FieldContext,
  FilterChainContext,
  FunctionCallExpressionContext,
  MemberContext,
  MemberValueExpressionContext,
  MethodCallContext,
  MinusOperandContext,
  MultiplicationExpressionContext,
  MultiplicationOperandContext,
  NegationExpressionContext,
  NotExpressionContext,
  NullComparisonExpressionContext,
  ParenthesizedArithmeticExpressionContext,
  ParenthesizedBooleanExpressionContext,
  PlusOperandContext,
  RootVariantValueExpressionContext,
  StringAtomContext,
  StringComparisonExpressionContext,
  StringConcatenationContext,
  StringConstantContext,
  StringExpressionContext,
  VariableValueExpressionContext,
  VariantValueExpressionContext,
} from '../../../../generated/HTML_Quokka/HtmlQuokka';

export class ExpressionVisitor extends HtmlQuokkaVisitor<string | null> {
  visitFilterChain = (ctx: FilterChainContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitTerminal(ctx: TerminalNode): string | null {
    return ctx.getText();
  }

  visitExpression = (ctx: ExpressionContext): string | null => {
    return ctx.getText();
  };

  visitVariantValueExpression = (ctx: VariantValueExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitRootVariantValueExpression = (ctx: RootVariantValueExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitVariableValueExpression = (ctx: VariableValueExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitMemberValueExpression = (ctx: MemberValueExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitMember = (ctx: MemberContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitField = (ctx: FieldContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitMethodCall = (ctx: MethodCallContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitFunctionCallExpression = (ctx: FunctionCallExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitArgumentList = (ctx: ArgumentListContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitStringExpression = (ctx: StringExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitStringConstant = (ctx: StringConstantContext): string | null => {
    return ctx.getText();
  };

  visitStringConcatenation = (ctx: StringConcatenationContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitStringAtom = (ctx: StringAtomContext): string | null => {
    return ctx.getText();
  };

  visitBooleanExpression = (ctx: BooleanExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitAndExpression = (ctx: AndExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitNotExpression = (ctx: NotExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitParenthesizedBooleanExpression = (
    ctx: ParenthesizedBooleanExpressionContext
  ): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitStringComparisonExpression = (ctx: StringComparisonExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitNullComparisonExpression = (ctx: NullComparisonExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitArithmeticComparisonExpression = (
    ctx: ArithmeticComparisonExpressionContext
  ): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitBooleanAtom = (ctx: BooleanAtomContext): string | null => {
    return ctx.getText();
  };

  visitArithmeticExpression = (ctx: ArithmeticExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitPlusOperand = (ctx: PlusOperandContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitMinusOperand = (ctx: MinusOperandContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitMultiplicationExpression = (ctx: MultiplicationExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitMultiplicationOperand = (ctx: MultiplicationOperandContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitDivisionOperand = (ctx: DivisionOperandContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitNegationExpression = (ctx: NegationExpressionContext): string | null => {
    return ctx.children.map(child => child.accept(this)).join('');
  };

  visitParenthesizedArithmeticExpression = (
    ctx: ParenthesizedArithmeticExpressionContext
  ): string | null => {
    return ctx.children.map(child => child.accept(this)).join(' ');
  };

  visitArithmeticAtom = (ctx: ArithmeticAtomContext): string | null => {
    return ctx.getText();
  };
}
