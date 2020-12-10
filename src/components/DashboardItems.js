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

import React, {useRef} from "react";
import IconButton from "@material-ui/core/IconButton";
import {DeleteForever, Edit} from "@material-ui/icons";

export const StudioDashboardItem = (props) => {
    const ref = useRef()
    const {item, onEdit, onRemove} = props
    return (
        <div ref={ref} className="analytics-item analytics-studio-item">
            <div className="analytics-studio-item-action">
                <IconButton aria-label="edit" onClick={() => onEdit(ref)}>
                    <Edit/>
                </IconButton>
            </div>
            {item({...props})}
            <div className="analytics-studio-item-action">
                <IconButton aria-label="deletes" onClick={() => onRemove(ref)}>
                    <DeleteForever/>
                </IconButton>
            </div>
        </div>
    )
}

export const PresentationDashboardItem = (props) => {
    const ref = useRef()
    const {item} = props
    return (
        <div ref={ref} className="analytics-item  analytics-presentation-item">
            {item({...props})}
        </div>
    )
}