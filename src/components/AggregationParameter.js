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
import IconButton from "@material-ui/core/IconButton";
import {RemoveCircleOutline} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {
    AggregationStatementHelper,
    AggregationStatementValid,
    StatementSymbolTable
} from "../features/aggregation/Aggregation";
import {SelectItem} from "./DefaultComponents";

export const AggregationParameter = (props) => {
    const {measures, categories, label, type, value, valid, top, onRemove, onPropertyChange} = props

    const statementSymbolTable = new StatementSymbolTable(false)
    statementSymbolTable.addSymbol("expression", "ID_LITERAL", measures)
    statementSymbolTable.addSymbol("measure", "ID_LITERAL", measures)
    statementSymbolTable.addSymbol("category", "ID_LITERAL", categories)
    statementSymbolTable.addSymbol("condition", "ID_LITERAL", categories)

    const valueDomain = (value) => {
        if (type === "A") {
            const aggregation = AggregationStatementHelper(value || "", statementSymbolTable)// last [ should be removed and value added
            if (aggregation.error) {

                return {valid: false, values: [aggregation.correction, ...aggregation.suggestions]}
            } else {

                return {valid: true, values: [aggregation.correction, ...aggregation.suggestions]}
            }
        } else {// "C"
            return {valid: true, values: categories}
        }
    }

    const handleChange = (value) => {
        if (type === "A") {
            const isValid = AggregationStatementValid(value || "")

            onPropertyChange([{name: 'value', value: value}, {name: 'valid', value: isValid}])
        } else {

            onPropertyChange([{name: 'value', value: value}, {name: 'valid', value: true}])
        }
    }

    return (<React.Fragment>
        <div className={"param-item"}>
            <IconButton size={"small"} aria-label="remove"
                        onClick={onRemove}>
                <RemoveCircleOutline/>
            </IconButton>
        </div>
        <div className={"param-item"}>
            <TextField size={"small"} select label="Type" value={type}
                       onChange={(event, value) => {
                           onPropertyChange({name: 'type', value: value.props.value})
                       }}>
                <MenuItem key="Aggregate" value="A">
                    {"A"}
                </MenuItem>
                <MenuItem key="Category" value="C">
                    {"C"}
                </MenuItem>
                ))}
            </TextField>
        </div>
        <div className={"param-item"}>
            <SelectItem options={[]}
                        value={value}
                        label={label}
                        helperText={type === "A" ? "Edit aggregate" : "Select category"}
                        otherProps={{...props.otherProps, 'data-param-valid': `${valid}`, freeSolo: 'true'}}
                        computeOptions={(v) => valueDomain(v).values}
                        onChange={(v) => {
                            handleChange(v)
                        }}/>
        </div>
        <div className={"param-item"}>
            {(type === 'A') &&
            <TextField size={"small"} label="Top" type={"number"} value={top}
                       onChange={(event) => {
                           onPropertyChange({name: 'top', value: parseInt(event.target.value) || undefined})
                       }}>
                ))}
            </TextField>}
        </div>
    </React.Fragment>)
}