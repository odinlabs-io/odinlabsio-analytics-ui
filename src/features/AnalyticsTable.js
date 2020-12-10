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
import type {State} from "../app/store";
import {connect} from "react-redux";
import {
    addTableParameter,
    removeTableParameter,
    updateTableParameterProperties,
    updateTableParameterProperty,
    updateTableProperty
} from "./dashbaord/analytics";

import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import {FilterToolbox} from "./AnalyticsFilter";
import {AggregationParameter} from "../components/AggregationParameter";
import {NamedObjectGroup} from "../components/ParameterGroup";
import {AnalyticsContent, EditableAnalyticsContent} from "./AnalyticContentLoader";

const _tableColumns = () => {
    const onPropertyChange = (dispatch, analyticId, parameterId, value) => {
        if (value instanceof Array) {
            dispatch(updateTableParameterProperties({
                analyticId: analyticId,
                parameterId: parameterId,
                properties: value,
            }))
        } else {
            dispatch(updateTableParameterProperty({
                analyticId: analyticId,
                parameterId: parameterId,
                property: value.name,
                value: value.value
            }))
        }
    }

    const onRemove = (dispatch, analyticId, parameterId) => {
        dispatch(removeTableParameter({analyticId: analyticId, parameterId: parameterId}))
    }

    function View(props) {
        const {analyticId, parameterId, measures, categories, parameter, dispatch} = props

        return (
            <div className={"analytics-aggregation-param param-row"}>
                <AggregationParameter measures={measures}
                                      categories={categories}
                                      {...parameter}
                                      onRemove={() => onRemove(dispatch, analyticId, parameterId)}
                                      onPropertyChange={(value) => onPropertyChange(dispatch, analyticId, parameterId, value)}
                                      otherProps={{multiline: "true", freeSolo: "true"}}/>
            </div>)
    }

    function mapStateToProps(state: State, {analyticId, parameterId}) {
        const analytic = state.analytics.items[analyticId]

        return {
            analyticId,
            parameterId,
            measures: state.scope.measureColumnIds,
            categories: state.scope.categoryColumnIds,
            parameter: analytic.table.parameters.items[parameterId],
        }
    }

    function mapDispatchToProps(dispatch) {

        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const TableColumns = _tableColumns()

const _tableParametersToolbox = () => {
    const toolboxLabel = "Add Aggregate or Axis"
    const placeholder = "Name..."

    const render = ({key, id, analyticId}) => (<TableColumns key={key} analyticId={analyticId} parameterId={id}/>)
    const add = ({analyticId, dispatch, name}) => {
        dispatch(addTableParameter({analyticId: analyticId, label: name}))
    }

    function mapStateToProps(state: State, {analyticId}) {
        const ids = state.analytics.items[analyticId].table.parameters.ids

        return {analyticId, ids, toolboxLabel, placeholder, render, add}
    }

    function mapDispatchToProps(dispatch) {

        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(NamedObjectGroup)
}

const TableParametersToolbox = _tableParametersToolbox()

export const TableToolbox = ({analyticId}) => {
    return (
        <React.Fragment>
            <Paper variant="outlined"
                   style={{"padding": "4px", "margin": "4px", "display": "flex", "flexDirection": "column"}}>
                <Typography variant="overline" display="block" gutterBottom>Filters</Typography>
                <FilterToolbox analyticId={analyticId}/>
            </Paper>
            <Paper variant="outlined"
                   style={{"padding": "4px", "margin": "4px", "display": "flex", "flexDirection": "column"}}>
                <Typography variant="overline" display="block" gutterBottom>Aggregation</Typography>
                <TableParametersToolbox analyticId={analyticId}/>
            </Paper>
        </React.Fragment>
    )
}

const _editableTableContentView = () => {
    const updateTitle = (dispatch, analyticId, title) => {
        dispatch(updateTableProperty({
            analyticId: analyticId,
            property: 'title',
            value: title
        }))
    }

    const updateLegend = (dispatch, analyticId, title) => {
        dispatch(updateTableProperty({
            analyticId: analyticId,
            property: 'legend',
            value: title
        }))
    }

    const updateDescription = (dispatch, analyticId, title) => {
        dispatch(updateTableProperty({
            analyticId: analyticId,
            property: 'description',
            value: title
        }))
    }

    function View(props) {
        const {analyticId, dispatch} = props
        return (
            <EditableAnalyticsContent {...props} updateTitle={(value) => updateTitle(dispatch, analyticId, value)}
                                      updateLegend={(value) => updateLegend(dispatch, analyticId, value)}
                                      updateDescription={(value) => updateDescription(dispatch, analyticId, value)}/>)
    }

    function mapStateToProps(state: State, {analyticId}) {
        const analytic = state.analytics.items[analyticId]

        return {
            dashboardId: state.dashboard.dashboardId,
            analyticId: analytic.analyticId,
            analyticVersion: analytic.version,
            status: analytic.status,
            title: analytic.table.title,
            legend: analytic.table.legend,
            description: analytic.table.description
        }
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const EditableTableContentView = _editableTableContentView()

const _tableContentView = () => {

    function mapStateToProps(state: State, {analyticId}) {
        const analytic = state.analytics.items[analyticId]

        return {
            dashboardId: state.dashboard.dashboardId,
            analyticId: analytic.analyticId,
            analyticVersion: analytic.version,
            status: analytic.status,
            title: analytic.table.title,
            legend: analytic.table.legend,
            description: analytic.table.description
        }
    }

    return connect(mapStateToProps)(AnalyticsContent)
}

const TableContentView = _tableContentView()

export const _tablePreview = ({editable}) => {

    function View(props) {
        const {analyticId} = props

        if (editable) {
            return <EditableTableContentView analyticId={analyticId}/>
        } else {
            return <TableContentView analyticId={analyticId}/>
        }
    }

    return View
}

export const TablePreview = _tablePreview({editable: false})