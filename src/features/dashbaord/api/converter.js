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
    normalized,
    updateItem,
    updateItemValue,
    updateProperty,
    updatePropertyValue
} from "../../normalized";
import type {Analytic} from "../analyticsModel";
import type {Scope} from "../scopeModel";

export const toAnalytics = (analyticsData: {}[]) => {
    const analytics = normalized(analyticsData, analytic => analytic.analyticId)

    //normalize parameters in chart and table
    analytics.ids.forEach(analyticId => {
        updateItem(analytics, analyticId, draftAnalytic => {
            updateItemValue(analytics, analyticId, toAnalytic(draftAnalytic))
        })
    })
    return analytics
}

export const toAnalytic = (analyticData: {}) => {
    const analytic = {
        ...analyticData,
        chart: {axis: {}, parameters: {ids: [], items: {}}},
        table: {axis: {}, parameters: {ids: [], items: {}}},
    }

    //normalize parameters in chart and table
    updateProperty(analyticData, 'chart', chartData => {
        updatePropertyValue(analytic, 'chart', {...chartData})
        updateProperty(analytic, 'chart', draft => {
            updateProperty(chartData, 'parameters', parametersData => {
                draft.parameters = normalized(parametersData, parameter => parameter.parameterId)
            })
        })
    })
    updateProperty(analyticData, 'table', chartData => {
        updatePropertyValue(analytic, 'table', {...chartData})
        updateProperty(analytic, 'table', draft => {
            updateProperty(chartData, 'parameters', parametersData => {
                draft.parameters = normalized(parametersData, parameter => parameter.parameterId)
            })
        })
    })
    return analytic
}

export const fromAnalytic = (analytic: Analytic) => {
    return {
        ...analytic,
        chart: {...analytic.chart, parameters: Object.values(analytic.chart.parameters.items)},
        table: {...analytic.table, parameters: Object.values(analytic.table.parameters.items)}
    }
}

export const toScope = (scopeData: {}) => {
    const scope = {
        status: 'idle',
        scopeId: scopeData.scopeId,
        source: scopeData.source,
        filter: scopeData.filter,
        columns: [],
        joins: {ids: [], items: {}},
        columnOptions: {ids: [], items: {}},
        sources: [],
        filters: [],
        categories: [],
        measures: [],
        ...scopeData
    }

    updateProperty(scopeData, 'joins', draft => {
        scope.joins = normalized(draft, join => join.joinSourceId)
        scope.joins.ids.forEach(joinSourceId => {
            updateItem(scope.joins, joinSourceId, joinDraft => {
                updateItemValue(scope.joins, joinSourceId, toJoinTable(joinDraft))
            })
        })
    })
    updateProperty(scopeData, 'sourceColumns', draft => {
        scope.columnOptions = normalized(draft, source => source.sourceId)

        scope.columnOptions.ids.forEach(sourceId => {
            updateItem(scope.columnOptions, sourceId, sourceDraft => {
                updateItemValue(scope.columnOptions, sourceId, toColumns(sourceDraft))
            })
        })
    })
    updateProperty(scope, 'filters', draft => {
        scope.filterColumnIds = draft.map(filterColumn => filterColumn.columnId)
    })
    updateProperty(scope, 'categories', draft => {
        scope.categoryColumnIds = draft.map(categoryColumn => categoryColumn.columnId)
    })
    updateProperty(scope, 'measures', draft => {
        scope.measureColumnIds = draft.map(measureColumn => measureColumn.columnId)
    })

    return scope
}

export const toJoinTable = (joinTableData) => {
    return {onLeft: [], onRight: [], defaultValues: {}, ...joinTableData}
}

export const toColumns = (columnsData) => {
    return [...columnsData.columns]
}

export const fromScope = (scope: Scope) => {
    const joins = Object.values(scope.joins.items)

    return {scopeId: scope.scopeId, source: scope.source, filter: scope.filter, columns: scope.columns, joins}
}

export const toDashboards = (dashboardData) => {
    return normalized(dashboardData, dashboard => dashboard.dashboardId)
}

