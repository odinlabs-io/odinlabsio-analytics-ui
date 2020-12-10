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

import React from "react";
import {
    ConditionStatementHelper, ConditionStatementValid,
    StatementSymbolTable
} from "../features/aggregation/Aggregation";
import {SelectItem} from "./DefaultComponents";

export const ConditionParam = (props) => {
    const {categories, filterId, valid, value, onPropertyChange} = props

    const statementSymbolTable = new StatementSymbolTable(false)
    statementSymbolTable.addSymbol("category", "ID_LITERAL", categories)
    statementSymbolTable.addSymbol("condition", "ID_LITERAL", categories)

    const valueDomain = (value) => {
        const condition = ConditionStatementHelper(value || "", statementSymbolTable)// last [ should be removed and value added
        if (condition.error) {

            return {valid: false, values: [condition.correction, ...condition.suggestions]}
        } else {

            return {valid: true, values: [condition.correction, ...condition.suggestions]}
        }
    }

    const handleChange = (value) => {
        const isValid = ConditionStatementValid(value || "")// last [ should be removed and value added
        onPropertyChange([{name: 'value', value: value}, {name: 'valid', value: isValid}])
    }

    return (<React.Fragment>
        <SelectItem options={[]}
                    value={value}
                    label={filterId}
                    helperText={"Filter On..."}
                    otherProps={{...props.otherProps, 'data-param-valid': `${valid}`, freeSolo: 'true'}}
                    computeOptions={(v) => valueDomain(v).values}
                    onChange={(v) => {
                        handleChange(v)
                    }}/>
    </React.Fragment>)
}