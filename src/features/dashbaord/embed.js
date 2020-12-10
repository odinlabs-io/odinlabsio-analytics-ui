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

import type {Embed, Embeds} from "./embedModel";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addItem, updateItem, updateItemValue} from "../normalized";
import {fetchGetEmbed} from "./api/dashboardAPI";

export const DEFAULT_EMBEDS: Embeds = {
    ids: [],
    items: {}
}

/**
 *  const breakPoints = dashboard.settings.grid.breakPoints

 let layout;
 let breakPoint;
 const layouts = thunkAPI.getState().analytics.grid.layouts
 for (let x of Object.keys(breakPoints)) {
            layout = layouts[x]
            if (layout) {
                breakPoint = x
                break;
            }
        }

 if (layout) {
            const size = layout.filter(l => l.i === analyticId)[0]
            query['maxX'] = dashboard.settings.grid.breakPoints[breakPoint] * size['w']
            query['maxY'] = dashboard.settings.grid.rowHeight * size['h']
        }
 * @type {AsyncThunk<*, {analyticId: string, type: string}, {}>}
 */
export const getEmbed = createAsyncThunk(
    'embeds/fetch',
    async (arg: { analyticId: string, type: string }, thunkAPI) => {
        const analyticId = arg.analyticId
        const type = arg.type

        const dashboard = thunkAPI.getState().dashboard

        const dashboardId = dashboard.dashboardId
        const query = {'type': type}

        return fetchGetEmbed(dashboardId, analyticId, query)
    }
)

const embedsSlice = createSlice({
    name: 'embeds',
    initialState: {...DEFAULT_EMBEDS},
    reducers: {},
    extraReducers: {
        [getEmbed.pending]:
            (state, action: { meta: { arg: { analyticId: string } } }) => {
                updateItem(state, action.meta.arg.analyticId, draftEmbed => {
                    draftEmbed.status = 'loading'
                })
                state.status = 'loading'
            },
        [getEmbed.fulfilled]:
            (state, action: PayloadAction<Embed>) => {
                const embed = action.payload

                addItem(state, action.meta.arg.analyticId, {...embed, status: 'idle'})
                updateItemValue(state, action.meta.arg.analyticId, {...embed, status: 'idle'})

                state.status = 'idle'
            },
        [getEmbed.rejected]:
            (state, action: { meta: { arg: { analyticId: string } } }) => {
                updateItem(state, action.meta.arg.analyticId, draftEmbed => {
                    draftEmbed.status = 'error'
                })
                state.status = 'idle'
            },
    }
})

export const embedsReducer = embedsSlice.reducer