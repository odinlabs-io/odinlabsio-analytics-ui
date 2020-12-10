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

import './css/Workspace.scss'
import React from "react";

import {AnalyticsScope} from "../features/AnalyticsScope";
import {Redirect, Route, Switch} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import {AnalyticsStudio} from "../features/AnalyticsStudio";
import {useSelector} from "react-redux";
import {AnalyticsDashboard} from "../features/AnalyticsDashboard";
import {AnalyticsDashboardCatalog} from "../features/AnalyticsDashboardCatalog";

function ScrollTop(props) {
    const {children, anchor} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => {
        if (anchor && anchor.current) {
            anchor.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    return (
        <Zoom in={trigger} style={{'display': 'flex', 'justifyContent': 'flex-end'}}>
            <div onClick={handleClick} role="presentation">
                {children}
            </div>
        </Zoom>
    );
}

export function Workspace(props) {
    const refScroll = React.createRef();
    const dashboardTitle = useSelector(state => {
        const dashboardId = state.dashboard.dashboardId
        if (dashboardId) {
            return state.dashboard.dashboards.items[dashboardId].dashboardTitle
        } else {
            return "Dashboard Catalog"
        }
    })

    return (
        <div className="analytics-workspace">
            <div className="analytics-workspace-toolbar">
                <Toolbar id="window-anchor" ref={refScroll}>
                    <Typography variant="h6">{dashboardTitle}</Typography>
                </Toolbar>
            </div>
            <Switch>
                <div className="analytics-workspace-board">
                    <Route exact path="/" render={() => (
                        <AnalyticsDashboardCatalog/>
                    )}/>
                    <Route exact path="/catalog" render={() => (
                        <AnalyticsDashboardCatalog/>
                    )}/>
                    <Route exact path="/scope" render={() => (
                        <AnalyticsScope/>
                    )}/>
                    <Route exact path="/dashboard" render={() => (
                        <AnalyticsDashboard/>
                    )}/>
                    <Route exact path="/studio" render={() => (
                        <AnalyticsStudio/>
                    )}/>
                    <Redirect to="/"/>
                    <ScrollTop {...props} anchor={refScroll}>
                        <Fab color="secondary" size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon/>
                        </Fab>
                    </ScrollTop>
                </div>
            </Switch>
        </div>
    )
}