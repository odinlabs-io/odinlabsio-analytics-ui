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

import {api} from "../../../app/api";
import {fromAnalytic, fromScope, toAnalytic, toAnalytics, toDashboards, toScope} from "./converter";

export const fetchDashboardsUrl = () => {
    return `/api/dashboard`
}

export const fetchDashboardSettingsUrl = (dashboardId: string) => {
    return `/api/dashboard/${dashboardId}/settings`
}

export const fetchAnalyticsUrl = (dashboardId: string) => {
    return `/api/dashboard/${dashboardId}/analytics`
}

export const fetchAnalyticUrl = (dashboardId: string, analyticId: string) => {
    return `/api/dashboard/${dashboardId}/analytics/${analyticId}`
}

export const fetchAnalyticEmbedUrl = (dashboardId: string, analyticId: string) => {
    return `/api/dashboard/${dashboardId}/analytics/${analyticId}/embed`
}

export const fetchScopeUrl = (dashboardId: string) => {
    return `/api/dashboard/${dashboardId}/scope`
}

export const fetchGridUrl = (dashboardId: string) => {
    return `/api/dashboard/${dashboardId}/grid`
}

export const fetchGetGrid = async (dashboardId: string) => {
    return api.get(fetchGridUrl(dashboardId)).then(res => res.data)
}

export const fetchPutGrid = async (dashboardId: string, data: any) => {
    return api.put(fetchGridUrl(dashboardId), data).then(res => res.data)
}

export const fetchGetAnalytics = async (dashboardId: string) => {
    return api.get(fetchAnalyticsUrl(dashboardId)).then(res => toAnalytics(res.data))
}

export const fetchPostAnalytic = async (dashboardId: string) => {
    return api.post(fetchAnalyticsUrl(dashboardId)).then(res => toAnalytic(res.data))
}

export const fetchPutAnalytic = async (dashboardId: string, analyticId, data: any) => {
    return api.put(fetchAnalyticUrl(dashboardId, analyticId), fromAnalytic(data)).then(res => toAnalytic(res.data))
}

export const fetchDeleteAnalytic = async (dashboardId: string, analyticId: string) => {
    return api.delete(fetchAnalyticUrl(dashboardId, analyticId)).then(res => res.data)
}

export const fetchGetEmbed = async (dashboardId: string, analyticId: string, params) => {
    return api.get(fetchAnalyticEmbedUrl(dashboardId, analyticId), {
        params: params
    }).then(res => res.data)
}

export const fetchGetScope = async (dashboardId: string) => {
    return api.get(fetchScopeUrl(dashboardId)).then(res => toScope(res.data))
}

export const fetchPutScope = async (dashboardId: string, data) => {
    return api.put(fetchScopeUrl(dashboardId), fromScope(data)).then(res => toScope(res.data))
}

export const fetchGetDashboardSettings = async (dashboardId: string) => {
    return api.get(fetchDashboardSettingsUrl(dashboardId)).then(res => res.data)
}

export const fetchGetDashboards = async () => {
    return api.get(fetchDashboardsUrl()).then(res => toDashboards(res.data))
}

export const fetchPostDashboard = async (data) => {
    return api.post(fetchDashboardsUrl(), data).then(res => res.data)
}
