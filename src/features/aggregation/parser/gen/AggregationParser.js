/*******************************************************************************
 * #  MIT License
 * #
 * #  Copyright (c) 2020 OdinLabs IO
 * #
 * #  Permission is hereby granted, free of charge, to any person obtaining a copy
 * #  of this software and associated documentation files (the "Software"), to deal
 * #  in the Software without restriction, including without limitation the rights
 * #  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * #  copies of the Software, and to permit persons to whom the Software is
 * #  furnished to do so, subject to the following conditions:
 * #
 * #  The above copyright notice and this permission notice shall be included in all
 * #  copies or substantial portions of the Software.
 * #
 * #  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * #  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * #  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * #  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * #  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * #  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * #  SOFTWARE.
 ******************************************************************************/

// Generated from Aggregation.g4 by ANTLR 4.9
// jshint ignore: start
import antlr4 from 'antlr4';
import AggregationListener from './AggregationListener.js';
import AggregationVisitor from './AggregationVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0016\u00af\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0007\u0003$\n\u0003\f\u0003\u000e\u0003\'\u000b\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0007\u00030\n\u0003\f\u0003\u000e\u00033\u000b\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003?\n\u0003\f\u0003\u000e",
    "\u0003B\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0007\u0003P\n\u0003\f\u0003\u000e\u0003S\u000b",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003X\n\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0007\u0003]\n\u0003\f\u0003\u000e\u0003",
    "`\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0005\u0004h\n\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0007\u0004m\n\u0004\f\u0004\u000e\u0004p\u000b\u0004\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0005\u0006\u0080\n\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0007\u0006\u0085\n\u0006\f\u0006\u000e\u0006\u0088\u000b\u0006",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0005\u0007\u0098\n\u0007\u0003\b\u0003\b\u0005",
    "\b\u009c\n\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0007\n",
    "\u00a4\n\n\f\n\u000e\n\u00a7\u000b\n\u0003\n\u0003\n\u0003\u000b\u0003",
    "\u000b\u0005\u000b\u00ad\n\u000b\u0003\u000b\u0002\u0005\u0004\u0006",
    "\n\f\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0002\u0003\u0003",
    "\u0002\u0003\u0004\u0002\u00b7\u0002\u0016\u0003\u0002\u0002\u0002\u0004",
    "W\u0003\u0002\u0002\u0002\u0006g\u0003\u0002\u0002\u0002\bq\u0003\u0002",
    "\u0002\u0002\n\u007f\u0003\u0002\u0002\u0002\f\u0097\u0003\u0002\u0002",
    "\u0002\u000e\u009b\u0003\u0002\u0002\u0002\u0010\u009d\u0003\u0002\u0002",
    "\u0002\u0012\u009f\u0003\u0002\u0002\u0002\u0014\u00ac\u0003\u0002\u0002",
    "\u0002\u0016\u0017\u0005\u0004\u0003\u0002\u0017\u0018\u0007\u0002\u0002",
    "\u0003\u0018\u0003\u0003\u0002\u0002\u0002\u0019\u001a\b\u0003\u0001",
    "\u0002\u001a\u001b\u0007\u000f\u0002\u0002\u001b\u001c\u0005\u0004\u0003",
    "\u0002\u001c\u001d\u0007\u0010\u0002\u0002\u001dX\u0003\u0002\u0002",
    "\u0002\u001e\u001f\u0007\u0006\u0002\u0002\u001f \u0007\u000f\u0002",
    "\u0002 %\u0005\u0006\u0004\u0002!\"\u0007\u0013\u0002\u0002\"$\u0005",
    "\n\u0006\u0002#!\u0003\u0002\u0002\u0002$\'\u0003\u0002\u0002\u0002",
    "%#\u0003\u0002\u0002\u0002%&\u0003\u0002\u0002\u0002&(\u0003\u0002\u0002",
    "\u0002\'%\u0003\u0002\u0002\u0002()\u0007\u0010\u0002\u0002)X\u0003",
    "\u0002\u0002\u0002*+\u0007\t\u0002\u0002+,\u0007\u000f\u0002\u0002,",
    "1\u0005\u0010\t\u0002-.\u0007\u0013\u0002\u0002.0\u0005\n\u0006\u0002",
    "/-\u0003\u0002\u0002\u000203\u0003\u0002\u0002\u00021/\u0003\u0002\u0002",
    "\u000212\u0003\u0002\u0002\u000224\u0003\u0002\u0002\u000231\u0003\u0002",
    "\u0002\u000245\u0007\u0010\u0002\u00025X\u0003\u0002\u0002\u000267\u0007",
    "\u0007\u0002\u000278\u0007\u000f\u0002\u000289\u0007\u0005\u0002\u0002",
    "9:\u0007\u0014\u0002\u0002:;\u0007\u0013\u0002\u0002;@\u0005\u0006\u0004",
    "\u0002<=\u0007\u0013\u0002\u0002=?\u0005\n\u0006\u0002><\u0003\u0002",
    "\u0002\u0002?B\u0003\u0002\u0002\u0002@>\u0003\u0002\u0002\u0002@A\u0003",
    "\u0002\u0002\u0002AC\u0003\u0002\u0002\u0002B@\u0003\u0002\u0002\u0002",
    "CD\u0007\u0010\u0002\u0002DX\u0003\u0002\u0002\u0002EF\u0007\b\u0002",
    "\u0002FG\u0007\u000f\u0002\u0002GH\u0007\u0003\u0002\u0002HI\u0007\u0013",
    "\u0002\u0002IJ\u0007\u0005\u0002\u0002JK\u0007\u0014\u0002\u0002KL\u0007",
    "\u0013\u0002\u0002LQ\u0005\u0006\u0004\u0002MN\u0007\u0013\u0002\u0002",
    "NP\u0005\n\u0006\u0002OM\u0003\u0002\u0002\u0002PS\u0003\u0002\u0002",
    "\u0002QO\u0003\u0002\u0002\u0002QR\u0003\u0002\u0002\u0002RT\u0003\u0002",
    "\u0002\u0002SQ\u0003\u0002\u0002\u0002TU\u0007\u0010\u0002\u0002UX\u0003",
    "\u0002\u0002\u0002VX\u0005\u0006\u0004\u0002W\u0019\u0003\u0002\u0002",
    "\u0002W\u001e\u0003\u0002\u0002\u0002W*\u0003\u0002\u0002\u0002W6\u0003",
    "\u0002\u0002\u0002WE\u0003\u0002\u0002\u0002WV\u0003\u0002\u0002\u0002",
    "X^\u0003\u0002\u0002\u0002YZ\f\t\u0002\u0002Z[\u0007\u000e\u0002\u0002",
    "[]\u0005\u0004\u0003\n\\Y\u0003\u0002\u0002\u0002]`\u0003\u0002\u0002",
    "\u0002^\\\u0003\u0002\u0002\u0002^_\u0003\u0002\u0002\u0002_\u0005\u0003",
    "\u0002\u0002\u0002`^\u0003\u0002\u0002\u0002ab\b\u0004\u0001\u0002b",
    "c\u0007\u000f\u0002\u0002cd\u0005\u0006\u0004\u0002de\u0007\u0010\u0002",
    "\u0002eh\u0003\u0002\u0002\u0002fh\u0005\u000e\b\u0002ga\u0003\u0002",
    "\u0002\u0002gf\u0003\u0002\u0002\u0002hn\u0003\u0002\u0002\u0002ij\f",
    "\u0005\u0002\u0002jk\u0007\u000e\u0002\u0002km\u0005\u0006\u0004\u0006",
    "li\u0003\u0002\u0002\u0002mp\u0003\u0002\u0002\u0002nl\u0003\u0002\u0002",
    "\u0002no\u0003\u0002\u0002\u0002o\u0007\u0003\u0002\u0002\u0002pn\u0003",
    "\u0002\u0002\u0002qr\u0005\n\u0006\u0002rs\u0007\u0002\u0002\u0003s",
    "\t\u0003\u0002\u0002\u0002tu\b\u0006\u0001\u0002uv\u0007\u000f\u0002",
    "\u0002vw\u0005\n\u0006\u0002wx\u0007\u0010\u0002\u0002x\u0080\u0003",
    "\u0002\u0002\u0002yz\u0007\f\u0002\u0002z{\u0007\u000f\u0002\u0002{",
    "|\u0005\n\u0006\u0002|}\u0007\u0010\u0002\u0002}\u0080\u0003\u0002\u0002",
    "\u0002~\u0080\u0005\f\u0007\u0002\u007ft\u0003\u0002\u0002\u0002\u007f",
    "y\u0003\u0002\u0002\u0002\u007f~\u0003\u0002\u0002\u0002\u0080\u0086",
    "\u0003\u0002\u0002\u0002\u0081\u0082\f\u0006\u0002\u0002\u0082\u0083",
    "\u0007\r\u0002\u0002\u0083\u0085\u0005\n\u0006\u0007\u0084\u0081\u0003",
    "\u0002\u0002\u0002\u0085\u0088\u0003\u0002\u0002\u0002\u0086\u0084\u0003",
    "\u0002\u0002\u0002\u0086\u0087\u0003\u0002\u0002\u0002\u0087\u000b\u0003",
    "\u0002\u0002\u0002\u0088\u0086\u0003\u0002\u0002\u0002\u0089\u008a\u0007",
    "\n\u0002\u0002\u008a\u008b\u0007\u000f\u0002\u0002\u008b\u008c\u0005",
    "\u0010\t\u0002\u008c\u008d\u0007\u0013\u0002\u0002\u008d\u008e\u0005",
    "\u0014\u000b\u0002\u008e\u008f\u0007\u0010\u0002\u0002\u008f\u0098\u0003",
    "\u0002\u0002\u0002\u0090\u0091\u0007\u000b\u0002\u0002\u0091\u0092\u0007",
    "\u000f\u0002\u0002\u0092\u0093\u0005\u0010\t\u0002\u0093\u0094\u0007",
    "\u0013\u0002\u0002\u0094\u0095\u0005\u0012\n\u0002\u0095\u0096\u0007",
    "\u0010\u0002\u0002\u0096\u0098\u0003\u0002\u0002\u0002\u0097\u0089\u0003",
    "\u0002\u0002\u0002\u0097\u0090\u0003\u0002\u0002\u0002\u0098\r\u0003",
    "\u0002\u0002\u0002\u0099\u009c\t\u0002\u0002\u0002\u009a\u009c\u0007",
    "\u0014\u0002\u0002\u009b\u0099\u0003\u0002\u0002\u0002\u009b\u009a\u0003",
    "\u0002\u0002\u0002\u009c\u000f\u0003\u0002\u0002\u0002\u009d\u009e\u0007",
    "\u0014\u0002\u0002\u009e\u0011\u0003\u0002\u0002\u0002\u009f\u00a0\u0007",
    "\u0011\u0002\u0002\u00a0\u00a5\u0005\u0014\u000b\u0002\u00a1\u00a2\u0007",
    "\u0013\u0002\u0002\u00a2\u00a4\u0005\u0014\u000b\u0002\u00a3\u00a1\u0003",
    "\u0002\u0002\u0002\u00a4\u00a7\u0003\u0002\u0002\u0002\u00a5\u00a3\u0003",
    "\u0002\u0002\u0002\u00a5\u00a6\u0003\u0002\u0002\u0002\u00a6\u00a8\u0003",
    "\u0002\u0002\u0002\u00a7\u00a5\u0003\u0002\u0002\u0002\u00a8\u00a9\u0007",
    "\u0012\u0002\u0002\u00a9\u0013\u0003\u0002\u0002\u0002\u00aa\u00ad\t",
    "\u0002\u0002\u0002\u00ab\u00ad\u0007\u0015\u0002\u0002\u00ac\u00aa\u0003",
    "\u0002\u0002\u0002\u00ac\u00ab\u0003\u0002\u0002\u0002\u00ad\u0015\u0003",
    "\u0002\u0002\u0002\u0010%1@QW^gn\u007f\u0086\u0097\u009b\u00a5\u00ac"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class AggregationParser extends antlr4.Parser {

    static grammarFileName = "Aggregation.g4";
    static literalNames = [ null, null, null, null, null, null, null, null, 
                            null, "'IN'", "'NOT'", null, null, "'('", "')'", 
                            "'['", "']'", "','" ];
    static symbolicNames = [ null, "NUMBER", "FLOAT", "SORT", "AGGR", "CUMAGGR", 
                             "ROLAGGR", "COUNT", "ORDEROPERATOR", "IN", 
                             "NOT", "SETOPERATOR", "ARITHMOPERATOR", "LPAREN", 
                             "RPAREN", "LBRACK", "RBRACK", "COMMA", "ID_LITERAL", 
                             "STR_LITERAL", "WS" ];
    static ruleNames = [ "aggregationStatement", "aggregation", "expression", 
                         "conditionStatement", "condition", "selector", 
                         "measure", "category", "literals", "literal" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = AggregationParser.ruleNames;
        this.literalNames = AggregationParser.literalNames;
        this.symbolicNames = AggregationParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.aggregation_sempred(localctx, predIndex);
    	case 2:
    	    		return this.expression_sempred(localctx, predIndex);
    	case 4:
    	    		return this.condition_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    aggregation_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 7);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 1:
    			return this.precpred(this._ctx, 3);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    condition_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 2:
    			return this.precpred(this._ctx, 4);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	aggregationStatement() {
	    let localctx = new AggregationStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, AggregationParser.RULE_aggregationStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 20;
	        this.aggregation(0);
	        this.state = 21;
	        this.match(AggregationParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	aggregation(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new AggregationContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, AggregationParser.RULE_aggregation, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 85;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new AggregationGroupContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 24;
	            this.match(AggregationParser.LPAREN);
	            this.state = 25;
	            this.aggregation(0);
	            this.state = 26;
	            this.match(AggregationParser.RPAREN);
	            break;

	        case 2:
	            localctx = new ReductionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 28;
	            this.match(AggregationParser.AGGR);
	            this.state = 29;
	            this.match(AggregationParser.LPAREN);
	            this.state = 30;
	            this.expression(0);
	            this.state = 35;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===AggregationParser.COMMA) {
	                this.state = 31;
	                this.match(AggregationParser.COMMA);
	                this.state = 32;
	                this.condition(0);
	                this.state = 37;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 38;
	            this.match(AggregationParser.RPAREN);
	            break;

	        case 3:
	            localctx = new CountContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 40;
	            this.match(AggregationParser.COUNT);
	            this.state = 41;
	            this.match(AggregationParser.LPAREN);
	            this.state = 42;
	            this.category();
	            this.state = 47;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===AggregationParser.COMMA) {
	                this.state = 43;
	                this.match(AggregationParser.COMMA);
	                this.state = 44;
	                this.condition(0);
	                this.state = 49;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 50;
	            this.match(AggregationParser.RPAREN);
	            break;

	        case 4:
	            localctx = new CumReductionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 52;
	            this.match(AggregationParser.CUMAGGR);
	            this.state = 53;
	            this.match(AggregationParser.LPAREN);
	            this.state = 54;
	            this.match(AggregationParser.SORT);
	            this.state = 55;
	            this.match(AggregationParser.ID_LITERAL);
	            this.state = 56;
	            this.match(AggregationParser.COMMA);
	            this.state = 57;
	            this.expression(0);
	            this.state = 62;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===AggregationParser.COMMA) {
	                this.state = 58;
	                this.match(AggregationParser.COMMA);
	                this.state = 59;
	                this.condition(0);
	                this.state = 64;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 65;
	            this.match(AggregationParser.RPAREN);
	            break;

	        case 5:
	            localctx = new RolReductionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 67;
	            this.match(AggregationParser.ROLAGGR);
	            this.state = 68;
	            this.match(AggregationParser.LPAREN);
	            this.state = 69;
	            this.match(AggregationParser.NUMBER);
	            this.state = 70;
	            this.match(AggregationParser.COMMA);
	            this.state = 71;
	            this.match(AggregationParser.SORT);
	            this.state = 72;
	            this.match(AggregationParser.ID_LITERAL);
	            this.state = 73;
	            this.match(AggregationParser.COMMA);
	            this.state = 74;
	            this.expression(0);
	            this.state = 79;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===AggregationParser.COMMA) {
	                this.state = 75;
	                this.match(AggregationParser.COMMA);
	                this.state = 76;
	                this.condition(0);
	                this.state = 81;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 82;
	            this.match(AggregationParser.RPAREN);
	            break;

	        case 6:
	            localctx = new IdentityAggregationContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 84;
	            this.expression(0);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 92;
	        this._errHandler.sync(this);
	        let _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new AggregationBinOpContext(this, new AggregationContext(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, AggregationParser.RULE_aggregation);
	                this.state = 87;
	                if (!( this.precpred(this._ctx, 7))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                }
	                this.state = 88;
	                this.match(AggregationParser.ARITHMOPERATOR);
	                this.state = 89;
	                this.aggregation(8); 
	            }
	            this.state = 94;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 4;
	    this.enterRecursionRule(localctx, 4, AggregationParser.RULE_expression, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 101;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case AggregationParser.LPAREN:
	            localctx = new ExpressionGroupContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 96;
	            this.match(AggregationParser.LPAREN);
	            this.state = 97;
	            this.expression(0);
	            this.state = 98;
	            this.match(AggregationParser.RPAREN);
	            break;
	        case AggregationParser.NUMBER:
	        case AggregationParser.FLOAT:
	        case AggregationParser.ID_LITERAL:
	            localctx = new IdentityExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 100;
	            this.measure();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 108;
	        this._errHandler.sync(this);
	        let _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new ExpressionBinOpContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, AggregationParser.RULE_expression);
	                this.state = 103;
	                if (!( this.precpred(this._ctx, 3))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                }
	                this.state = 104;
	                this.match(AggregationParser.ARITHMOPERATOR);
	                this.state = 105;
	                this.expression(4); 
	            }
	            this.state = 110;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	conditionStatement() {
	    let localctx = new ConditionStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, AggregationParser.RULE_conditionStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 111;
	        this.condition(0);
	        this.state = 112;
	        this.match(AggregationParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	condition(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ConditionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 8;
	    this.enterRecursionRule(localctx, 8, AggregationParser.RULE_condition, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 125;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case AggregationParser.LPAREN:
	            localctx = new ConditionGroupContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 115;
	            this.match(AggregationParser.LPAREN);
	            this.state = 116;
	            this.condition(0);
	            this.state = 117;
	            this.match(AggregationParser.RPAREN);
	            break;
	        case AggregationParser.NOT:
	            localctx = new ConditionNegateContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 119;
	            this.match(AggregationParser.NOT);
	            this.state = 120;
	            this.match(AggregationParser.LPAREN);
	            this.state = 121;
	            this.condition(0);
	            this.state = 122;
	            this.match(AggregationParser.RPAREN);
	            break;
	        case AggregationParser.ORDEROPERATOR:
	        case AggregationParser.IN:
	            localctx = new IdentityConditionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 124;
	            this.selector();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 132;
	        this._errHandler.sync(this);
	        let _alt = this._interp.adaptivePredict(this._input,9,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new ConditionBinOpContext(this, new ConditionContext(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, AggregationParser.RULE_condition);
	                this.state = 127;
	                if (!( this.precpred(this._ctx, 4))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                }
	                this.state = 128;
	                this.match(AggregationParser.SETOPERATOR);
	                this.state = 129;
	                this.condition(5); 
	            }
	            this.state = 134;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,9,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	selector() {
	    let localctx = new SelectorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, AggregationParser.RULE_selector);
	    try {
	        this.state = 149;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case AggregationParser.ORDEROPERATOR:
	            localctx = new SelectorOrderContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 135;
	            this.match(AggregationParser.ORDEROPERATOR);
	            this.state = 136;
	            this.match(AggregationParser.LPAREN);
	            this.state = 137;
	            this.category();
	            this.state = 138;
	            this.match(AggregationParser.COMMA);
	            this.state = 139;
	            this.literal();
	            this.state = 140;
	            this.match(AggregationParser.RPAREN);
	            break;
	        case AggregationParser.IN:
	            localctx = new SelectorInContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 142;
	            this.match(AggregationParser.IN);
	            this.state = 143;
	            this.match(AggregationParser.LPAREN);
	            this.state = 144;
	            this.category();
	            this.state = 145;
	            this.match(AggregationParser.COMMA);
	            this.state = 146;
	            this.literals();
	            this.state = 147;
	            this.match(AggregationParser.RPAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	measure() {
	    let localctx = new MeasureContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, AggregationParser.RULE_measure);
	    var _la = 0; // Token type
	    try {
	        this.state = 153;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case AggregationParser.NUMBER:
	        case AggregationParser.FLOAT:
	            localctx = new ConstantMeasureContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 151;
	            _la = this._input.LA(1);
	            if(!(_la===AggregationParser.NUMBER || _la===AggregationParser.FLOAT)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case AggregationParser.ID_LITERAL:
	            localctx = new ReferenceMeasureContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 152;
	            this.match(AggregationParser.ID_LITERAL);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	category() {
	    let localctx = new CategoryContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, AggregationParser.RULE_category);
	    try {
	        localctx = new ReferenceCategoryContext(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 155;
	        this.match(AggregationParser.ID_LITERAL);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	literals() {
	    let localctx = new LiteralsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, AggregationParser.RULE_literals);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this.match(AggregationParser.LBRACK);
	        this.state = 158;
	        this.literal();
	        this.state = 163;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===AggregationParser.COMMA) {
	            this.state = 159;
	            this.match(AggregationParser.COMMA);
	            this.state = 160;
	            this.literal();
	            this.state = 165;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 166;
	        this.match(AggregationParser.RBRACK);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	literal() {
	    let localctx = new LiteralContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, AggregationParser.RULE_literal);
	    var _la = 0; // Token type
	    try {
	        this.state = 170;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case AggregationParser.NUMBER:
	        case AggregationParser.FLOAT:
	            localctx = new FloatLiteralContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 168;
	            _la = this._input.LA(1);
	            if(!(_la===AggregationParser.NUMBER || _la===AggregationParser.FLOAT)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case AggregationParser.STR_LITERAL:
	            localctx = new StringLiteralContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 169;
	            this.match(AggregationParser.STR_LITERAL);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

AggregationParser.EOF = antlr4.Token.EOF;
AggregationParser.NUMBER = 1;
AggregationParser.FLOAT = 2;
AggregationParser.SORT = 3;
AggregationParser.AGGR = 4;
AggregationParser.CUMAGGR = 5;
AggregationParser.ROLAGGR = 6;
AggregationParser.COUNT = 7;
AggregationParser.ORDEROPERATOR = 8;
AggregationParser.IN = 9;
AggregationParser.NOT = 10;
AggregationParser.SETOPERATOR = 11;
AggregationParser.ARITHMOPERATOR = 12;
AggregationParser.LPAREN = 13;
AggregationParser.RPAREN = 14;
AggregationParser.LBRACK = 15;
AggregationParser.RBRACK = 16;
AggregationParser.COMMA = 17;
AggregationParser.ID_LITERAL = 18;
AggregationParser.STR_LITERAL = 19;
AggregationParser.WS = 20;

AggregationParser.RULE_aggregationStatement = 0;
AggregationParser.RULE_aggregation = 1;
AggregationParser.RULE_expression = 2;
AggregationParser.RULE_conditionStatement = 3;
AggregationParser.RULE_condition = 4;
AggregationParser.RULE_selector = 5;
AggregationParser.RULE_measure = 6;
AggregationParser.RULE_category = 7;
AggregationParser.RULE_literals = 8;
AggregationParser.RULE_literal = 9;

class AggregationStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_aggregationStatement;
    }

	aggregation() {
	    return this.getTypedRuleContext(AggregationContext,0);
	};

	EOF() {
	    return this.getToken(AggregationParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterAggregationStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitAggregationStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitAggregationStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AggregationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_aggregation;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ReductionContext extends AggregationContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	AGGR() {
	    return this.getToken(AggregationParser.AGGR, 0);
	};

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(AggregationParser.COMMA);
	    } else {
	        return this.getToken(AggregationParser.COMMA, i);
	    }
	};


	condition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    } else {
	        return this.getTypedRuleContext(ConditionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterReduction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitReduction(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitReduction(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ReductionContext = ReductionContext;

class CumReductionContext extends AggregationContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	CUMAGGR() {
	    return this.getToken(AggregationParser.CUMAGGR, 0);
	};

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	SORT() {
	    return this.getToken(AggregationParser.SORT, 0);
	};

	ID_LITERAL() {
	    return this.getToken(AggregationParser.ID_LITERAL, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(AggregationParser.COMMA);
	    } else {
	        return this.getToken(AggregationParser.COMMA, i);
	    }
	};


	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	condition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    } else {
	        return this.getTypedRuleContext(ConditionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterCumReduction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitCumReduction(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitCumReduction(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.CumReductionContext = CumReductionContext;

class IdentityAggregationContext extends AggregationContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterIdentityAggregation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitIdentityAggregation(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitIdentityAggregation(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.IdentityAggregationContext = IdentityAggregationContext;

class AggregationGroupContext extends AggregationContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	aggregation() {
	    return this.getTypedRuleContext(AggregationContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterAggregationGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitAggregationGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitAggregationGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.AggregationGroupContext = AggregationGroupContext;

class AggregationBinOpContext extends AggregationContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	aggregation = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AggregationContext);
	    } else {
	        return this.getTypedRuleContext(AggregationContext,i);
	    }
	};

	ARITHMOPERATOR() {
	    return this.getToken(AggregationParser.ARITHMOPERATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterAggregationBinOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitAggregationBinOp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitAggregationBinOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.AggregationBinOpContext = AggregationBinOpContext;

class RolReductionContext extends AggregationContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ROLAGGR() {
	    return this.getToken(AggregationParser.ROLAGGR, 0);
	};

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	NUMBER() {
	    return this.getToken(AggregationParser.NUMBER, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(AggregationParser.COMMA);
	    } else {
	        return this.getToken(AggregationParser.COMMA, i);
	    }
	};


	SORT() {
	    return this.getToken(AggregationParser.SORT, 0);
	};

	ID_LITERAL() {
	    return this.getToken(AggregationParser.ID_LITERAL, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	condition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    } else {
	        return this.getTypedRuleContext(ConditionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterRolReduction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitRolReduction(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitRolReduction(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.RolReductionContext = RolReductionContext;

class CountContext extends AggregationContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	COUNT() {
	    return this.getToken(AggregationParser.COUNT, 0);
	};

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	category() {
	    return this.getTypedRuleContext(CategoryContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(AggregationParser.COMMA);
	    } else {
	        return this.getToken(AggregationParser.COMMA, i);
	    }
	};


	condition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    } else {
	        return this.getTypedRuleContext(ConditionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterCount(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitCount(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitCount(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.CountContext = CountContext;

class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_expression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ExpressionGroupContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterExpressionGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitExpressionGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitExpressionGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ExpressionGroupContext = ExpressionGroupContext;

class ExpressionBinOpContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	ARITHMOPERATOR() {
	    return this.getToken(AggregationParser.ARITHMOPERATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterExpressionBinOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitExpressionBinOp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitExpressionBinOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ExpressionBinOpContext = ExpressionBinOpContext;

class IdentityExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	measure() {
	    return this.getTypedRuleContext(MeasureContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterIdentityExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitIdentityExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitIdentityExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.IdentityExpressionContext = IdentityExpressionContext;

class ConditionStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_conditionStatement;
    }

	condition() {
	    return this.getTypedRuleContext(ConditionContext,0);
	};

	EOF() {
	    return this.getToken(AggregationParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterConditionStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitConditionStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitConditionStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ConditionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_condition;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ConditionBinOpContext extends ConditionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	condition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    } else {
	        return this.getTypedRuleContext(ConditionContext,i);
	    }
	};

	SETOPERATOR() {
	    return this.getToken(AggregationParser.SETOPERATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterConditionBinOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitConditionBinOp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitConditionBinOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ConditionBinOpContext = ConditionBinOpContext;

class ConditionNegateContext extends ConditionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NOT() {
	    return this.getToken(AggregationParser.NOT, 0);
	};

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	condition() {
	    return this.getTypedRuleContext(ConditionContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterConditionNegate(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitConditionNegate(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitConditionNegate(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ConditionNegateContext = ConditionNegateContext;

class IdentityConditionContext extends ConditionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	selector() {
	    return this.getTypedRuleContext(SelectorContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterIdentityCondition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitIdentityCondition(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitIdentityCondition(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.IdentityConditionContext = IdentityConditionContext;

class ConditionGroupContext extends ConditionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	condition() {
	    return this.getTypedRuleContext(ConditionContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterConditionGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitConditionGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitConditionGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ConditionGroupContext = ConditionGroupContext;

class SelectorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_selector;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class SelectorInContext extends SelectorContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IN() {
	    return this.getToken(AggregationParser.IN, 0);
	};

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	category() {
	    return this.getTypedRuleContext(CategoryContext,0);
	};

	COMMA() {
	    return this.getToken(AggregationParser.COMMA, 0);
	};

	literals() {
	    return this.getTypedRuleContext(LiteralsContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterSelectorIn(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitSelectorIn(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitSelectorIn(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.SelectorInContext = SelectorInContext;

class SelectorOrderContext extends SelectorContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ORDEROPERATOR() {
	    return this.getToken(AggregationParser.ORDEROPERATOR, 0);
	};

	LPAREN() {
	    return this.getToken(AggregationParser.LPAREN, 0);
	};

	category() {
	    return this.getTypedRuleContext(CategoryContext,0);
	};

	COMMA() {
	    return this.getToken(AggregationParser.COMMA, 0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	RPAREN() {
	    return this.getToken(AggregationParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterSelectorOrder(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitSelectorOrder(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitSelectorOrder(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.SelectorOrderContext = SelectorOrderContext;

class MeasureContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_measure;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ReferenceMeasureContext extends MeasureContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ID_LITERAL() {
	    return this.getToken(AggregationParser.ID_LITERAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterReferenceMeasure(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitReferenceMeasure(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitReferenceMeasure(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ReferenceMeasureContext = ReferenceMeasureContext;

class ConstantMeasureContext extends MeasureContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	FLOAT() {
	    return this.getToken(AggregationParser.FLOAT, 0);
	};

	NUMBER() {
	    return this.getToken(AggregationParser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterConstantMeasure(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitConstantMeasure(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitConstantMeasure(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ConstantMeasureContext = ConstantMeasureContext;

class CategoryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_category;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ReferenceCategoryContext extends CategoryContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ID_LITERAL() {
	    return this.getToken(AggregationParser.ID_LITERAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterReferenceCategory(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitReferenceCategory(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitReferenceCategory(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.ReferenceCategoryContext = ReferenceCategoryContext;

class LiteralsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_literals;
    }

	LBRACK() {
	    return this.getToken(AggregationParser.LBRACK, 0);
	};

	literal = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(LiteralContext);
	    } else {
	        return this.getTypedRuleContext(LiteralContext,i);
	    }
	};

	RBRACK() {
	    return this.getToken(AggregationParser.RBRACK, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(AggregationParser.COMMA);
	    } else {
	        return this.getToken(AggregationParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterLiterals(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitLiterals(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitLiterals(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LiteralContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AggregationParser.RULE_literal;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class StringLiteralContext extends LiteralContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	STR_LITERAL() {
	    return this.getToken(AggregationParser.STR_LITERAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterStringLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitStringLiteral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitStringLiteral(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.StringLiteralContext = StringLiteralContext;

class FloatLiteralContext extends LiteralContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	FLOAT() {
	    return this.getToken(AggregationParser.FLOAT, 0);
	};

	NUMBER() {
	    return this.getToken(AggregationParser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.enterFloatLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof AggregationListener ) {
	        listener.exitFloatLiteral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof AggregationVisitor ) {
	        return visitor.visitFloatLiteral(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

AggregationParser.FloatLiteralContext = FloatLiteralContext;


AggregationParser.AggregationStatementContext = AggregationStatementContext; 
AggregationParser.AggregationContext = AggregationContext; 
AggregationParser.ExpressionContext = ExpressionContext; 
AggregationParser.ConditionStatementContext = ConditionStatementContext; 
AggregationParser.ConditionContext = ConditionContext; 
AggregationParser.SelectorContext = SelectorContext; 
AggregationParser.MeasureContext = MeasureContext; 
AggregationParser.CategoryContext = CategoryContext; 
AggregationParser.LiteralsContext = LiteralsContext; 
AggregationParser.LiteralContext = LiteralContext; 
