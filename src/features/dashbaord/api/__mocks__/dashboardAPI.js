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

export const fetchPutGrid = async (dashboardId: string, data: any) => {
    return Promise.resolve(data)
}

export const fetchPostAnalytic = async (dashboardId: string) => {
    return Promise.resolve({
        "analyticId": "newAnalytic",
        "type": "CHART",
        "chart": {
            "type": "Scatter",
            "title": "Chart Title",
            "legend": "Chart Legend",
            "description": "Chart Description",
            "axis": {
                "X": "Aggregation",
            },
            "parameters": [
                {
                    "label": "Aggre",
                    "parameterId": "Aggre",
                    "type": "A",
                    "valid": "true",
                    "value": "SUM('Q')",
                    "top": 10,
                    "axis": "X"
                }
            ]
        },
    })
}

export const fetchPutAnalytic = async (dashboardId: string, analyticId, data: any) => {
    return Promise.resolve({
        "analyticId": analyticId,
        ...data,
    })
}

export const fetchDeleteAnalytic = async (dashboardId: string, analyticId: string) => {
    return Promise.resolve({})
}

export const fetchGetEmbed = async (dashboardId: string, analyticId: string) => {
    return Promise.resolve({
        srcPath: "src/path",
        appPath: "app/path",
        elementId: analyticId,
        headers: {"X-HEADER": "MY-HEADER"}
    })
}

export const fetchPutScope = async (dashboardId: string, data) => {
    const scope = {...data, scopeId: 'new scope id'}
    return Promise.resolve(scope)
}