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
import type {Analytics, Grid, GridPosition} from "./analyticsModel";
import {
    addItem,
    addPropertyItem,
    removeItem,
    removePropertyItem, removePropertyValue,
    updateItem,
    updateItemValue, updateOrCreateProperty,
    updateProperty,
    updatePropertyItem,
    updatePropertyValue
} from "../normalized";
import {
    fetchPostAnalytic,
    fetchDeleteAnalytic,
    fetchPutAnalytic,
    fetchPutGrid, fetchGetAnalytics, fetchGetGrid,
} from "./api/dashboardAPI";


export const DEFAULT_ANALYTICS: Analytics = {
    status: 'idle',
    ids: [],
    items: {},
    grid: {
        layouts: {lg: []}
    }
}

export const saveLayout = createAsyncThunk(
    'settings/fetchPutGrid',
    async (arg: {}, thunkAPI) => {

        return fetchPutGrid(thunkAPI.getState().dashboard.dashboardId, thunkAPI.getState().analytics.grid)
    })

export const addAnalytic = createAsyncThunk(
    'analytics/fetchPostAnalytic',
    async (arg, thunkAPI) => {

        return fetchPostAnalytic(thunkAPI.getState().dashboard.dashboardId)
    }
)

export const updateAnalytic = createAsyncThunk(
    'analytics/fetchPutAnalytic',
    async (arg: { analyticId: string }, thunkAPI) => {

        const data = thunkAPI.getState().analytics.items[arg.analyticId]

        return fetchPutAnalytic(thunkAPI.getState().dashboard.dashboardId, arg.analyticId, data)
    }
)
export const removeAnalytic = createAsyncThunk(
    'analytics/fetchDeleteAnalytic',
    async (arg: { analyticId: string }, thunkAPI) => {

        return fetchDeleteAnalytic(thunkAPI.getState().dashboard.dashboardId, arg.analyticId)
    }
)

export const loadAnalytics = createAsyncThunk(
    'analytics/fetchGetAnalytic',
    async (arg: { dashboardId: string }, thunkAPI) => {

        return fetchGetAnalytics(arg.dashboardId)
    }
)

