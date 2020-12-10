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

import {connect} from "react-redux";
import type {State} from "../app/store";
import {removeAnalyticProperty, updateAnalyticPropertyAttributes} from "./dashbaord/analytics";
import {ConditionParam} from "../components/ConditionParam";
import IconButton from "@material-ui/core/IconButton";
import {RemoveCircleOutline} from "@material-ui/icons";
import {NamedObjectGroup} from "../components/ParameterGroup";

const _filterParam = () => {
    const otherProps = {helperText: "Filter On", multiline: true, freeSolo: "true"}

    const onPropertyChange = (dispatch, analyticId, value) => {
        if (value instanceof Array) {

            dispatch(updateAnalyticPropertyAttributes({
                analyticId: analyticId,
                property: 'filter',
                attributes: value
            }))
        } else {
            dispatch(updateAnalyticPropertyAttributes({
                analyticId: analyticId,
                property: 'filter',
                attributes: [value]
            }))
        }
    }

    const onRemove = (dispatch, analyticId) => dispatch(removeAnalyticProperty({
        analyticId: analyticId,
        property: 'filter',
    }))

    function View(props) {
        const {analyticId, filter, categories, dispatch} = props
        return (
            <div className={"analytics-filter-param param-row"}>
                <div className={"param-item"}>
                    <IconButton size={"small"} aria-label="remove"
                                onClick={() => onRemove(dispatch, analyticId)}>
                        <RemoveCircleOutline/>
                    </IconButton>
                </div>
                <div className={"param-item"}>
                    <ConditionParam categories={categories} {...filter} otherProps={props.otherProps}
                                    onPropertyChange={(value) => onPropertyChange(dispatch, analyticId, value)}/>
                </div>
            </div>
        )
    }

    function mapStateToProps(state: State, {analyticId}) {

        return {
            analyticId,
            filter: state.analytics.items[analyticId].filter,
            categories: state.scope.filterColumnIds,
            otherProps
        }
    }

    function mapDispatchToProps(dispatch,) {

        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const FilterParam = _filterParam()

const _filterToolbox = () => {
    const label = "Add Filter"
    const placeholder = "Filter Name..."

    const render = ({id, analyticId}) => {
        if (id && id.length > 0) {
            return (
                <div key={"filter"} className={"param-group"}>
                    <FilterParam analyticId={analyticId}/>
                </div>)
        } else {
            return (
                <div key={"filter"} className={"param-group"}>

                </div>)
        }
    }

    const add = ({analyticId, dispatch, name}) => {
        dispatch(updateAnalyticPropertyAttributes({
            analyticId: analyticId,
            property: 'filter',
            attributes: [{name: 'filterId', value: name}]
        }))
    }

    function mapStateToProps(state: State, {analyticId}) {
        const filter = state.analytics.items[analyticId].filter

        return {analyticId, ids: filter ? [filter.filterId] : [], label, placeholder, add, render,}
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(NamedObjectGroup)
}

export const FilterToolbox = _filterToolbox()
