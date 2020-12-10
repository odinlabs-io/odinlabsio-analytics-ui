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

import {AggregationStatementHelper, StatementSymbolTable} from "../Aggregation";

test('parse simple statement', () => {

    const aggregation1 = AggregationStatementHelper("SUM('VALUES')", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM('VALUES')")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUES')+",
        "SUM('VALUES')*",
        "SUM('VALUES')-",
        "SUM('VALUES')/"])

    const aggregation2 = AggregationStatementHelper("PROD('VALUES')", new StatementSymbolTable())
    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("PROD('VALUES')")
    expect(aggregation2.suggestions).toStrictEqual(["PROD('VALUES')+",
        "PROD('VALUES')*",
        "PROD('VALUES')-",
        "PROD('VALUES')/"])

    const aggregation3 = AggregationStatementHelper("MIN('VALUES')", new StatementSymbolTable())
    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("MIN('VALUES')")
    expect(aggregation3.suggestions).toStrictEqual(["MIN('VALUES')+",
        "MIN('VALUES')*",
        "MIN('VALUES')-",
        "MIN('VALUES')/"])

    const aggregation4 = AggregationStatementHelper("MAX('VALUES')", new StatementSymbolTable())
    expect(aggregation4.error).toBe(false)
    expect(aggregation4.correction).toBe("MAX('VALUES')")
    expect(aggregation4.suggestions).toStrictEqual(["MAX('VALUES')+",
        "MAX('VALUES')*",
        "MAX('VALUES')-",
        "MAX('VALUES')/"])

    const aggregation5 = AggregationStatementHelper("AVG('VALUES')", new StatementSymbolTable())
    expect(aggregation5.error).toBe(false)
    expect(aggregation5.correction).toBe("AVG('VALUES')")
    expect(aggregation5.suggestions).toStrictEqual(["AVG('VALUES')+",
        "AVG('VALUES')*",
        "AVG('VALUES')-",
        "AVG('VALUES')/"])
})

test('parse condition statement', () => {
    const aggregation1 = AggregationStatementHelper("SUM('VALUES', EQ('COLUMN', 10))", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM('VALUES', EQ('COLUMN', 10))")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUES', EQ('COLUMN', 10))+",
        "SUM('VALUES', EQ('COLUMN', 10))*",
        "SUM('VALUES', EQ('COLUMN', 10))-",
        "SUM('VALUES', EQ('COLUMN', 10))/"])

    const aggregation2 = AggregationStatementHelper("SUM('VALUES', EQ('COLUMN', \"Monday\"))", new StatementSymbolTable())

    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("SUM('VALUES', EQ('COLUMN', \"Monday\"))")
    expect(aggregation2.suggestions).toStrictEqual(["SUM('VALUES', EQ('COLUMN', \"Monday\"))+",
        "SUM('VALUES', EQ('COLUMN', \"Monday\"))*",
        "SUM('VALUES', EQ('COLUMN', \"Monday\"))-",
        "SUM('VALUES', EQ('COLUMN', \"Monday\"))/"])

    const aggregation3 = AggregationStatementHelper("SUM('VALUES', IN('COLUMN', [10, \"Monday\"]))", new StatementSymbolTable())

    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("SUM('VALUES', IN('COLUMN', [10, \"Monday\"]))")
    expect(aggregation3.suggestions).toStrictEqual(["SUM('VALUES', IN('COLUMN', [10, \"Monday\"]))+",
        "SUM('VALUES', IN('COLUMN', [10, \"Monday\"]))*",
        "SUM('VALUES', IN('COLUMN', [10, \"Monday\"]))-",
        "SUM('VALUES', IN('COLUMN', [10, \"Monday\"]))/"])
})

