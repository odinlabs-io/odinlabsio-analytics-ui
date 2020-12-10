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

import AggregationLexer from "./parser/gen/AggregationLexer";
import {CommonTokenStream, InputStream} from "antlr4";
import AggregationParser from "./parser/gen/AggregationParser";
import {DefaultErrorStrategy} from "antlr4/error/ErrorStrategy";
import {TerminalNode} from "antlr4/tree/Tree";

class StateAwareErrorStrategy extends DefaultErrorStrategy {
    constructor() {
        super();
        this.sucessStates = []
        this.syncState = {}
        this.errorState = {}
        this.missingToken = {}
    }

    reportMatch(recognizer) {
        this.sucessStates.push({state: recognizer.state, ctx: recognizer._ctx})
        super.reportMatch(recognizer)
    }

    reportError(recognizer, e) {
        if (!this.errorState.state) {// get first state only
            this.errorState = {state: recognizer.state, ctx: recognizer._ctx}

            if (this.sucessStates.length > 0) {
                let lastSuccessCtx = this.sucessStates[this.sucessStates.length - 1].ctx
                if (lastSuccessCtx instanceof TerminalNode) {// should not be if building a parse tree and rule exist
                    this.errorState["column"] = lastSuccessCtx.symbol.column
                } else {
                    if (lastSuccessCtx.children) {
                        let lastSuccessCtxChildren = lastSuccessCtx.children
                        for (let i = lastSuccessCtxChildren.length - 1; i > -1; --i) {
                            let child = lastSuccessCtxChildren[i]
                            if (child instanceof TerminalNode) {
                                this.errorState["column"] = child.symbol.stop
                                break
                            }
                        }
                    }
                }
            }
        }
        super.reportError(recognizer, e)
    }

    reportMissingToken(recognizer) {
        if (!this.missingToken.state) {
            this.missingToken = {state: recognizer.state, ctx: recognizer._ctx}
        }
    }

    sync(recognizer) {
        this.syncState = {state: recognizer.state, ctx: recognizer._ctx}
        super.sync(recognizer)
    }

    getSuccessExpectedToken(parser): string[] {
        let expectedTokens = new Set()
        for (let i = 0; i < this.sucessStates.length; ++i) {
            let successState = this.sucessStates[i].state
            let successCtx = this.sucessStates[i].ctx
            let tokens = parser._interp.atn.getExpectedTokens(successState, successCtx)
            this.toTokenArray(tokens, parser.literalNames, parser.symbolicNames).forEach(token => {
                expectedTokens.add(token)
            })
        }
        return expectedTokens
    }

    getErrorExpectedToken(parser): { tokens: string[], column: number, rule: string } {
        if (this.errorState.state) {
            let tokens = parser._interp.atn.getExpectedTokens(this.errorState.state, this.errorState.ctx)
            if (this.errorState.ctx instanceof TerminalNode) {
                let parent = this.errorState.ctx.parentCtx
                let ruleName = parser.ruleNames[parent.ruleIndex]
                return {
                    tokens: this.toTokenArray(tokens, parser.literalNames, parser.symbolicNames),
                    column: this.errorState.column,
                    rule: ruleName
                }
            } else {
                let ruleName = parser.ruleNames[this.errorState.ctx.ruleIndex]
                return {
                    tokens: this.toTokenArray(tokens, parser.literalNames, parser.symbolicNames),
                    column: this.errorState.column,
                    rule: ruleName
                }
            }
        }
        return {tokens: []}
    }

    getMissingTokens(parser): { tokens: string[] } {
        if (this.missingToken.state) {
            const tokens = parser._interp.atn.getExpectedTokens(this.missingToken.state, this.missingToken.ctx)
            return {tokens: this.toTokenArray(tokens, parser.literalNames, parser.symbolicNames)}
        } else {
            return {tokens: []}
        }
    }

    getSyncExpectedTokens(parser): { tokens: string[], rule: string } {
        if (this.syncState.state) {
            let tokens = parser._interp.atn.getExpectedTokens(this.syncState.state, this.syncState.ctx)
            let ruleName = parser.ruleNames[this.syncState.ctx.ruleIndex]
            return {tokens: this.toTokenArray(tokens, parser.literalNames, parser.symbolicNames), rule: ruleName}
        }
        return {tokens: []}
    }

