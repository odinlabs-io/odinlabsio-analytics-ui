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

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {connect} from "react-redux";
import {DeletableItem} from "../components/Items";
import type {State} from "../app/store";
import {
    addJoinTable,
    updateJoinTableOnLeft,
    updateJoinTableOnRight,
    updateJoinTableDefaultValues,
    removeJoinTable,
} from "./dashbaord/scope";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const _join = () => {
    const onRemove = (dispatch, joinSourceId) => {
        dispatch(removeJoinTable({joinSourceId}))
    }

    const onChangeJoinLeft = (dispatch, joinSourceId, value) => {
        console.log('change left', value)
        dispatch(updateJoinTableOnLeft({
            joinSourceId,
            columns: value,
        }))
    }

    const onChangeJoinRight = (dispatch, joinSourceId, value) => {
        dispatch(updateJoinTableOnRight({
            joinSourceId,
            columns: value,
        }))
    }

    const onSaveDefaultValues = (dispatch, joinSourceId, values) => {
        dispatch(updateJoinTableDefaultValues({
            joinSourceId,
            defaultValues: values
        }))
    }


    function View(props) {
        const {sourceId, joinSourceId, onLeft, onLeftColumnOptions, onRight, onRightColumnOptions, defaultValues, dispatch} = props
        const [currentDefaultValues, setCurrentDefaultValues] = useState(defaultValues)

        const onChangeDefaultValues = (column, value) => {
            const values = {...currentDefaultValues}
            values[column] = value
            setCurrentDefaultValues(values)
        }

        const item = () => {
            return (
                <div data-param-valid={sourceId !== joinSourceId} className={"param-group"} >
                    <div className={"param-row"}>
                        <div className={"param-item"}>
                            <Typography variant="overline" display="block" gutterBottom>{joinSourceId}</Typography>
                        </div>
                    </div>
                    <div className={"param-row"}>
                        <div className={"param-item"}>
                            <Autocomplete
                                size={"small"}
                                multiple
                                options={onLeftColumnOptions}
                                getOptionLabel={(column) => column.columnId}
                                value={onLeft}
                                getOptionSelected={(option, value) => option.columnId === value.columnId}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={"On"}
                                        placeholder="Columns..."
                                    />
                                )}
                                onChange={(event, values) => onChangeJoinLeft(
                                    dispatch, joinSourceId, values
                                )}
                            />
                        </div>
                        <div className={"param-item"}>
                            <Autocomplete
                                size={"small"}
                                multiple
                                options={onRightColumnOptions}
                                getOptionLabel={(column) => column.columnId}
                                value={onRight}
                                getOptionSelected={(option, value) => option.columnId === value.columnId}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={`On ${joinSourceId}`}
                                        placeholder="Columns..."
                                    />
                                )}
                                onChange={(event, values) => onChangeJoinRight(dispatch,
                                    joinSourceId, values)}
                            />
                        </div>
                    </div>
                    <div className={"param-arg-items"}>
                        <div className={"param-arg-item"}>
                            <Typography variant="body2">Default Values</Typography>
                            <Button color="primary"
                                    onClick={() => onSaveDefaultValues(dispatch, joinSourceId, currentDefaultValues)}>Save</Button>
                        </div>
                        {onRightColumnOptions.map(option =>
                            <div key={option.columnId} className={"param-arg-item"}>
                                <TextField size={"small"}
                                           label={option.columnId}
                                           value={currentDefaultValues[option.columnId]}
                                           defaultValue={currentDefaultValues[option.columnId]}
                                           onChange={(event) => onChangeDefaultValues(option.columnId, event.target.value)}/>
                            </div>)}
                    </div>
                </div>
            )
        }

        return (<DeletableItem item={item} onDelete={() => onRemove(dispatch, joinSourceId)}/>)
    }

    function mapStateProps(state: State, {joinSourceId}) {
        const join = state.scope.joins.items[joinSourceId]
        const source = state.scope.source
        if (source && source.sourceId !== joinSourceId) {
            return {
                sourceId: source.sourceId,
                joinSourceId,
                onLeft: join.onLeft,
                onLeftColumnOptions: state.scope.columnOptions.items[source.sourceId],
                onRight: join.onRight,
                onRightColumnOptions: state.scope.columnOptions.items[joinSourceId],
                defaultValues: join.defaultValues
            }
        } else {
            return {
                sourceId: source.sourceId,
                joinSourceId,
                onLeft: [],
                onLeftColumnOptions: [],
                onRight: [],
                onRightColumnOptions: [],
                defaultValues: {}
            }
        }
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateProps, mapDispatchToProps)(View)
}

const Join = _join()

const _joins = () => {

    const onUpdateJoin = (dispatch, currentJoinSourceIds, addedJoinSourceIds) => {
        addedJoinSourceIds.forEach(joinSourceId => {
            if (!currentJoinSourceIds.has(joinSourceId)) {
                dispatch(addJoinTable({joinSourceId: joinSourceId}))
            }
        })
    }

    function View(props) {
        const {joinSourceIdOptions, joinSourceIds, dispatch} = props

        const current = new Set(joinSourceIds)

        return (
            <React.Fragment>
                <div className={"param-group"}>
                    <div className={"param-row"}>
                        <div className={"param-item"}>
                            <Autocomplete
                                size={"small"}
                                multiple
                                options={joinSourceIdOptions}
                                getOptionLabel={(joinSourceId) => joinSourceId}
                                value={joinSourceIds}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Sources"
                                        placeholder="..."
                                    />
                                )}
                                onChange={(event, value) => onUpdateJoin(dispatch, current, value)}
                            />
                        </div>
                    </div>
                </div>
                {joinSourceIds.map(joinSourceId => (<Join key={joinSourceId} joinSourceId={joinSourceId}/>))}
            </React.Fragment>
        )
    }

    function mapStateToProps(state: State) {

        return {
            joinSourceIdOptions: state.scope.columnOptions.ids,
            joinSourceIds: state.scope.joins.ids
        }
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

export const AnalyticsScopeJoinDataSource = _joins()