test('parse reduction arithmetics 1', () => {
    const aggregation1 = AggregationStatementHelper("SUM('VALUES') + PROD('VALUES')", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM('VALUES') + PROD('VALUES')")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUES') + PROD('VALUES')+",
        "SUM('VALUES') + PROD('VALUES')*",
        "SUM('VALUES') + PROD('VALUES')-",
        "SUM('VALUES') + PROD('VALUES')/"])

    const aggregation2 = AggregationStatementHelper("SUM('VALUES') - PROD('VALUES')", new StatementSymbolTable())

    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("SUM('VALUES') - PROD('VALUES')")
    expect(aggregation2.suggestions).toStrictEqual(["SUM('VALUES') - PROD('VALUES')+",
        "SUM('VALUES') - PROD('VALUES')*",
        "SUM('VALUES') - PROD('VALUES')-",
        "SUM('VALUES') - PROD('VALUES')/"])

    const aggregation3 = AggregationStatementHelper("SUM('VALUES') * PROD('VALUES')", new StatementSymbolTable())

    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("SUM('VALUES') * PROD('VALUES')")
    expect(aggregation3.suggestions).toStrictEqual(["SUM('VALUES') * PROD('VALUES')+",
        "SUM('VALUES') * PROD('VALUES')*",
        "SUM('VALUES') * PROD('VALUES')-",
        "SUM('VALUES') * PROD('VALUES')/"])

    const aggregation4 = AggregationStatementHelper("SUM('VALUES') / PROD('VALUES')", new StatementSymbolTable())

    expect(aggregation4.error).toBe(false)
    expect(aggregation4.correction).toBe("SUM('VALUES') / PROD('VALUES')")
    expect(aggregation4.suggestions).toStrictEqual(["SUM('VALUES') / PROD('VALUES')+",
        "SUM('VALUES') / PROD('VALUES')*",
        "SUM('VALUES') / PROD('VALUES')-",
        "SUM('VALUES') / PROD('VALUES')/"])
})

test('parse reduction arithmetics 2', () => {
    const aggregation1 = AggregationStatementHelper("SUM('VALUES') + 'VALUES'", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM('VALUES') + 'VALUES'")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUES') + 'VALUES'+",
        "SUM('VALUES') + 'VALUES'*",
        "SUM('VALUES') + 'VALUES'-",
        "SUM('VALUES') + 'VALUES'/"])

    const aggregation2 = AggregationStatementHelper("SUM('VALUES') - 'VALUES'", new StatementSymbolTable())

    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("SUM('VALUES') - 'VALUES'")
    expect(aggregation2.suggestions).toStrictEqual(["SUM('VALUES') - 'VALUES'+",
        "SUM('VALUES') - 'VALUES'*",
        "SUM('VALUES') - 'VALUES'-",
        "SUM('VALUES') - 'VALUES'/"])

    const aggregation3 = AggregationStatementHelper("SUM('VALUES') * 'VALUES'", new StatementSymbolTable())

    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("SUM('VALUES') * 'VALUES'")
    expect(aggregation3.suggestions).toStrictEqual(["SUM('VALUES') * 'VALUES'+",
        "SUM('VALUES') * 'VALUES'*",
        "SUM('VALUES') * 'VALUES'-",
        "SUM('VALUES') * 'VALUES'/"])

    const aggregation4 = AggregationStatementHelper("SUM('VALUES') / 'VALUES'", new StatementSymbolTable())

    expect(aggregation4.error).toBe(false)
    expect(aggregation4.correction).toBe("SUM('VALUES') / 'VALUES'")
    expect(aggregation4.suggestions).toStrictEqual(["SUM('VALUES') / 'VALUES'+",
        "SUM('VALUES') / 'VALUES'*",
        "SUM('VALUES') / 'VALUES'-",
        "SUM('VALUES') / 'VALUES'/"])
})