    toTokenArray(intervalSet, literalNames, symbolicNames) {
        let names = [];
        for (let i = 0; i < intervalSet.intervals.length; i++) {
            let v = intervalSet.intervals[i];
            for (let j = v.start; j < v.stop; j++) {
                names.push(intervalSet.elementName(literalNames, symbolicNames, j));
            }
        }
        return names
    }
}

class EmptyTreeVisitor {
    visitChildren(ctx) {
        return {}
    }
}

class AggregationTreeVisitor {

    visitChildren(ctx) {
        if (!ctx) {
            return {};
        }
        let adj = {}
        let attributes = {}
        let count = 0;
        let nodes = []

        nodes.push({id: count, ctx: ctx})

        let current = nodes.pop()
        while (current) {
            let currentId = current.id
            let currentCtx = current.ctx
            adj[currentId] = []

            if (currentCtx instanceof TerminalNode) {
                attributes[currentId] = {id: currentId, value: currentCtx.getText(), type: currentCtx.getSymbol().type}
            } else {
                if (currentCtx.children && currentCtx.children.length !== 0) {
                    const n = currentCtx.children.length
                    for (let i = 0; i < n; ++i) {
                        let childCtx = currentCtx.children[i]
                        let childId = (count + (i + 1))

                        nodes.push({id: childId, ctx: childCtx})
                        adj[currentId].push(childId)
                    }
                    count = count + n
                }
                attributes[currentId] = {id: currentId, value: currentCtx.getText(), type: currentCtx.ruleIndex}
            }
            current = nodes.pop()
        }

        return {adj: adj, attributes: attributes}
    }
}

export class StatementSymbolTable {

    constructor(escaped: boolean = true) {
        this.symbolTable = AggregationParser.ruleNames.reduce((table, rule) => {
            table[rule] = {
                "NUMBER": new Set(['']),
                "FLOAT": new Set(['']),

                "SORT": new Set(['ASC' | 'DESC']),
                "AGGR": new Set(["SUM", "PROD", "MIN", "MAX", "AVG", "VAR", "STD"]),
                "CUMAGGR": new Set(["CUMSUM", "CUMPROD", "CUMMIN", "CUMMAX"]),
                "ROLAGGR": new Set(["ROLSUM", "ROLPROD", "ROLMIN", "ROLMAX"]),
                "COUNT": new Set(["COUNT", "UCOUNT"]),

                "ORDEROPERATOR": new Set(['EQ', 'GTE', 'GT', 'LT', 'LTE']),
                "'EQ'": new Set(['EQ']),
                "'GTE'": new Set(['GTE']),
                "'GT'": new Set(['GT']),
                "'LT'": new Set(['LT']),
                "'LTE'": new Set(['LTE']),

                "'IN'": new Set(['IN']),
                "'NOT'": new Set(['NOT']),
                "SETOPERATOR": new Set(['AND', 'OR']),
                "ARITHMOPERATOR": new Set(['+', '*', '-', '/']),

                "'('": new Set(['(']),
                "')'": new Set([')']),
                "'['": new Set(['[']),
                "']'": new Set([']']),
                "','": new Set([',']),
            };
            return table
        }, {})
        this.escaped = escaped
    }

    addSymbol(rule: string, token: string, symbols: []): void {
        if (!this.symbolTable[rule]) {
            this.symbolTable[rule] = {token: new Set()}
        }
        if (!this.symbolTable[rule][token]) {
            this.symbolTable[rule][token] = new Set()
        }
        if (this.escaped) {
            symbols.forEach(symbol => this.symbolTable[rule][token].add(symbol))
        } else {
            symbols.map(symbol => "'" + symbol + "'").forEach(symbol => this.symbolTable[rule][token].add(symbol))
        }
    }

    getSymbol(token: string): string[] {
        let symbols = this.symbolTable["aggregationStatement"][token]
        if (symbols) {
            return [...symbols]
        } else {
            return []
        }
    }

    getSymbols(rule: string, token: string): string [] {
        let ruleSymbolTable = this.symbolTable[rule]
        if (ruleSymbolTable) {
            let symbols = ruleSymbolTable[token]
            if (symbols) {
                return [...symbols]
            }
        }
        return []
    }
}

