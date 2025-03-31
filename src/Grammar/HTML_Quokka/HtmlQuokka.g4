parser grammar HtmlQuokka;
options {
	tokenVocab = HtmlQuokkaLexer;
}

htmlDocument:
	scriptletOrSeaWs* XML? scriptletOrSeaWs* DTD? scriptletOrSeaWs* htmlElements*;

scriptletOrSeaWs: SCRIPTLET | SEA_WS;

htmlElements: htmlMisc* (htmlElement) htmlMisc*;

htmlElement:
	TAG_OPEN TAG_NAME (htmlAttribute* | outputBlock) (
		TAG_CLOSE (
			htmlContent TAG_OPEN TAG_SLASH TAG_NAME TAG_CLOSE
		)?
		| TAG_SLASH_CLOSE
	)
	| SCRIPTLET
	| script
	| style;

htmlContent:
	(
		(
			outputBlock
			| dynamicBlock
			| htmlElement
			| CDATA
			| htmlComment
			| htmlChardata
		)
	)*;

htmlAttribute: TAG_NAME (TAG_EQUALS ATTVALUE_VALUE)?;

htmlChardata: HTML_TEXT | SEA_WS;

htmlMisc: htmlComment | SEA_WS;

htmlComment: HTML_COMMENT | HTML_CONDITIONAL_COMMENT;

script: SCRIPT_OPEN (SCRIPT_BODY | SCRIPT_SHORT_BODY);

style: STYLE_OPEN (STYLE_BODY | STYLE_SHORT_BODY);

dynamicBlock:
	ifStatement
	| forStatement
	| assignmentBlock
	| commentBlock;

commentBlock: SingleInstructionComment;

// Conditional statement

ifStatement:
	ifCondition elseIfCondition* elseCondition? endIfInstruction;

ifCondition: ifInstruction htmlContent;

elseCondition: elseInstruction htmlContent;

elseIfCondition: elseIfInstruction htmlContent;

ifInstruction:
	ControlInstructionStart If booleanExpression InstructionEnd;

elseIfInstruction:
	ControlInstructionStart ElseIf booleanExpression InstructionEnd;

elseInstruction: ControlInstructionStart Else InstructionEnd;

endIfInstruction: ControlInstructionStart EndIf InstructionEnd;

// Loop statement	

forStatement: forInstruction htmlContent endForInstruction;

forInstruction:
	ControlInstructionStart For iterationVariable In variantValueExpression InstructionEnd;

iterationVariable: Identifier;

endForInstruction:
	ControlInstructionStart EndFor InstructionEnd;

// Assignment

assignmentBlock:
	ControlInstructionStart Set Identifier Equals expression InstructionEnd;

// Output instructions

outputBlock:
	OutputInstructionStart expression filterChain? InstructionEnd;

filterChain: ( Pipe functionCallExpression)+;

// Expressions

expression:
	variantValueExpression
	| stringExpression
	| booleanExpression
	| arithmeticExpression;

variantValueExpression:
	rootVariantValueExpression
	| memberValueExpression;

rootVariantValueExpression:
	variableValueExpression
	| functionCallExpression;

variableValueExpression: Identifier;

memberValueExpression:
	variableValueExpression (MemberAccessOperator member)+;

member: field | methodCall;

field: Identifier;

// Functions and methods

methodCall: Identifier argumentList;

functionCallExpression: (Identifier | If) argumentList;

argumentList:
	LeftParen (expression (CommaSeparator expression)*)? RightParen;

// String expressions

stringExpression: stringConstant | stringConcatenation;

stringConstant: DoubleQuotedString | SingleQuotedString;

stringConcatenation: stringAtom Ampersand expression;

stringAtom: variantValueExpression | stringConstant;

// Boolean expressions

booleanExpression: andExpression (Or andExpression)*;

andExpression: booleanAtom (And booleanAtom)*;

notExpression: Not booleanAtom;

parenthesizedBooleanExpression:
	LeftParen booleanExpression RightParen;

stringComparisonExpression:
	variantValueExpression (Equals | NotEquals) stringExpression;

nullComparisonExpression:
	variantValueExpression (Equals | NotEquals) Null;

arithmeticComparisonExpression:
	arithmeticExpression (
		Equals
		| NotEquals
		| LessThan
		| GreaterThan
		| LessThanOrEquals
		| GreaterThanOrEquals
	) arithmeticExpression;

booleanAtom:
	variantValueExpression
	| notExpression
	| parenthesizedBooleanExpression
	| stringComparisonExpression
	| nullComparisonExpression
	| arithmeticComparisonExpression;

// Arithmetic expressions

arithmeticExpression:
	multiplicationExpression (plusOperand | minusOperand)*;

plusOperand: Plus multiplicationExpression;

minusOperand: Minus multiplicationExpression;

multiplicationExpression:
	arithmeticAtom (multiplicationOperand | divisionOperand)*;

multiplicationOperand: Multiply arithmeticAtom;

divisionOperand: Divide arithmeticAtom;

negationExpression: Minus arithmeticAtom;

parenthesizedArithmeticExpression:
	LeftParen arithmeticExpression RightParen;

arithmeticAtom:
	Number
	| variantValueExpression
	| negationExpression
	| parenthesizedArithmeticExpression;