test('parse reduction arithmetics 3', () => {
    const aggregation1 = AggregationStatementHelper("SUM('VALUES') + 10", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM('VALUES') + 10")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUES') + 10+",
        "SUM('VALUES') + 10*",
        "SUM('VALUES') + 10-",
        "SUM('VALUES') + 10/"])

    const aggregation2 = AggregationStatementHelper("SUM('VALUES') - 10", new StatementSymbolTable())

    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("SUM('VALUES') - 10")
    expect(aggregation2.suggestions).toStrictEqual(["SUM('VALUES') - 10+",
        "SUM('VALUES') - 10*",
        "SUM('VALUES') - 10-",
        "SUM('VALUES') - 10/"])

    const aggregation3 = AggregationStatementHelper("SUM('VALUES') * 10", new StatementSymbolTable())

    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("SUM('VALUES') * 10")
    expect(aggregation3.suggestions).toStrictEqual(["SUM('VALUES') * 10+",
        "SUM('VALUES') * 10*",
        "SUM('VALUES') * 10-",
        "SUM('VALUES') * 10/"])

    const aggregation4 = AggregationStatementHelper("SUM('VALUES') / 10", new StatementSymbolTable())

    expect(aggregation4.error).toBe(false)
    expect(aggregation4.correction).toBe("SUM('VALUES') / 10")
    expect(aggregation4.suggestions).toStrictEqual(["SUM('VALUES') / 10+",
        "SUM('VALUES') / 10*",
        "SUM('VALUES') / 10-",
        "SUM('VALUES') / 10/"])
})

test('parse reduction arithmetics 4', () => {
    const aggregation1 = AggregationStatementHelper("SUM('VALUESNUM' / 'VALUESDEN',EQ('COL', 10))", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM('VALUESNUM' / 'VALUESDEN',EQ('COL', 10))")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUESNUM' / 'VALUESDEN',EQ('COL', 10))+",
        "SUM('VALUESNUM' / 'VALUESDEN',EQ('COL', 10))*",
        "SUM('VALUESNUM' / 'VALUESDEN',EQ('COL', 10))-",
        "SUM('VALUESNUM' / 'VALUESDEN',EQ('COL', 10))/"])

    const aggregation2 = AggregationStatementHelper("SUM('VALUESNUM' / 'VALUESDEN')", new StatementSymbolTable())

    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("SUM('VALUESNUM' / 'VALUESDEN')")
    expect(aggregation2.suggestions).toStrictEqual(["SUM('VALUESNUM' / 'VALUESDEN')+",
        "SUM('VALUESNUM' / 'VALUESDEN')*",
        "SUM('VALUESNUM' / 'VALUESDEN')-",
        "SUM('VALUESNUM' / 'VALUESDEN')/"])

    const aggregation3 = AggregationStatementHelper("SUM('VALUESNUM' / 'VALUESDEN')", new StatementSymbolTable())

    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("SUM('VALUESNUM' / 'VALUESDEN')")
    expect(aggregation3.suggestions).toStrictEqual(["SUM('VALUESNUM' / 'VALUESDEN')+",
        "SUM('VALUESNUM' / 'VALUESDEN')*",
        "SUM('VALUESNUM' / 'VALUESDEN')-",
        "SUM('VALUESNUM' / 'VALUESDEN')/"])

    const aggregation4 = AggregationStatementHelper("SUM('VALUESNUM' / 'VALUESDEN')", new StatementSymbolTable())

    expect(aggregation4.error).toBe(false)
    expect(aggregation4.correction).toBe("SUM('VALUESNUM' / 'VALUESDEN')")
    expect(aggregation4.suggestions).toStrictEqual(["SUM('VALUESNUM' / 'VALUESDEN')+",
        "SUM('VALUESNUM' / 'VALUESDEN')*",
        "SUM('VALUESNUM' / 'VALUESDEN')-",
        "SUM('VALUESNUM' / 'VALUESDEN')/"])
})