const buildSuggestion = (data: string, tokens: [], rule: string, symbolTable: StatementSymbolTable) => {

    return [...new Set(tokens.flatMap(token => symbolTable.getSymbols(rule, token).map(symbol => data + symbol)))]
}

export const AggregationStatementDag = (data: string) => {
    const chars = new InputStream(data);
    const lexer = new AggregationLexer(chars);

    const tokens = new CommonTokenStream(lexer);
    const parser = new AggregationParser(tokens);

    parser._errHandler = new StateAwareErrorStrategy()

    parser.buildParseTrees = true;

    const aggregationDAG = parser.aggregationStatement().accept(new AggregationTreeVisitor())

    return {error: parser._errHandler.hasError(), aggregationDAG}
}

export const ConditionStatementDag = (data: string) => {
    const chars = new InputStream(data);
    const lexer = new AggregationLexer(chars);

    const tokens = new CommonTokenStream(lexer);
    const parser = new AggregationParser(tokens);

    parser._errHandler = new StateAwareErrorStrategy()

    parser.buildParseTrees = true;

    const aggregationDAG = parser.conditionStatement().accept(new AggregationTreeVisitor())

    return {error: parser._errHandler.hasError(), aggregationDAG}
}

function statementHelper(data: string, parser: AggregationParser, symbolTable: StatementSymbolTable) {
    const errorExpectedToken = parser._errHandler.getErrorExpectedToken(parser)
    const missingTokens = parser._errHandler.getMissingTokens(parser)
    if (errorExpectedToken.tokens.length > 0) {
        if (errorExpectedToken.column) {
            let corrected = data.slice(0, errorExpectedToken.column + 1)
            return {
                error: true,
                correction: corrected,
                suggestions: buildSuggestion(corrected, errorExpectedToken.tokens, errorExpectedToken.rule, symbolTable)
            }
        } else {

            return {
                error: true,
                correction: "",
                suggestions: buildSuggestion("", errorExpectedToken.tokens, errorExpectedToken.rule, symbolTable)
            }
        }
    } else if (missingTokens.tokens.length > 0) {
        const missingSymbol = symbolTable.getSymbol(missingTokens.tokens[0])
        const corrected = missingSymbol.length > 0 ? data.concat(missingSymbol[0]) : data

        return {
            error: true,
            correction: corrected,
            suggestions: []
        }
    } else {
        const syncExpectedTokens = parser._errHandler.getSyncExpectedTokens(parser)

        return {
            error: false,
            correction: data,
            suggestions: buildSuggestion(data, syncExpectedTokens.tokens, syncExpectedTokens.rule, symbolTable)
        }
    }
}

function parserHelper(data: string, nolog: boolean) {
    const chars = new InputStream(data);
    const lexer = new AggregationLexer(chars);

    const tokens = new CommonTokenStream(lexer);
    const parser = new AggregationParser(tokens);
    if (nolog) {
        parser._listeners = []
    }
    parser._errHandler = new StateAwareErrorStrategy()
    parser.buildParseTrees = true;// needed to extract terminal node

    return parser
}

export const AggregationStatementHelper = (data: string, symbolTable: StatementSymbolTable, nolog: boolean = true) => {
    const parser = parserHelper(data, nolog)

    parser.aggregationStatement().accept(new EmptyTreeVisitor())

    return statementHelper(data, parser, symbolTable)
}

export const AggregationStatementValid = (data: string, nolog: boolean = true) => {
    const parser = parserHelper(data, nolog)

    parser.aggregationStatement().accept(new EmptyTreeVisitor())

    const errorExpectedToken = parser._errHandler.getErrorExpectedToken(parser)

    return errorExpectedToken.tokens.length === 0;
}

export const ConditionStatementHelper = (data: string, symbolTable: StatementSymbolTable, nolog: boolean = true) => {
    const parser = parserHelper(data, nolog)

    parser.conditionStatement().accept(new EmptyTreeVisitor())

    return statementHelper(data, parser, symbolTable)
}

export const ConditionStatementValid = (data: string, nolog: boolean = true) => {
    const parser = parserHelper(data, nolog)

    parser.conditionStatement().accept(new EmptyTreeVisitor())

    const errorExpectedToken = parser._errHandler.getErrorExpectedToken(parser)

    return errorExpectedToken.tokens.length === 0;
}