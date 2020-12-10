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

import './css/AnalyticsScope.scss';

import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import type {State} from "../app/store";
import {
    updateScope, updateScopeFilterProperty,
    updateScopeProperty
} from "./dashbaord/scope";
import {ConditionParam} from "../components/ConditionParam";
import {AnalyticsScopeJoinDataSource} from "./AnalyticsScopeJoin";


const _mainSourceFilterParam = () => {
    const otherProps = {helperText: "Scope filter...", multiline: true, freeSolo: "true"}

    const onPropertyChange = (dispatch, value) => {
        if (value instanceof Array) {
            dispatch(updateScopeFilterProperty({
                property: 'filter',
                attributes: [...value, {name: 'filterId', value: 'Filter Data Source'}]
            }))
        } else {
            dispatch(updateScopeFilterProperty({
                property: 'filter',
                attributes: [value]
            }))
        }
    }

    function View(props) {
        const {categories, filter, dispatch} = props

        return (<ConditionParam categories={categories}
                                {...filter}
                                otherProps={props.otherProps}
                                onPropertyChange={(value) => onPropertyChange(dispatch, value)}/>)
    }

    function mapStateToProps(state: State) {

        return {
            categories: state.scope.filterColumnIds, filter: state.scope.filter, otherProps
        }
    }

    function mapDispatchToProps(dispatch) {

        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const MainSourceFilterParam = _mainSourceFilterParam()

const _analyticsScopeMainDataSource = () => {
    const onChangeSource = (dispatch, value) => dispatch(updateScopeProperty({name: 'source', value}))
    const onChangeColumns = (dispatch, value) => dispatch(updateScopeProperty({name: 'columns', value}))

    function View(props) {
        const {source, sourceOptions, columns, columnOptions, dispatch} = props

        return (
            <div className={"param-group"}>
                <div className="param-row">
                    <div className={"param-item"}>
                        <Autocomplete
                            size={"small"}
                            options={sourceOptions}
                            getOptionLabel={(source) => source.sourceId}
                            value={source}
                            defaultValue={source}
                            getOptionSelected={(option, value) => option.sourceId === value.sourceId}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Sources"
                                    placeholder="..."
                                />
                            )}
                            onChange={(event, value) => onChangeSource(dispatch, value)}
                        />
                    </div>
                    <div className={"param-item"}>
                        <MainSourceFilterParam/>
                    </div>
                </div>
                <div className="param-row">
                    <div className={"param-item"}>
                        <Autocomplete
                            size={"small"}
                            multiple
                            options={columnOptions}
                            getOptionLabel={(column) => column.columnId}
                            value={columns}
                            defaultValue={columns}
                            getOptionSelected={(option, value) => option.columnId === value.columnId}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Columns"
                                    placeholder="Analytics Columns"
                                />
                            )}
                            onChange={(event, value) => onChangeColumns(dispatch, value)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    function mapStateToProps(state: State) {
        const source = state.scope.source

        return {
            source,
            sourceOptions: state.scope.sources,
            columns: state.scope.columns,
            columnOptions: source && source.sourceId ? state.scope.columnOptions.items[source.sourceId] : []
        }
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const AnalyticsScopeMainDataSource = _analyticsScopeMainDataSource()

export function AnalyticsScope() {
    const status = useSelector(state => state.scope.status)
    const dashboardId = useSelector(state => state.dashboard.dashboardId)

    const dispatch = useDispatch()

    const onSubmitScope = () => {
        dispatch(updateScope())
    }

    // load button
    const submitBtn = (status) => {
        if (status === 'loading') {
            return <Button type="button" color="primary">Loading...</Button>
        } else {
            return <Button type="button" color="primary" onClick={onSubmitScope}>Load</Button>
        }
    }

    return (
        <div className="analytics-scope">
            {dashboardId && <React.Fragment>
                <div className="analytics-scope-header">
                    <Typography variant="h6">Data Sources</Typography>
                    {submitBtn(status)}
                </div>
                <Paper className="analytics-scope-data-source">
                    <Paper id="main-data-source" className="analytics-scope-data-source-configuration"
                           variant="outlined">
                        <Typography variant="overline" display="block" gutterBottom>Main Table</Typography>
                        <AnalyticsScopeMainDataSource/>
                    </Paper>
                    <Paper id="join-data-source" className="analytics-scope-data-source-configuration"
                           variant="outlined">
                        <Typography variant="overline" display="block" gutterBottom>Join Table</Typography>
                        <AnalyticsScopeJoinDataSource/>
                    </Paper>
                </Paper>
            </React.Fragment>}
        </div>
    )
}