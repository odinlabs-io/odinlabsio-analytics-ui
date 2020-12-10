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

import {
    addAnalytic,
    removeAnalytic,
    removeChartParameter, removeTableParameter, updateAnalytic, updateAnalyticPropertyAttributes,
    updateChartParameterProperties,
    updateChartParameterProperty,
    updateChartProperty, updateTableParameterProperties, updateTableParameterProperty, updateTableProperty,
} from "../analytics";
import {barrier, getStore} from "./data";


jest.mock('../api/dashboardAPI')


test('analytic pre loaded state', () => {
    const store = getStore()

    const ids = store.getState().analytics.ids
    const items = store.getState().analytics.items

    expect(ids.length).toBe(1)
    expect(items[ids[0]].analyticId).toBe(ids[0])
})

test('update analytic filter', () => {
    const store = getStore()

    const ids = store.getState().analytics.ids

    const analyticId = ids[0]
    store.dispatch(updateAnalyticPropertyAttributes({
        analyticId,
        property: 'filter',
        attributes: [{name: 'filterId', value: 'filterID'}, {name: 'name', value: 'filter name'}]
    }))

    expect(store.getState().analytics.items[analyticId].filter.filterId).toBe('filterID')

    store.dispatch(updateAnalyticPropertyAttributes({
        analyticId,
        property: 'filter',
        attributes: [{name: 'value', value: 'filter expression'}, {name: 'valid', value: false}]
    }))

    expect(store.getState().analytics.items[analyticId].filter.filterId).toBe('filterID')
    expect(store.getState().analytics.items[analyticId].filter.value).toBe('filter expression')
    expect(store.getState().analytics.items[analyticId].filter.valid).toBe(false)
})

test('update chart parameter', () => {
    const store = getStore()

    const ids = store.getState().analytics.ids

    const analyticId = ids[0]

    store.dispatch(updateChartProperty({
        analyticId,
        property: 'legend',
        value: 'chart legend'
    }))

    expect(store.getState().analytics.items[analyticId].chart.legend).toBe('chart legend')

    const parameterId = store.getState().analytics.items[analyticId].chart.parameters.ids[0]

    store.dispatch(updateChartParameterProperty({
        analyticId,
        parameterId,
        property: 'value',
        value: 'param value'
    }))

    expect(store.getState().analytics.items[analyticId].chart.parameters.items[parameterId].value).toBe('param value')

    store.dispatch(updateChartParameterProperties({
        analyticId,
        parameterId,
        properties: [{name: 'value', value: 'new value'}, {name: 'valid', value: false}]
    }))

    expect(store.getState().analytics.items[analyticId].chart.parameters.items[parameterId].value).toBe('new value')
    expect(store.getState().analytics.items[analyticId].chart.parameters.items[parameterId].valid).toBe(false)

    store.dispatch(removeChartParameter(
        {
            analyticId,
            parameterId
        }))

    expect(store.getState().analytics.items[analyticId].chart.parameters.ids.length).toBe(1)
})

test('update table parameter', () => {
    const store = getStore()

    const ids = store.getState().analytics.ids

    const analyticId = ids[0]

    store.dispatch(updateTableProperty({
        analyticId,
        property: 'legend',
        value: 'table legend'
    }))

    expect(store.getState().analytics.items[analyticId].table.legend).toBe('table legend')

    const parameterId = store.getState().analytics.items[analyticId].table.parameters.ids[0]

    store.dispatch(updateTableParameterProperty({
        analyticId,
        parameterId,
        property: 'value',
        value: 'param value'
    }))

    expect(store.getState().analytics.items[analyticId].table.parameters.items[parameterId].value).toBe('param value')

    store.dispatch(updateTableParameterProperties({
        analyticId,
        parameterId,
        properties: [{name: 'value', value: 'new value'}, {name: 'valid', value: false}]
    }))

    expect(store.getState().analytics.items[analyticId].table.parameters.items[parameterId].value).toBe('new value')
    expect(store.getState().analytics.items[analyticId].table.parameters.items[parameterId].valid).toBe(false)

    store.dispatch(removeTableParameter(
        {
            analyticId,
            parameterId
        }))

    expect(store.getState().analytics.items[analyticId].table.parameters.ids.length).toBe(1)
})

test('remove analytic', async () => {
    const store = getStore()
    const events = []
    store.subscribe(() => {
        events.push(store.getState())
    })

    const ids = store.getState().analytics.ids

    const analyticId = ids[0]

    store.dispatch(removeAnalytic({analyticId}))

    // wait fetch event
    const hasEvents = await barrier(2000, () => events.length > 1)
    expect(hasEvents).toBe(true)

    expect(store.getState().analytics.ids.length).toBe(0)
})

test('put analytic', async () => {
    const store = getStore()
    const events = []
    store.subscribe(() => {
        events.push(store.getState())
    })

    const ids = store.getState().analytics.ids

    const analyticId = ids[0]

    store.dispatch(updateChartProperty({
        analyticId,
        property: 'legend',
        value: 'new chart legend'
    }))

    // save
    store.dispatch(updateAnalytic({analyticId}))

    const hasEvents = await barrier(2000, () => events.length > 2)
    expect(hasEvents).toBe(true)

    expect(store.getState().analytics.items[analyticId].chart.legend).toBe('new chart legend')
})

test('add analytic', async () => {
    const store = getStore()
    const events = []
    store.subscribe(() => {
        events.push(store.getState())
    })

    store.dispatch(addAnalytic())
    const hasEvents = await barrier(2000, () => events.length > 1)
    expect(hasEvents).toBe(true)

    expect(store.getState().analytics.ids.length).toBe(2)
})