export const loadLayouts = createAsyncThunk(
    'analytics/fetchGetGrid',
    async (arg: { dashboardId: string }, thunkAPI) => {

        return fetchGetGrid(arg.dashboardId)
    }
)

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {...DEFAULT_ANALYTICS},
    reducers: {
        addTableParameter: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, label: string }>) => {
                const analyticId = action.payload.analyticId
                const label = action.payload.label
                const parameterId = label.toLowerCase().replace(/\s/g, '')// use label to avoid duplicates
                const initValue = {
                    title: "",
                    label: label,
                    legend: "",
                    description: "",
                    parameterId: parameterId,
                    type: "A",
                    value: "",
                    top: 10,
                    valid: false
                }
                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'table', draftTable => {
                        addPropertyItem(draftTable, 'parameters', parameterId, initValue)
                    })
                })
            }
        },

        removeTableParameter: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, parameterId: string }>) => {
                const analyticId = action.payload.analyticId
                const parameterId = action.payload.parameterId

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'table', draftTable => {
                        removePropertyItem(draftTable, 'parameters', parameterId)
                    })
                })
            }
        },

        updateTableProperty: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, property: string, value: any }>) => {
                const analyticId = action.payload.analyticId
                const property = action.payload.property
                const value = action.payload.value

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'table', draftTable => {
                        updatePropertyValue(draftTable, property, value)
                    })
                })
            }
        },

        updateTableParameterProperty: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, parameterId: string, property: string, value: any }>) => {
                const parameterId = action.payload.parameterId
                const analyticId = action.payload.analyticId
                const property = action.payload.property
                const value = action.payload.value

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'table', draftTable => {
                        updatePropertyItem(draftTable, 'parameters', parameterId, draftParameter => {
                            updatePropertyValue(draftParameter, property, value)
                        })
                    })
                })
            }
        },

        updateTableParameterProperties: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, parameterId: string, properties: [{ name: string, value: any }] }>) => {
                const parameterId = action.payload.parameterId
                const analyticId = action.payload.analyticId
                const properties = action.payload.properties

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'table', draftTable => {
                        updatePropertyItem(draftTable, 'parameters', parameterId, draftParameter => {
                            properties.forEach(property => {
                                updatePropertyValue(draftParameter, property.name, property.value)
                            })
                        })
                    })
                })
            }
        },

        addChartParameter: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, label: string }>) => {
                const analyticId = action.payload.analyticId
                const label = action.payload.label
                const parameterId = label.toLowerCase().replace(/\s/g, '')// use label to avoir duplicates
                const initialValue = {
                    label,
                    title: "",
                    legend: "",
                    description: "",
                    parameterId,
                    type: "A",
                    value: "",
                    top: 10,
                    valid: false
                }

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'chart', draftChart => {
                        addPropertyItem(draftChart, 'parameters', parameterId, initialValue)
                    })
                })
            }
        },

        removeChartParameter: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, parameterId: string }>) => {
                const analyticId = action.payload.analyticId
                const parameterId = action.payload.parameterId

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'chart', draftChart => {
                        removePropertyItem(draftChart, 'parameters', parameterId)
                    })
                })
            }
        },

        updateChartProperty: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, property: string, value: any }>) => {
                const analyticId = action.payload.analyticId
                const property = action.payload.property
                const value = action.payload.value

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'chart', draftChart => {
                        updatePropertyValue(draftChart, property, value)
                    })
                })
            }
        },

        updateChartParameterProperty: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, parameterId: string, property: string, value: any }>) => {
                const parameterId = action.payload.parameterId
                const analyticId = action.payload.analyticId
                const property = action.payload.property
                const value = action.payload.value

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'chart', draftChart => {
                        updatePropertyItem(draftChart, 'parameters', parameterId, draftParameter => {
                            draftParameter[property] = value
                        })
                    })
                })

                if (property === 'axis') {
                    updateItem(state, analyticId, draftAnalytic => {
                        updateProperty(draftAnalytic, 'chart', draftChart => {
                            updateProperty(draftChart, 'axis', draftAxis => {
                                const previousParameterId = draftAxis[value]
                                draftAxis[value] = parameterId
                                if (previousParameterId) {
                                    updateProperty(draftAnalytic, 'chart', draftChart => {
                                        updatePropertyItem(draftChart, 'parameters', previousParameterId, draftParameter => {
                                            delete draftParameter['axis']
                                        })
                                    })
                                }
                            })
                        })
                    })
                }
            }
        },

        updateChartParameterProperties: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, parameterId: string, properties: [{ name: string, value: any }] }>) => {
                const parameterId = action.payload.parameterId
                const analyticId = action.payload.analyticId
                const properties = action.payload.properties

                updateItem(state, analyticId, draftAnalytic => {
                    updateProperty(draftAnalytic, 'chart', draftChart => {
                        updatePropertyItem(draftChart, 'parameters', parameterId, draftParameter => {
                            properties.forEach(property => {
                                draftParameter[property.name] = property.value
                            })
                        })
                    })
                })
                properties.forEach(property => {
                    if (property.name === 'axis') {
                        updateItem(state, analyticId, draftAnalytic => {
                            updateProperty(draftAnalytic, 'chart', draftChart => {
                                updateProperty(draftChart, 'axis', draftAxis => {
                                    const previousParameterId = draftAxis[property.value]
                                    draftAxis[property.value] = parameterId
                                    if (previousParameterId) {
                                        updateProperty(draftAnalytic, 'chart', draftChart => {
                                            updatePropertyItem(draftChart, 'parameters', previousParameterId, draftParameter => {
                                                delete draftParameter['axis']
                                            })
                                        })
                                    }
                                })
                            })
                        })
                    }
                })
            }
        },

        updateAnalyticProperty: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, property: string, value: any }>) => {
                const analyticId = action.payload.analyticId
                const property = action.payload.property
                const value = action.payload.value
                updateItem(state, analyticId, draftAnalytic => {
                    updatePropertyValue(draftAnalytic, property, value)
                })
            }
        },

        removeAnalyticProperty: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, property: string, value: any }>) => {
                const analyticId = action.payload.analyticId
                const property = action.payload.property
                const value = action.payload.value
                updateItem(state, analyticId, draftAnalytic => {
                    removePropertyValue(draftAnalytic, property, value)
                })
            }
        },

        updateAnalyticPropertyAttributes: {
            reducer: (state: Analytics, action: PayloadAction<{ analyticId: string, property: string, attributes: [{ name: string, value: any }] }>) => {
                const analyticId = action.payload.analyticId
                const property = action.payload.property
                const attributes = action.payload.attributes
                updateItem(state, analyticId, draftAnalytic => {
                    updateOrCreateProperty(draftAnalytic, property, draftProperty => {
                        attributes.forEach(attribute => {
                            draftProperty[attribute.name] = attribute.value
                        })
                    }, {})
                })
            }
        },

        setLayouts: {
            reducer: (state: Analytics, action: PayloadAction<{ layouts: { [string]: GridPosition[] } }>) => {
                const layouts = action.payload.layouts
                for (let breakpoint of Object.keys(layouts)) {
                    state.grid.layouts[breakpoint] = [...layouts[breakpoint]]
                }
            }
        },
    },
    extraReducers: {
        [addAnalytic.pending]:
            (state: Analytics) => {
                state.status = 'loading'
            },
        [addAnalytic.fulfilled]:
            (state: Analytics, action: PayloadAction<{}>) => {
                state.status = 'idle'

                const analytic = action.payload
                const analyticId = analytic.analyticId

                addItem(state, analytic.analyticId, {...analytic, status: 'idle'})
                updateProperty(state, 'grid', draftGrid => {
                    // update layouts
                    const length = Object.keys(draftGrid.layouts).length
                    if (length === 0) {// add first width default
                        draftGrid.layouts['lg'] = [{x: 0, y: 0, w: 4, h: 2, minH: 2, minW: 4, i: analyticId}]
                        draftGrid.layouts['md'] = [{x: 0, y: 0, w: 4, h: 2, minH: 2, minW: 4, i: analyticId}]
                        draftGrid.layouts['sm'] = [{x: 0, y: 0, w: 4, h: 2, minH: 2, minW: 4, i: analyticId}]
                        draftGrid.layouts['xs'] = [{x: 0, y: 0, w: 4, h: 2, minH: 2, minW: 4, i: analyticId}]
                        draftGrid.layouts['xxs'] = [{x: 0, y: 0, w: 2, h: 2, minH: 2, minW: 2, i: analyticId}]
                    } else {// copy from previous
                        const layouts = draftGrid.layouts
                        for (let breakpoint of Object.keys(layouts)) {
                            let layout = layouts[breakpoint]
                            if (layout.length > 0) {
                                const previousPosition = layout[layout.length - 1]
                                draftGrid.layouts[breakpoint].push({...previousPosition, i: analyticId})
                            }
                        }
                    }
                })
            },
        [addAnalytic.rejected]:
            (state: Analytics) => {
                state.status = 'idle'
            },
        [updateAnalytic().pending]:
            (state: Analytics, action: { meta: { arg: { analyticId: string } } }) => {
                state.status = 'loading'

                updateItem(state, action.meta.arg.analyticId, draftAnalytic => draftAnalytic.status = 'loading')
            },
        [updateAnalytic.fulfilled]:
            (state: Analytics, action: PayloadAction<{}>) => {
                state.status = 'idle'
                // fetch does not add un referenced analytics this is why we filter based on state ids
                const analytic = action.payload

                updateItemValue(state, analytic.analyticId, {...analytic, status: 'idle'})
            },
        [updateAnalytic.rejected]:
            (state: Analytics, action: { meta: { arg: { analyticId: string } } }) => {
                state.status = 'idle'

                updateItem(state, action.meta.arg.analyticId, draftAnalytic => draftAnalytic.status = 'error')
            },
        [removeAnalytic.pending]:
            (state: Analytics, action: { meta: { arg: { analyticId: string } } }) => {
                state.status = 'loading'
                updateItem(state, action.meta.arg.analyticId, draftAnalytic => draftAnalytic.status = 'loading')
            },
        [removeAnalytic.fulfilled]:
            (state: Analytics, action: { meta: { arg: { analyticId: string } } }) => {
                state.status = 'idle'

                const analyticId = action.meta.arg.analyticId
                removeItem(state, analyticId)
                // update grid
                updateProperty(state, 'grid', draftGrid => {
                    for (let breakPoint of Object.keys(draftGrid.layouts)) {
                        draftGrid.layouts[breakPoint] = draftGrid.layouts[breakPoint].filter(item => item.i !== analyticId)
                    }
                })
            },
        [removeAnalytic.rejected]:
            (state: Analytics, action: { meta: { arg: { analyticId: string } } }) => {
                state.status = 'error'

                updateItem(state, action.meta.arg.analyticId, draftAnalytic => draftAnalytic.status = 'error')
            },
        [saveLayout.pending]: (state: Analytics) => {
            state.status = 'loading'
        },
        [saveLayout.fulfilled]: (state: Analytics, action: PayloadAction<Grid>) => {
            state.status = 'idle'

            state.grid = action.payload
        },
        [saveLayout.rejected]: (state: Analytics) => {
            state.status = 'error'
        },
        [loadAnalytics.pending]: (state: Analytics) => {
            state.status = 'init'
        },
        [loadAnalytics.fulfilled]: (state: Analytics, action: PayloadAction<Grid>) => {
            state.status = 'idle'
            const analytics = action.payload
            state.ids = analytics.ids || []
            state.items = analytics.items || {}
        },
        [loadAnalytics.rejected]: (state: Analytics) => {
            state.status = 'error'
        },
        [loadLayouts.pending]: (state: Analytics) => {
            state.status = 'init'
        },
        [loadLayouts.fulfilled]: (state: Analytics, action: PayloadAction<Grid>) => {
            state.status = 'idle'
            state.grid = {...state.grid, layouts: action.payload.layouts}
        },
        [loadLayouts.rejected]: (state: Analytics) => {
            state.status = 'error'
        }
    }
})
export const analyticsReducer = analyticsSlice.reducer

export const {
    updateTableProperty,
    addTableParameter,
    removeTableParameter,
    updateTableParameterProperty,
    updateTableParameterProperties,
    updateChartProperty,
    addChartParameter,
    removeChartParameter,
    updateChartParameterProperty,
    updateChartParameterProperties,
    updateAnalyticProperty,
    removeAnalyticProperty,
    updateAnalyticPropertyAttributes,
    setLayouts
} = analyticsSlice.actions