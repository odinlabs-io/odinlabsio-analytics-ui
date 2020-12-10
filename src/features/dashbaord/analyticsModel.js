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

export type GridPosition = {
    i: string,
    // These are all in grid units, not pixels
    x: number,
    y: number,
    w: number,
    h: number,
    minW: ?number,
    maxW: ?number,
    minH: ?number,
    maxH: ?number
}
export type Grid = {
    layouts: { [string]: GridPosition[] },
}
export type ChartAggregationParameter =
    {
        parameterId: string,
        label: string,
        valid: boolean,
        type: string,
        value: string,
        top: number,
        axis: string
    }
export type TableAggregationParameter =
    {
        parameterId: string,
        label: string,
        valid: boolean,
        type: string,
        value: string,
        top: number
    }
export type Analytic = {
    status: string,
    analyticId: string,
    version: string,
    type: string,
    chart:
        {
            type: string,
            title: string,
            legend: string,
            description: string,
            axis:
                {
                    [string]: string
                },
            parameters:
                {
                    ids: string[],
                    items:
                        {
                            [string]: ChartAggregationParameter
                        }
                }
        },
    table:
        {
            title: string,
            legend: string,
            description: string,
            parameters:
                {
                    ids: string[],
                    items:
                        {
                            [string]: TableAggregationParameter
                        }
                }
        },
    filter:
        {
            filterId: string,
            value: string,
            valid: boolean
        }
}
export type Analytics = {
    status: string,
    ids: string[],
    items:
        {
            [string]: Analytic
        },
    grid: Grid
}