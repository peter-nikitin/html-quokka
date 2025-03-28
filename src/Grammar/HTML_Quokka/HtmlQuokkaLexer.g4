lexer grammar HtmlQuokkaLexer;

HTML_COMMENT: '<!--' .*? '-->';

HTML_CONDITIONAL_COMMENT: '<![' .*? ']>';

XML: '<?xml' .*? '>';

CDATA: '<![CDATA[' .*? ']]>';

DTD: '<!' .*? '>';

SCRIPTLET: '<?' .*? '?>' | '<%' .*? '%>';

SEA_WS: (' ' | '\t' | '\r'? '\n')+;

SCRIPT_OPEN: '<script' .*? '>' -> pushMode(SCRIPT);

STYLE_OPEN: '<style' .*? '>' -> pushMode(STYLE);

OutputInstructionStart: '${' -> pushMode(Instruction);

ControlInstructionStart: '@{' -> pushMode(Instruction);

TAG_OPEN: '<' -> pushMode(TAG);

HTML_TEXT:
	[$@] ~'{' ~[$@]*? '}'
	| [$@] '{' '{' ~[$@]*? '}'
	| [$@]
	| ~[<$@]+;

// tag declarations

mode TAG;

TAG_CLOSE: '>' -> popMode;

TAG_SLASH_CLOSE: '/>' -> popMode;

TAG_SLASH: '/';

// lexing mode for attribute values

TAG_EQUALS: '=' -> pushMode(ATTVALUE);

TAG_NAME: TAG_NameStartChar TAG_NameChar*;

TAG_WHITESPACE: [ \t\r\n] -> channel(HIDDEN);

fragment HEXDIGIT: [a-fA-F0-9];

fragment DIGIT: [0-9];

fragment TAG_NameChar:
	TAG_NameStartChar
	| '-'
	| '_'
	| '.'
	| DIGIT
	| '\u00B7'
	| '\u0300' ..'\u036F'
	| '\u203F' ..'\u2040';

fragment TAG_NameStartChar:
	[:a-zA-Z]
	| '\u2070' ..'\u218F'
	| '\u2C00' ..'\u2FEF'
	| '\u3001' ..'\uD7FF'
	| '\uF900' ..'\uFDCF'
	| '\uFDF0' ..'\uFFFD';

// <scripts>

mode SCRIPT;

SCRIPT_BODY: .*? '</script>' -> popMode;

SCRIPT_SHORT_BODY: .*? '</>' -> popMode;

// <styles>

mode STYLE;

STYLE_BODY: .*? '</style>' -> popMode;

STYLE_SHORT_BODY: .*? '</>' -> popMode;

// attribute values

mode ATTVALUE;

// an attribute value may have spaces b/t the '=' and the value
ATTVALUE_VALUE: ' '* ATTRIBUTE -> popMode;

ATTRIBUTE:
	DOUBLE_QUOTE_STRING
	| SINGLE_QUOTE_STRING
	| ATTCHARS
	| HEXCHARS
	| DECCHARS;

fragment ATTCHARS: ATTCHAR+ ' '?;

fragment ATTCHAR:
	'-'
	| '_'
	| '.'
	| '/'
	| '+'
	| ','
	| '?'
	| '='
	| ':'
	| ';'
	| '#'
	| [0-9a-zA-Z];

fragment HEXCHARS: '#' [0-9a-fA-F]+;

fragment DECCHARS: [0-9]+ '%'?;

fragment DOUBLE_QUOTE_STRING: '"' ~[<"]* '"';

fragment SINGLE_QUOTE_STRING: '\'' ~[<']* '\'';

SingleInstructionComment: '@{*' ~'}'* '*}';

mode Instruction;

InstructionEnd: '}' -> popMode;



If: [Ii][Ff];

EndIf: End WhiteSpace+ If;

End: [Ee][Nn][Dd];

Else: [Ee][Ll][Ss][Ee];

ElseIf: Else WhiteSpace+ If;

For: [Ff][Oo][Rr];

In: [Ii][Nn];

EndFor: End WhiteSpace+ For;

Null: [Nn][Uu][Ll][Ll];

MemberAccessOperator: '.';

Pipe: '|';

CommaSeparator: ',';

LeftParen: '(';

RightParen: ')';

And: [Aa][Nn][Dd];

Or: [Oo][Rr];

Not: [Nn][Oo][Tt];

Set: [Ss][Ee][Tt];

Equals: '=';

NotEquals: '!=';

GreaterThan: '>';

LessThan: '<';

GreaterThanOrEquals: '>=';

LessThanOrEquals: '<=';

Plus: '+';

Minus: '-';

Multiply: '*';

Divide: '/';

Number: Digit+ ('.' Digit+)?;

Digit: ('0' ..'9');

DoubleQuotedString: '"' ~'"'* '"';

SingleQuotedString: '\'' ~'\''* '\'';

Ampersand: '&';

Identifier: [_a-zA-Z] [_a-zA-Z0-9]*;

WhiteSpace: [ \t\r\n] -> channel(HIDDEN);