test('parse reduction arithmetics 5', () => {
    const aggregation1 = AggregationStatementHelper("SUM('VALUESNUM' / 10,EQ('COL', 10))", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM('VALUESNUM' / 10,EQ('COL', 10))")
    expect(aggregation1.suggestions).toStrictEqual(["SUM('VALUESNUM' / 10,EQ('COL', 10))+",
        "SUM('VALUESNUM' / 10,EQ('COL', 10))*",
        "SUM('VALUESNUM' / 10,EQ('COL', 10))-",
        "SUM('VALUESNUM' / 10,EQ('COL', 10))/"])

    const aggregation2 = AggregationStatementHelper("SUM('VALUESNUM' / 10)", new StatementSymbolTable())

    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("SUM('VALUESNUM' / 10)")
    expect(aggregation2.suggestions).toStrictEqual(["SUM('VALUESNUM' / 10)+",
        "SUM('VALUESNUM' / 10)*",
        "SUM('VALUESNUM' / 10)-",
        "SUM('VALUESNUM' / 10)/"])

    const aggregation3 = AggregationStatementHelper("SUM('VALUESNUM' / 10)", new StatementSymbolTable())

    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("SUM('VALUESNUM' / 10)")
    expect(aggregation3.suggestions).toStrictEqual(["SUM('VALUESNUM' / 10)+",
        "SUM('VALUESNUM' / 10)*",
        "SUM('VALUESNUM' / 10)-",
        "SUM('VALUESNUM' / 10)/"])

    const aggregation4 = AggregationStatementHelper("SUM('VALUESNUM' / 10)", new StatementSymbolTable())

    expect(aggregation4.error).toBe(false)
    expect(aggregation4.correction).toBe("SUM('VALUESNUM' / 10)")
    expect(aggregation4.suggestions).toStrictEqual(["SUM('VALUESNUM' / 10)+",
        "SUM('VALUESNUM' / 10)*",
        "SUM('VALUESNUM' / 10)-",
        "SUM('VALUESNUM' / 10)/"])
})

test('parse reduction arithmetics 6', () => {
    const aggregation1 = AggregationStatementHelper("SUM(10 / 'VALUESDEN', EQ('COL', 10))", new StatementSymbolTable())

    expect(aggregation1.error).toBe(false)
    expect(aggregation1.correction).toBe("SUM(10 / 'VALUESDEN', EQ('COL', 10))")
    expect(aggregation1.suggestions).toStrictEqual(["SUM(10 / 'VALUESDEN', EQ('COL', 10))+",
        "SUM(10 / 'VALUESDEN', EQ('COL', 10))*",
        "SUM(10 / 'VALUESDEN', EQ('COL', 10))-",
        "SUM(10 / 'VALUESDEN', EQ('COL', 10))/"])

    const aggregation2 = AggregationStatementHelper("SUM(10 / 'VALUESDEN')", new StatementSymbolTable())

    expect(aggregation2.error).toBe(false)
    expect(aggregation2.correction).toBe("SUM(10 / 'VALUESDEN')")
    expect(aggregation2.suggestions).toStrictEqual(["SUM(10 / 'VALUESDEN')+",
        "SUM(10 / 'VALUESDEN')*",
        "SUM(10 / 'VALUESDEN')-",
        "SUM(10 / 'VALUESDEN')/"])

    const aggregation3 = AggregationStatementHelper("SUM(10 / 'VALUESDEN')", new StatementSymbolTable())

    expect(aggregation3.error).toBe(false)
    expect(aggregation3.correction).toBe("SUM(10 / 'VALUESDEN')")
    expect(aggregation3.suggestions).toStrictEqual(["SUM(10 / 'VALUESDEN')+",
        "SUM(10 / 'VALUESDEN')*",
        "SUM(10 / 'VALUESDEN')-",
        "SUM(10 / 'VALUESDEN')/"])

    const aggregation4 = AggregationStatementHelper("SUM(10 / 'VALUESDEN')", new StatementSymbolTable())

    expect(aggregation4.error).toBe(false)
    expect(aggregation4.correction).toBe("SUM(10 / 'VALUESDEN')")
    expect(aggregation4.suggestions).toStrictEqual(["SUM(10 / 'VALUESDEN')+",
        "SUM(10 / 'VALUESDEN')*",
        "SUM(10 / 'VALUESDEN')-",
        "SUM(10 / 'VALUESDEN')/"])
})