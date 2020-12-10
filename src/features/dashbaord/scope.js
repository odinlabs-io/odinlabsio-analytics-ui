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

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    addPropertyItem,
    removePropertyItem, updateOrCreateProperty,
    updateProperty, updatePropertyItem,
    updatePropertyValue
} from "../normalized";
import type {Scope} from "./scopeModel";
import {
    fetchGetScope,
    fetchPutScope
} from "./api/dashboardAPI";

export const DEFAULT_SCOPE: Scope = {
    status: 'idle', // 'loading', 'idle'
    scopeId: undefined,

    source: undefined,
    filter: undefined,
    columns: [],
    joins: {ids: [], items: {}},
    columnOptions: {ids: [], items: {}},
    sources: [],
    filters: [],
    filterColumnIds: [],
    categories: [],
    categoryColumnIds: [],
    measures: [],
    measureColumnIds: []
}


export const updateScope = createAsyncThunk(
    'scope/fetchPutScope',
    async (arg: {}, thunkAPI) => {
        const scope = thunkAPI.getState().scope

        return fetchPutScope(thunkAPI.getState().dashboard.dashboardId, scope)
    }
)

export const loadScope = createAsyncThunk(
    'scope/fetchGetScope',
    async (arg: { dashboardId: string }, thunkAPI) => {

        return fetchGetScope(arg.dashboardId)
    }
)

const scopeSlice = createSlice({
    name: 'scope',
    initialState: {...DEFAULT_SCOPE},
    reducers: {
        updateScopeProperty: {
            reducer: (state: Scope, action: PayloadAction<{ name: string, value: any }>) => {
                const {name, value} = action.payload
                updatePropertyValue(state, name, value)
            }
        },

        updateScopeFilterProperty: {
            reducer: (state: Scope, action: PayloadAction<{ attributes: [{ name: string, value: any }] }>) => {
                const {attributes} = action.payload
                updateOrCreateProperty(state, 'filter', draft => {
                    attributes.forEach(attribute => {
                        draft[attribute.name] = attribute.value
                    })
                }, {})
            }
        },

        removeScopePropertyItem: {
            reducer: (state: Scope, action: PayloadAction<{ name: string, itemId: string }>) => {
                const {name, itemId} = action.payload
                removePropertyItem(state, name, itemId)
            }
        },

        addJoinTable: {
            reducer: (state: Scope, action: PayloadAction<{ joinSourceId: string }>) => {
                const joinSourceId = action.payload.joinSourceId
                addPropertyItem(state, 'joins', joinSourceId, {
                    joinSourceId: joinSourceId,
                    onLeft: [],
                    onRight: [],
                    defaultValues: {}
                })
            }
        },

        removeJoinTable: {
            reducer: (state: Scope, action: PayloadAction<{ joinSourceId: string }>) => {
                removePropertyItem(state, 'joins', action.payload.joinSourceId)
            }
        },

        updateJoinTableOnRight: {
            reducer: (state: Scope, action: PayloadAction<{ joinSourceId: string, columns: [] }>) => {
                const joinsSourceId = action.payload.joinSourceId
                const columns = action.payload.columns
                updatePropertyItem(state, 'joins', joinsSourceId, draft => {
                    draft['onRight'] = columns
                })
            }
        },

        updateJoinTableOnLeft: {
            reducer: (state: Scope, action: PayloadAction<{ joinSourceId: string, columns: [] }>) => {
                const joinsSourceId = action.payload.joinSourceId
                const columns = action.payload.columns
                updatePropertyItem(state, 'joins', joinsSourceId, draft => {
                    updateProperty(draft, 'onLeft', leftDraft => {
                        const colIds = new Set(leftDraft.map(col => col.columnId))
                        columns.forEach(column => {
                            if (!colIds.has(column.columnId)) {
                                leftDraft.push(column)
                            }
                        })
                    })
                })
            }
        },

        updateJoinTableDefaultValues: {
            reducer: (state: Scope, action: PayloadAction<{ joinSourceId: string, defaultValues: { [string]: any } }>) => {
                const joinSourceId = action.payload.joinSourceId
                const defaultValues = action.payload.defaultValues
                updatePropertyItem(state, 'joins', joinSourceId, draft => {
                    updateProperty(draft, 'defaultValues', defaultDraft => {
                        Object.keys(defaultValues).forEach(columnId => {
                            defaultDraft[columnId] = defaultValues[columnId]
                        })
                    })
                })
            }
        }
    },
    extraReducers: {
        [updateScope.pending]: (state: Scope) => {
            state.status = 'loading'
        },
        [updateScope.fulfilled]: (state: Scope, action: PayloadAction<{}>) => {
            state = action.payload
            state.status = 'idle'
            return state
        },
        [updateScope.rejected]: (state: Scope) => {
            state.status = 'error'
        },
        [loadScope.pending]: (state: Scope) => {
            state.status = 'init'
        },
        [loadScope.fulfilled]: (state: Scope, action: PayloadAction<{}>) => {
            state = action.payload
            state.status = 'idle'
            return state
        },
        [loadScope.rejected]: (state: Scope) => {
            state.status = 'error'
        }
    }
})

export const {
    updateScopeProperty,
    updateScopeFilterProperty,
    removeScopePropertyItem,
    addJoinTable,
    removeJoinTable,
    updateJoinTableOnLeft,
    updateJoinTableOnRight,
    updateJoinTableDefaultValues
} = scopeSlice.actions

export const scopeReducer = scopeSlice.reducer