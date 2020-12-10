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

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {Dashboard} from "./dashboardModel";
import {fetchGetDashboards, fetchGetDashboardSettings, fetchPostDashboard} from "./api/dashboardAPI";
import {addPropertyItem} from "../normalized";

export const DEFAULT_DASHBOARD: Dashboard = {
    status: 'idle',
    dashboards: {ids: [], items: {}},
    settings: {
        chart: {
            typeOptions: []
        },
        grid: {
            cols: {},
            breakPoints: {},
        }
    },
}

export const loadDashboard = createAsyncThunk(
    'dashboard/fetchGetDashboardSettings',
    async (arg: { dashboardId: string }, thunkAPI) => {
        const dashboardId = arg.dashboardId

        return fetchGetDashboardSettings(dashboardId)
    }
)

export const getDashboards = createAsyncThunk(
    'dashboard/fetchGetDashboards',
    async (arg: {}, thunkAPI) => {

        return fetchGetDashboards()
    })

export const addDashboard = createAsyncThunk(
    'dashboard/fetchPostDashboard',
    async (arg: { dashboardTitle: string, dashboardDescription: string }, thunkAPI) => {
        const {dashboardTitle, dashboardDescription} = arg

        return fetchPostDashboard({dashboardTitle, dashboardDescription})
    }
)

const dashboardSettingsSlice = createSlice({
    name: 'settings',
    initialState: {...DEFAULT_DASHBOARD},
    reducers: {},
    extraReducers: {
        [loadDashboard.pending]: (state: Dashboard) => {
            state.status = 'init'
        },
        [loadDashboard.fulfilled]: (state: Dashboard, action: PayloadAction<{}>) => {
            state.settings = {...state.settings, ...action.payload}
            state.dashboardId = action.meta.arg.dashboardId
            state.status = 'idle'

        },
        [loadDashboard.rejected]: (state: Dashboard) => {
            state.status = 'error'
        },
        [getDashboards().pending]: (state: Dashboard) => {
            state.status = 'init'
        },
        [getDashboards.fulfilled]: (state: Dashboard, action: PayloadAction<{}>) => {
            state.dashboards = action.payload
            state.status = 'idle'

        },
        [getDashboards.rejected]: (state: Dashboard) => {
            state.status = 'error'
        },
        [addDashboard().pending]: (state: Dashboard) => {
            state.status = 'init'
        },
        [addDashboard.fulfilled]: (state: Dashboard, action: PayloadAction<{}>) => {
            const dashboard = action.payload
            addPropertyItem(state, 'dashboards', dashboard.dashboardId, dashboard)
            state.status = 'idle'
        },
        [addDashboard.rejected]: (state: Dashboard) => {
            state.status = 'error'
        }
    }
})

export const dashboardSettingsReducer = dashboardSettingsSlice.reducer