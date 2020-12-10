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
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import {ExpandMore} from "@material-ui/icons";
import LinearProgress from "@material-ui/core/LinearProgress";

export const ItemHeader = (props) => {
    const {status, title} = props
    return (<div className="analytics-item-header">
        <Typography variant="overline" display="block" gutterBottom>{title}</Typography>
        {status === 'loading' && <LinearProgress/>}
    </div>)
}

export const ItemLegend = (props) => {
    const {legend} = props
    return (<div className="analytics-item-content-legend">
        <Typography variant="overline" display="block" gutterBottom>{legend}</Typography>
    </div>)
}

export const ItemDescription = (props) => {
    const {description} = props
    const [expandDescription, setExpandDescription] = React.useState(false);

    const handleExpandClick = () => {
        setExpandDescription(!expandDescription);
    };

    return (
        <div className="analytics-item-content-description">
            <IconButton className={"expand-button-up-down"} onClick={handleExpandClick}
                        aria-expanded={expandDescription}
                        aria-label="show more">
                <ExpandMore/>
            </IconButton>
            <Collapse className="analytics-item-content-description-text" in={expandDescription} timeout="auto"
                      unmountOnExit>
                <Typography align={"left"} paragraph>{description}</Typography>
            </Collapse>
        </div>)
}

export const EditableItemHeader = (props) => {
    const {status, title, updateTitle} = props
    return (<div className="analytics-item-header">
        <div className="analytics-item-title">
            <TextField size={"small"}
                       id="standard-multiline-flexible"
                       label="Title"
                       multiline
                       rowsMax={1}
                       value={title}
                       onChange={(e) => updateTitle(e.target.value)}
            />
        </div>
        {status === 'loading' && <LinearProgress/>}
    </div>)
}

export const EditableItemLegend = (props) => {
    const {legend, updateLegend} = props
    return (<div className="analytics-item-content-legend">
        <TextField size={"small"}
                   id="standard-multiline-flexible"
                   label="Legend"
                   multiline
                   rowsMax={2}
                   value={legend}
                   onChange={(e) => updateLegend(e.target.value)}
        />
    </div>)
}

export const EditableItemDescription = (props) => {
    const {description, updateDescription} = props
    return (<div className="analytics-item-content-description">
        <TextField className="analytics-item-content-description-text" size={"small"}
                   id="standard-multiline-flexible"
                   label="Description"
                   multiline
                   rowsMax={5}
                   value={description}
                   onChange={(e) => updateDescription(e.target.value)}
        />
    </div>)
}
