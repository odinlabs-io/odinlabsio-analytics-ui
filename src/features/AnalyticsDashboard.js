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

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import React, {useMemo} from "react";
import {Typography} from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import type {State} from "../app/store";
import {connect, useSelector} from "react-redux";
import {ChartPreview} from "./AnalyticsChart";
import {TablePreview} from "./AnalyticsTable";
import {PresentationDashboardItem} from "../components/DashboardItems";
import {Responsive, WidthProvider} from "react-grid-layout";
import LinearProgress from "@material-ui/core/LinearProgress";

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const AnalyticsDashboardItemReference = ({analyticId}) => {
    const type = useSelector(state => state.analytics.items[analyticId].type)

    const getPreview = () => {
        if (type === 'CHART') {
            return <ChartPreview analyticId={analyticId}/>
        }
        if (type === 'TABLE') {
            return <TablePreview analyticId={analyticId}/>
        }
    }

    return (<PresentationDashboardItem item={getPreview}/>)
}

export function _analyticsDashboard() {

    function View(props) {
        const {dashboardId, status, analyticIds, layouts, breakpoints, cols} = props

        const items = useMemo(() => analyticIds.map((analyticId) => {
            return (<Paper key={analyticId}
                           className="analytics-dashboard-grid-item" variant={"outlined"}>
                <AnalyticsDashboardItemReference analyticId={analyticId}/>
            </Paper>)
        }), [analyticIds])

        const isLoading = status === 'loading' || status === 'init'
        return (
            <div className="analytics-dashboard">
                {dashboardId && <React.Fragment>
                    <div className="analytics-dashboard-header">
                        <Typography variant="h6">Analytics Dashboard</Typography>
                        {isLoading && <LinearProgress/>}
                    </div>
                    <Paper className="analytics-dashboard-grid">
                        {status && status !== 'init' && <ResponsiveReactGridLayout margin={[10, 10]}
                                                                                   containerPadding={[8, 8]}
                                                                                   isDraggable={false}
                                                                                   isResizable={false}
                                                                                   className="layout"
                                                                                   layouts={layouts}
                                                                                   breakpoints={breakpoints}
                                                                                   cols={cols}>
                            {items}
                        </ResponsiveReactGridLayout>}
                    </Paper>
                </React.Fragment>}
            </div>)
    }

    function mapStateToProps(state: State) {
        return {
            dashboardId: state.dashboard.dashboardId,
            status: state.dashboard.status,
            analyticIds: state.analytics.ids,
            layouts: state.analytics.grid.layouts,
            breakpoints: state.dashboard.settings.grid.breakPoints,
            cols: state.dashboard.settings.grid.cols,
        }
    }

    return connect(mapStateToProps)(View)
}

export const AnalyticsDashboard = _analyticsDashboard()

AnalyticsDashboard.propTypes = {};