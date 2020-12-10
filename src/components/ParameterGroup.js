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

import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";


export const NamedObjectGroup = (props) => {
    const {ids, add, render, otherProps} = props

    const [name, setName] = useState("")

    const onAddSubmit = (event) => {
        if (event.code === "Enter" && event.target.value) {
            setName('')
            add({...props, name: event.target.value})
        }
    }

    const onAddChange = (event) => {

        setName(event.target.value)
    }

    return (
        <React.Fragment>
            <TextField size={"small"} ariant="filled" label={props.label}
                       placeholder={props.placeholder} {...otherProps}
                       onKeyUp={onAddSubmit} onChange={onAddChange} value={name}/>
            <div className="param-group">
                {ids.map((objectId) => {
                    return render({
                        ...props,
                        key: objectId,
                        id: objectId
                    })
                })}
            </div>
        </React.Fragment>
    )
}