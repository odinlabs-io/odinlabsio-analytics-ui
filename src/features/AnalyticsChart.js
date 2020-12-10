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
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import type {State} from "../app/store";
import {
    addChartParameter,
    removeChartParameter,
    updateChartProperty,
    updateChartParameterProperty, updateChartParameterProperties
} from "./dashbaord/analytics";
import {connect} from "react-redux";
import {FilterToolbox} from "./AnalyticsFilter";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {AggregationParameter} from "../components/AggregationParameter";
import {NamedObjectGroup} from "../components/ParameterGroup";
import {AnalyticsContent, EditableAnalyticsContent} from "./AnalyticContentLoader";


const _chartParameter = () => {
    const onPropertyChange = (dispatch, analyticId, parameterId, value) => {
        if (value instanceof Array) {
            dispatch(updateChartParameterProperties({
                analyticId: analyticId,
                parameterId: parameterId,
                properties: value,
            }))
        } else {
            dispatch(updateChartParameterProperty({
                analyticId: analyticId,
                parameterId: parameterId,
                property: value.name,
                value: value.value
            }))
        }
    }

    const onRemove = (dispatch, analyticId, parameterId) => {
        dispatch(removeChartParameter({analyticId: analyticId, parameterId: parameterId}))
    }

    function View(props) {
        const {analyticId, parameterId, measures, categories, parameter, axis, dispatch} = props

        return (
            <div className={"analytics-aggregation-param param-row"}>
                <AggregationParameter measures={measures}
                                      categories={categories}
                                      {...parameter}
                                      onRemove={() => onRemove(dispatch, analyticId, parameterId)}
                                      onPropertyChange={(value) => onPropertyChange(dispatch, analyticId, parameterId, value)}
                                      otherProps={{multiline: "true", freeSolo: "true"}}/>
                <div className={"param-item"}>
                    <TextField size={"small"} select label="Axis"
                               value={axis[parameter.axis] === parameter.parameterId ? parameter.axis : ""}
                               onChange={(event, value) => {
                                   onPropertyChange(dispatch, analyticId, parameterId, {
                                       name: 'axis',
                                       value: value.props.value
                                   })
                               }}>
                        <MenuItem key="X" value="X">
                            {"X"}
                        </MenuItem>
                        <MenuItem key="Y" value="Y">
                            {"Y"}
                        </MenuItem>
                        <MenuItem key="Z" value="Z">
                            {"Z"}
                        </MenuItem>
                        <MenuItem key="T" value="T">
                            {"T"}
                        </MenuItem>
                        <MenuItem key="P" value="P">
                            {"P"}
                        </MenuItem>
                        <MenuItem key="None" value="">
                            {""}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>)
    }

    function mapStateToProps(state: State, {analyticId, parameterId}) {
        const analytic = state.analytics.items[analyticId]

        return {
            analyticId,
            parameterId,
            measures: state.scope.measureColumnIds,
            categories: state.scope.categoryColumnIds,
            parameter: analytic.chart.parameters.items[parameterId],
            axis: analytic.chart.axis,
        }
    }

    function mapDispatchToProps(dispatch) {

        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const ChartParameter = _chartParameter()

const _chartParametersToolbox = () => {
    const toolboxLabel = "Add Aggregate or Axis"
    const placeholder = "Name..."

    const render = ({key, id, analyticId}) => (<ChartParameter key={key} analyticId={analyticId} parameterId={id}/>)
    const add = ({analyticId, dispatch, name}) => {
        dispatch(addChartParameter({analyticId: analyticId, label: name}))
    }

    function mapStateToProps(state: State, {analyticId}) {
        const ids = state.analytics.items[analyticId].chart.parameters.ids

        return {analyticId, ids, toolboxLabel, placeholder, render, add}
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(NamedObjectGroup)
}

const ChartParametersToolbox = _chartParametersToolbox()

const _chartOptionsToolbox = () => {
    const updateChartType = (dispatch, analyticId, chartType) => {
        dispatch(updateChartProperty({
            analyticId: analyticId,
            property: 'type',
            value: chartType
        }))
    }

    function View({analyticId, chartOptions, chartType, dispatch}) {

        return (
            <div className={"param-group"}>
                <div className={"param-row"}>
                    <div className={"param-item"}>
                        <FormControl component="fieldset">
                            <RadioGroup row
                                        aria-label="chart-type" name="chart-type-selector"
                                        value={chartType}
                                        onChange={(event) => updateChartType(dispatch, analyticId, event.target.value)}>
                                {Object.keys(chartOptions).map(key => (
                                    <FormControlLabel key={key} value={key}
                                                      control={<Radio color={"default"} size={"small"}/>}
                                                      label={chartOptions[key]}/>))
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>)
    }

    function mapStateToProps(state: State, {analyticId}) {
        const chart = state.analytics.items[analyticId].chart

        return {
            analyticId,
            chartOptions: state.dashboard.settings.chart.typeOptions,
            chartType: chart.type,
        }
    }

    function mapDispatchToProps(dispatch) {

        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const ChartOptionsToolbox = _chartOptionsToolbox()

export const ChartToolbox = ({analyticId}) => {
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
                <ChartParametersToolbox analyticId={analyticId}/>
            </Paper>
            <Paper variant="outlined"
                   style={{"padding": "4px", "margin": "4px", "display": "flex", "flexDirection": "column"}}>
                <Typography variant="overline" display="block" gutterBottom>Chart</Typography>
                <ChartOptionsToolbox analyticId={analyticId}/>
            </Paper>
        </React.Fragment>
    )
}

const _editableChartContentView = () => {
    const updateTitle = (dispatch, analyticId, title) => dispatch(updateChartProperty({
        analyticId: analyticId,
        property: 'title',
        value: title
    }))
    const updateLegend = (dispatch, analyticId, legend) => dispatch(updateChartProperty({
        analyticId: analyticId,
        property: 'legend',
        value: legend
    }))
    const updateDescription = (dispatch, analyticId, description) => dispatch(updateChartProperty({
        analyticId: analyticId,
        property: 'description',
        value: description
    }))

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
            title: analytic.chart.title,
            legend: analytic.chart.legend,
            description: analytic.chart.description
        }
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const EditableChartContentView = _editableChartContentView()

const _chartContentView = () => {

    function mapStateToProps(state: State, {analyticId}) {
        const analytic = state.analytics.items[analyticId]

        return {
            dashboardId: state.dashboard.dashboardId,
            analyticId: analytic.analyticId,
            analyticVersion: analytic.version,
            status: analytic.status,
            title: analytic.chart.title,
            legend: analytic.chart.legend,
            description: analytic.chart.description
        }
    }

    return connect(mapStateToProps)(AnalyticsContent)
}

const ChartContentView = _chartContentView()

export const _chartPreview = ({editable}) => {

    function View(props) {
        const {analyticId} = props

        if (editable) {
            return <EditableChartContentView analyticId={analyticId}/>
        } else {
            return <ChartContentView analyticId={analyticId}/>
        }
    }

    return View
}

export const ChartPreview = _chartPreview({editable: false})