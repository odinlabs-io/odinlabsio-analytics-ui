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

import {AggregationStatementHelper, ConditionStatementHelper, StatementSymbolTable} from "../Aggregation";


test('suggestion start statement', () => {
    const aggregation1 = AggregationStatementHelper("", new StatementSymbolTable())

    expect(aggregation1.error).toBe(true)
    expect(aggregation1.suggestions).toStrictEqual(["", "SUM", "PROD", "MIN", "MAX", "AVG", "VAR", "STD",
        "CUMSUM", "CUMPROD", "CUMMIN", "CUMMAX", "ROLSUM", "ROLPROD", "ROLMIN", "ROLMAX", "COUNT", "UCOUNT", "("])
})

test('suggestion variables statement', () => {
    const symbolTable = new StatementSymbolTable()
    symbolTable.addSymbol("expression", "ID_LITERAL", ["'M1'"])
    const aggregation1 = AggregationStatementHelper("SUM(", symbolTable)

    expect(aggregation1.error).toBe(true)
    console.log(aggregation1.suggestions)

    expect(aggregation1.suggestions).toStrictEqual(["SUM(", "SUM((", "SUM('M1'"])
})

test('suggestion condition statement', () => {
    const symbolTable = new StatementSymbolTable()
    const aggregation1 = AggregationStatementHelper("SUM('VALUE',", symbolTable)

    expect(aggregation1.error).toBe(true)
    console.log(aggregation1.suggestions)

    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUE',EQ", "SUM('VALUE',GTE", "SUM('VALUE',GT", "SUM('VALUE',LT", "SUM('VALUE',LTE", "SUM('VALUE',IN", "SUM('VALUE',NOT", "SUM('VALUE',("])
})

test('suggestion count', () => {
    const symbolTable = new StatementSymbolTable()
    symbolTable.addSymbol("measure", "ID_LITERAL", ["'M1'"])
    symbolTable.addSymbol("category", "ID_LITERAL", ["'C1'"])
    const aggregation1 = AggregationStatementHelper("COUNT('", symbolTable)

    expect(aggregation1.error).toBe(true)
    expect(aggregation1.suggestions).toStrictEqual(["COUNT('C1'"])
})

test('suggestion condition statement category', () => {
    const symbolTable = new StatementSymbolTable()
    symbolTable.addSymbol("measure", "ID_LITERAL", ["'M1'"])
    symbolTable.addSymbol("category", "ID_LITERAL", ["'C1'"])
    const aggregation1 = AggregationStatementHelper("SUM('VALUE',EQ(", symbolTable)

    expect(aggregation1.error).toBe(true)
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUE',EQ('C1'"])
})

test('suggestion condition statement values with correction', () => {
    const symbolTable = new StatementSymbolTable()
    symbolTable.addSymbol("literal", "STR_LITERAL", ["'Monday'"])
    const aggregation1 = AggregationStatementHelper("SUM('VALUE',EQ('C1',[", symbolTable)// last [ should be removed and value added

    expect(aggregation1.error).toBe(true)
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUE',EQ('C1',", "SUM('VALUE',EQ('C1','Monday'"])
})

test('suggestion weird', () => {
    // SUM('Values.Count'
    const symbolTable = new StatementSymbolTable()
    symbolTable.addSymbol("literal", "STR_LITERAL", ["'Monday'"])
    symbolTable.addSymbol("expression", "ID_LITERAL", ["'Values.Count', 'M1'"])
    symbolTable.addSymbol("measure", "ID_LITERAL", ["'Values.Count', 'M1'"])
    symbolTable.addSymbol("category", "ID_LITERAL", ["'C1'"])
    symbolTable.addSymbol("literal", "STR_LITERAL", ["\"Monday\""])


    const aggregation1 = AggregationStatementHelper("SUM('Values.Count.Dis'", symbolTable)// last [ should be removed and value added

    expect(aggregation1.correction).toBe("SUM('Values.Count.Dis'")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('Values.Count.Dis')", "SUM('Values.Count.Dis',"])

})

test('suggestion condition', () => {
    const symbolTable = new StatementSymbolTable()
    symbolTable.addSymbol("literal", "STR_LITERAL", ["'Monday'"])
    symbolTable.addSymbol("expression", "ID_LITERAL", ["'Values.Count', 'M1'"])
    symbolTable.addSymbol("measure", "ID_LITERAL", ["'Values.Count', 'M1'"])
    symbolTable.addSymbol("category", "ID_LITERAL", ["'C1'"])
    symbolTable.addSymbol("literal", "STR_LITERAL", ["\"Monday\""])
    symbolTable.addSymbol("condition", "STR_LITERAL", ["\"Monday\""])
    symbolTable.addSymbol("condition", "ID_LITERAL", ["\"C1\""])

    const condition = ConditionStatementHelper("EQ('Country',\"A\"", symbolTable, false)

    expect(condition.correction).toBe(`EQ('Country',"A")`)
})