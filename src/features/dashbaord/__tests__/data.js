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

import {loadedStore} from "../../../app/store";

export const MOCK_DATA = {
    "analytics": [
        {
            "analyticId": "analyticId",
            "chart": {
                "axis": {
                    "X": "Aggre",
                    "Y": "Category"
                },
                "description": "Chart Description",
                "legend": "Chart Legend",
                "parameters": [
                    {
                        "axis": "X",
                        "label": "Aggre",
                        "parameterId": "Aggre",
                        "top": 10.0,
                        "type": "A",
                        "valid": true,
                        "value": "SUM('Q')"
                    },
                    {
                        "axis": "Y",
                        "label": "Category",
                        "parameterId": "Category",
                        "type": "C",
                        "valid": true,
                        "value": "C"
                    }
                ],
                "title": "Chart Title",
                "type": "Scatter"
            },
            "filter": {
                "filterId": "Filter",
                "valid": true,
                "value": "EQ('A', \"VALUE\")"
            },
            "table": {
                "description": "Table Description",
                "legend": "Table Legend",
                "parameters": [
                    {
                        "label": "Aggre",
                        "parameterId": "Aggre",
                        "top": 10.0,
                        "type": "A",
                        "valid": true,
                        "value": "SUM('Q')"
                    },
                    {
                        "label": "Category",
                        "parameterId": "Category",
                        "type": "C",
                        "valid": true,
                        "value": "C"
                    }
                ],
                "title": "Table Title"
            },
            "type": "CHART"
        }
    ],
    "dashboardId": "6ba0c29c-b4b1-41a9-a8d8-0fecb2989620",
    "grid": {
        "layouts": {
            "lg": [
                {
                    "h": 2,
                    "i": "analyticId",
                    "minH": 2,
                    "minW": 4,
                    "w": 4,
                    "x": 0,
                    "y": 0
                }
            ]
        }
    },
    "dashboardTitle": "my dashboard",
    "version": 0,
    "createdBy": 'default user',
    "scope": {
        "scopeId": "scopeId",
        "source": {"sourceId": "CSV"},
        "columns": [{"columnId": "Field One"}, {"columnId": "Field Two"}, {"columnId": "Field Three"}],
        "joins": [],
        "sources": [{"sourceId": "CSV"}, {"sourceId": "DB"}],
        "sourceColumns": [{
            "sourceId": "CSV", "columns": [{"columnId": "Field One"}, {"columnId": "Field Two"},
                {"columnId": "Field Three"}, {"columnId": "Field Four"}]
        },
            {
                "sourceId": "DB", "columns": [{"columnId": "DB:Field One"}, {"columnId": "DB:Field Two"},
                    {"columnId": "DB:Field Three"}, {"columnId": "DB:Field Four"}]
            }],
        "filters": [{"columnId": "Field One"}, {"columnId": "Field Two"}],
        "categories": [{"columnId": "Field One"}, {"columnId": "Field Two"}],
        "measures": [{"columnId": "Field Three"}, {"columnId": "Field Four"}],
    },
    "settings": {
        "chart": {
            "typeOptions": {
                "BARCHART": "Bar Chart",
                "PIECHART": "Pie Chart",
                "SCATTER": "Scatter"
            }
        },
        "grid": {
            "breakPoints": {
                "lg": 1200.0,
                "md": 996.0,
                "sm": 768.0,
                "xs": 480.0,
                "xxs": 0.0
            },
            "cols": {
                "lg": 12.0,
                "md": 10.0,
                "sm": 6.0,
                "xs": 4.0,
                "xxs": 2.0
            },
            "rowHeight": 30.0,
            "width": 1200.0
        }
    }
}


export const barrier = (timeoutMs: number, condition, stepMs: number = 100) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            reject('Timeout');
        }, timeoutMs)

        function loop() {
            if (condition()) {
                return resolve(true)
            }
            setTimeout(loop, stepMs);
        }

        setTimeout(loop, stepMs)
    })
}

export const getStore = () => {
    return loadedStore({}, MOCK_DATA)
}