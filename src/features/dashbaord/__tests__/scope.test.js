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
    addJoinTable, removeScopePropertyItem,
    updateJoinTableDefaultValues,
    updateJoinTableOnLeft,
    updateJoinTableOnRight,
    updateScope
} from "../scope";
import {barrier, getStore} from "./data";

jest.mock('../api/dashboardAPI')


test('scope preloaded state', () => {
    const store = getStore()

    expect(store.getState().scope.columns.length).toBeGreaterThan(0)
    expect(store.getState().scope.joins.ids.length).toBe(0)
    expect(store.getState().scope.columnOptions.ids.length).toBeGreaterThan(0)
    expect(store.getState().scope.sources.length).toBeGreaterThan(0)
    expect(store.getState().scope.filters.length).toBeGreaterThan(0)
    expect(store.getState().scope.categories.length).toBeGreaterThan(0)
    expect(store.getState().scope.measures.length).toBeGreaterThan(0)
    expect(store.getState().scope.filterColumnIds.length).toBeGreaterThan(0)
    expect(store.getState().scope.categoryColumnIds.length).toBeGreaterThan(0)
    expect(store.getState().scope.measureColumnIds.length).toBeGreaterThan(0)
})


test('update scope', async () => {
    const store = getStore()
    const events = []

    store.subscribe(() => {
        events.push(store.getState())
    })

    store.dispatch(updateScope())
    const hasEvents = await barrier(2000, () => events.length > 1)
    expect(hasEvents).toBe(true)

    expect(store.getState().scope.scopeId).toBe('new scope id')
})

test('add join table', () => {
    const store = getStore()

    store.dispatch(addJoinTable({joinSourceId: "DB"}))

    expect(store.getState().scope.joins.ids.length).toBe(1)
    expect(store.getState().scope.joins.items["DB"].joinSourceId).toBe('DB')

})

test('update join table', () => {
    const store = getStore()

    store.dispatch(addJoinTable({joinSourceId: "DB"}))

    store.dispatch(updateJoinTableOnLeft({joinSourceId: "DB", columns: [{columnId: "DB:Field One"}]}))
    store.dispatch(updateJoinTableOnLeft({joinSourceId: "DB", columns: [{columnId: "DB:Field One"}]}))

    expect(store.getState().scope.joins.items["DB"].onLeft.length).toBe(1)
    expect(store.getState().scope.joins.items["DB"].onLeft[0].columnId).toBe("DB:Field One")

    store.dispatch(updateJoinTableOnRight({joinSourceId: "DB", columns: [{columnId: "Field One"}]}))
    expect(store.getState().scope.joins.items["DB"].onRight[0].columnId).toBe("Field One")

    store.dispatch(updateJoinTableDefaultValues({joinSourceId: "DB", column: "Field One", value: "Default Field One"}))
    expect(store.getState().scope.joins.items["DB"].defaultValues["Field One"]).toBe("Default Field One")
})

test('remove join table', () => {
    const store = getStore()

    store.dispatch(addJoinTable({joinSourceId: "DB"}))

    expect(store.getState().scope.joins.ids.length).toBe(1)

    store.dispatch(removeScopePropertyItem({name: "joins", itemId: "DB"}))
    expect(store.getState().scope.joins.ids.length).toBe(0)
})