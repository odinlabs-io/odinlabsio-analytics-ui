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

export const normalized = (values: any[], id_fn) => {
    const items = values.reduce((all, value) => {
        all[id_fn(value)] = value
        return all
    }, {})
    const ids = Object.keys(items)
    return {items, ids}
}

export const updatePropertyValue = (state, property: string, value) => {
    state[property] = value
}

export const removePropertyValue = (state, property: string) => {
    delete state[property]
}

export const updateProperty = (state, property: string, fn) => {
    if (state[property]) {
        fn(state[property])
    }
}

export const updateOrCreateProperty = (state, property: string, fn, initValue) => {
    if (state[property]) {
        fn(state[property])
    } else {
        state[property] = initValue
        fn(state[property])
    }
}

export const updateItem = (state, itemId: string, fn) => {
    if (state.items[itemId]) {
        fn(state.items[itemId])
    }
}

export const updateItemValue = (state, itemId: string, value: any) => {
    if (state.items[itemId]) {
        state.items[itemId] = value
    }
}

export const addItem = (state, itemId: string, initialValue: any) => {
    if (itemId && !state.items[itemId]) {
        state.items[itemId] = initialValue
        state.ids.push(itemId)
    }
}

export const removeItem = (state, itemId: string) => {
    if (itemId && state.items[itemId]) {
        const items = state.items
        delete items[itemId]

        state.items = items
        state.ids = Object.keys(items)
    }
}
export const updatePropertyItem = (state, property: string, itemId: string, fn) => {
    if (state[property].items[itemId])
        fn(state[property].items[itemId])
}

export const addPropertyItem = (state, property: string, itemId: string, initialValue: any) => {
    if (itemId && !state[property].items[itemId]) {
        state[property].items[itemId] = initialValue
        state[property].ids.push(itemId)
    }
}

export const removePropertyItem = (state, property: string, itemId: string) => {
    if (itemId && state[property].items[itemId]) {
        const items = state[property].items
        delete items[itemId]

        state[property].items = items
        state[property].ids = Object.keys(items)
    }
}