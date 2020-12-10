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

import logger from "redux-logger";
import {configureStore} from '@reduxjs/toolkit'

import {combineReducers} from "redux";
import {DEFAULT_SCOPE, scopeReducer} from "../features/dashbaord/scope";
import {analyticsReducer, DEFAULT_ANALYTICS} from "../features/dashbaord/analytics";
import {dashboardSettingsReducer, DEFAULT_DASHBOARD} from "../features/dashbaord/dashboard";
import {DEFAULT_EMBEDS, embedsReducer} from "../features/dashbaord/embed";
import type {Embeds} from "../features/dashbaord/embedModel";
import type {Dashboard} from "../features/dashbaord/dashboardModel";
import type {Scope} from "../features/dashbaord/scopeModel";
import type {Analytics} from "../features/dashbaord/analyticsModel";
import {DEFAULT_USER, userReducer} from "../features/user/user";
import type {User} from "../features/user/userModel";
import {toAnalytics, toScope} from "../features/dashbaord/api/converter";

export type State = {
    user: User,
    scope: Scope,
    analytics: Analytics,
    dashboard: Dashboard,
    embeds: Embeds
}

export const reducer = combineReducers(
    {
        user: userReducer,
        scope: scopeReducer,
        analytics: analyticsReducer,
        dashboard: dashboardSettingsReducer,
        embeds: embedsReducer
    }
)

export const store = (preloadedState: State) => configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState
})

export const remoteLoadedStore = (user) => {
    const preloadedState: State = {
        user: {...DEFAULT_USER, ...user},
        analytics: {...DEFAULT_ANALYTICS},
        scope: {...DEFAULT_SCOPE},
        dashboard: {...DEFAULT_DASHBOARD},
        embeds: {...DEFAULT_EMBEDS}
    }

    preloadedState.dashboard.dashboardId = undefined

    return store(preloadedState)
}

export const loadedStore = (userData, dashboardData) => {
    const preloadedState: State = {
        user: {...DEFAULT_USER},
        analytics: {...DEFAULT_ANALYTICS},
        scope: {...DEFAULT_SCOPE},
        dashboard: {...DEFAULT_DASHBOARD},
        embeds: {...DEFAULT_EMBEDS}
    }
    if (dashboardData['analytics']) {
        preloadedState.analytics =
            {
                ...preloadedState.analytics,
                ...toAnalytics(dashboardData['analytics'])
            }
    }
    if (dashboardData['scope']) {
        preloadedState.scope =
            {
                ...preloadedState.scope,
                ...toScope(dashboardData['scope'])
            }
    }
    if (dashboardData['grid'] && dashboardData['grid']['layouts']) {
        preloadedState.analytics.grid =
            {
                ...preloadedState.analytics.grid,
                layouts: dashboardData['grid']['layouts']
            }
    }
    if (dashboardData['settings']) {
        preloadedState.dashboard = {
            ...preloadedState.dashboard,
            name: dashboardData['name'],
            dashboardId: dashboardData['dashboardId'],
            settings: dashboardData['settings']
        }
    }

    preloadedState.user = {...preloadedState.user, ...userData}

    return store(preloadedState)
}


