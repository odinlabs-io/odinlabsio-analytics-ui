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

import './css/DefaultComponents.scss'
import React, {useEffect, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export const SelectItem = (props) => {
    const {label, value, helperText, options, otherProps} = props
    const [currentValue] = useState(value)
    const [inputValue, setInputValue] = useState("")
    const [currentOptions, setOptions] = useState(options)

    const onInputChange = (value) => {
        setInputValue(value)
    }

    useEffect(() => {
        setOptions(props.computeOptions(inputValue))

        props.onChange(inputValue)
    }, [props, inputValue])

    return (
        <React.Fragment>
            <Autocomplete
                {...otherProps}
                size={"small"}
                style={{'flex': '1'}}
                options={currentOptions}
                getOptionLabel={(option) => {
                    return option
                }}
                value={currentValue}
                inputValue={inputValue}
                onInputChange={(event, value) => onInputChange(value)}
                onChange={(event, value) => props.onChange(value)}
                renderInput={(params) => {
                    return (<TextField {...params} size={"small"} label={label} placeholder={helperText}/>)
                }}
            />
        </React.Fragment>
    )
}

export const VerticalActionComponent = (props) => {
    const {action} = props
    return (
        <div style={{
            "display": "flex",
            "flexDirection": "column",
            "width": "40px",
            "alignItems": "center",
            "justifyContent": "center"
        }}>
            <div style={{
                "marginBottom": "30px",
                "paddingBottom": "30px",
                "width": "2px",
                "height": "100%",
                "background": "antiquewhite"
            }}/>
            {action()}
            <div style={{
                "marginTop": "30px",
                "paddingTop": "30px",
                "width": "2px",
                "height": "100%",
                "backgroundColor": "antiquewhite"
            }}/>
        </div>)
}