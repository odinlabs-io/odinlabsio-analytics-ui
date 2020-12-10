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

import './css/AnalyticsDashboard.scss';
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {connect, useSelector} from 'react-redux';

import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {WidthProvider, Responsive} from "react-grid-layout";
import type {State} from "../app/store";
import {
    addAnalytic, removeAnalytic,
    updateAnalytic, setLayouts,
    updateAnalyticProperty, saveLayout
} from "./dashbaord/analytics";
import {
    Add,
    PlayCircleOutlineTwoTone, Save
} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import {_chartPreview, ChartPreview, ChartToolbox} from "./AnalyticsChart";
import {_tablePreview, TablePreview, TableToolbox} from "./AnalyticsTable";
import {StudioDashboardItem} from "../components/DashboardItems";
import {VerticalActionComponent} from "../components/DefaultComponents";
import LinearProgress from "@material-ui/core/LinearProgress";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

const EditableChartPreview = _chartPreview({editable: true})
const EditableTablePreview = _tablePreview({editable: true})


const _analyticsDashboardItemEditor = () => {
    function View(props) {
        const editRef = React.createRef()

        const {analyticId, type, size, dispatch} = props

        useEffect(() => {
            editRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});

        }, [analyticId, editRef])

        const handleChangeType = (type) => {
            dispatch(updateAnalyticProperty({analyticId, property: 'type', value: type}))
        }

        const getMenu = (menuItem, menuLabel) => {
            if (menuItem === type) {
                return <MenuItem className={"active"} onClick={() => handleChangeType(menuItem)}>{menuLabel}</MenuItem>
            } else {
                return <MenuItem onClick={() => handleChangeType(menuItem)}>{menuLabel}</MenuItem>
            }
        }

        const getToolBox = () => {
            if (type === 'CHART') {
                return <ChartToolbox analyticId={analyticId}/>
            }
            if (type === 'TABLE') {
                return <TableToolbox analyticId={analyticId}/>
            }
        }

        const getPreview = () => {
            if (type === 'CHART') {
                return <EditableChartPreview analyticId={analyticId}/>
            }
            if (type === 'TABLE') {
                return <EditableTablePreview analyticId={analyticId}/>
            }
        }

        const loadPreview = () => {
            dispatch(updateAnalytic({analyticId: analyticId}))
        }

        if (analyticId) {
            return (
                <Paper ref={editRef} className="analytics-item-editor">
                    <div className="analytics-item-editor-toolbox left-menu-toolbox">
                        <MenuList className="toolbox-menu">
                            {getMenu("CHART", "Chart")}
                            {getMenu("TABLE", "Table")}
                            {getMenu("TEXT", "Text")}
                            {getMenu("NUMBER", "Number")}
                        </MenuList>
                        <div className={"analytics-item-editor-toolbox-params"}>
                            {getToolBox()}
                        </div>
                    </div>
                    <VerticalActionComponent action={() => <Tooltip title="Save and Preview" aria-label="preview">
                        <Fab style={{"backgroundColor": "white", "position": "absolute"}} color="default" size="small"
                             aria-label="preview" onClick={loadPreview}>
                            <PlayCircleOutlineTwoTone style={{"color": "indianred"}}/>
                        </Fab>
                    </Tooltip>}/>
                    <div className="analytics-item-editor-preview">
                        <div className="analytics-item"
                             style={{height: size.h, width: size.w}}>
                            {getPreview()}
                        </div>
                    </div>
                </Paper>
            )
        } else {
            return (<React.Fragment/>)
        }
    }

    function mapStateToProps(state: State, {analyticId, size}) {
        const analytic = state.analytics.items[analyticId]

        return {type: analytic ? analytic.type : undefined, analyticId: analytic ? analyticId : undefined, size}
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const AnalyticsDashboardItemEditor = _analyticsDashboardItemEditor()

const AnalyticsDashboardItemReference = ({analyticId, onEdit, onRemove}) => {
    const type = useSelector(state => state.analytics.items[analyticId].type)

    const getPreview = () => {
        if (type === 'CHART') {
            return <ChartPreview analyticId={analyticId}/>
        }
        if (type === 'TABLE') {
            return <TablePreview analyticId={analyticId}/>
        }
    }

    const handleEdit = (ref) => {
        onEdit({h: ref.current.clientHeight, w: ref.current.clientWidth})
    }

    const handleRemove = () => {
        onRemove()
    }

    return (<StudioDashboardItem item={getPreview} onEdit={handleEdit} onRemove={handleRemove}/>)
}

export function _analyticsStudio() {

    function View(props) {
        const {dashboardId, status, analyticIds, layouts, breakpoints, cols, dispatch} = props

        const [edit, setEdit] = useState({size: {h: '0px', w: '0px'}})
        const lastRef = analyticIds.length !== 0 && React.createRef()

        const handleAddAnalytic = useCallback(() => {
            dispatch(addAnalytic())
            if (lastRef && lastRef.current) {
                lastRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }, [lastRef, dispatch])

        const handleSaveLayout = useCallback(() => {
            dispatch(saveLayout())
        }, [dispatch])

        const handleUpdateLayout = useCallback((currentLayout, allLayouts) => {
            dispatch(setLayouts({layouts: allLayouts}))
        }, [dispatch])

        const items = useMemo(() => analyticIds.map((analyticId, idx) => {
            const handleEditAnalytic = (analyticId, size) => {
                setEdit({analyticId: analyticId, size: size})
            }

            const handleRemoveAnalytic = (analyticId) => {
                if (analyticId === edit.analyticId) {
                    console.log('reset')
                    setEdit({size: {h: '0px', w: '0px'}})
                }
                dispatch(removeAnalytic({analyticId: analyticId}))
            }

            if (idx === (analyticIds.length - 1)) {
                return (<div key={analyticId} ref={lastRef}
                             className="analytics-dashboard-grid-item" data-studio-item={"true"}>
                    <AnalyticsDashboardItemReference analyticId={analyticId}
                                                     onEdit={(size) => handleEditAnalytic(analyticId, size)}
                                                     onRemove={() => handleRemoveAnalytic(analyticId)}/>
                </div>)
            } else {
                return (<div key={analyticId}
                             className="analytics-dashboard-grid-item" data-studio-item={"true"}>
                    <AnalyticsDashboardItemReference analyticId={analyticId}
                                                     onEdit={(size) => handleEditAnalytic(analyticId, size)}
                                                     onRemove={() => handleRemoveAnalytic(analyticId)}/>
                </div>)
            }
        }), [analyticIds, lastRef, dispatch, edit, setEdit])

        const isLoading = status === 'loading' || status === 'init'
        return (
            <div className="analytics-dashboard">
                {dashboardId &&
                <React.Fragment>
                    <div className="analytics-dashboard-header">
                        <Typography variant="h6">Analytics Studio</Typography>
                        <div className="analytics-dashboard-header-actions">
                            <Button type="button" color="primary" startIcon={<Save/>}
                                    onClick={handleSaveLayout}>Save</Button>
                            <Button type="button" color="primary" startIcon={<Add/>}
                                    onClick={handleAddAnalytic}>Item</Button>
                        </div>
                    </div>
                    {isLoading && <LinearProgress/>}
                    {edit.analyticId && <AnalyticsDashboardItemEditor analyticId={edit.analyticId} size={edit.size}/>}
                    <Paper className="analytics-dashboard-grid">
                        {status && status !== 'init' && <ResponsiveReactGridLayout margin={[10, 10]}
                                                                                   containerPadding={[8, 8]}
                                                                                   isDraggable={true}
                                                                                   isResizable={true}
                                                                                   className="layout"
                                                                                   layouts={layouts}
                                                                                   breakpoints={breakpoints}
                                                                                   cols={cols}
                                                                                   onLayoutChange={handleUpdateLayout}>
                            {items}
                        </ResponsiveReactGridLayout>}
                    </Paper>
                </React.Fragment>
                }
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

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

export const AnalyticsStudio = _analyticsStudio()

AnalyticsStudio.propTypes = {};