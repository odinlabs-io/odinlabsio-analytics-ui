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

import './css/AnalyticsDashboardCatalog.scss'

import type {State} from "../app/store";
import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Add, DashboardSharp} from "@material-ui/icons";
import {addDashboard, loadDashboard} from "./dashbaord/dashboard";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {loadAnalytics, loadLayouts} from "./dashbaord/analytics";
import {loadScope} from "./dashbaord/scope";

const AddDashboardDialog = (props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    return (
        <div style={{"padding": "4px", "margin": "4px"}}>
            <Dialog onClose={() => props.onClose(title, description)} aria-labelledby={'new-dashboard-dialog'}
                    open={props.open}>
                <DialogTitle>Add Dashboard</DialogTitle>
                <div className={"param-group"}>
                    <div className={"param-row"}>
                        <div className={"param-item"}>
                            <TextField fullWidth required label="Title" onChange={onChangeTitle}/>
                        </div>
                    </div>
                    <div className={"param-row"}>
                        <div className={"param-item"}>
                            <TextField multiline fullWidth label="Description" placeholder="Dashboard description..."
                                       onChange={onChangeDescription}/>
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    )
}
const DashboardDescriptionCard = (props) => {
    return (<React.Fragment>
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                {props.dashboardTitle}
            </Typography>
            <Typography variant="body2" component="p">
                {props.dashboardDescription}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton aria-label="add to favorites" onClick={props.onOpen}>
                <DashboardSharp/>
            </IconButton>
        </CardActions>
    </React.Fragment>)
}

const _analyticDashboardDescription = () => {
    function View(props) {
        const {dashboardId, dispatch} = props
        const history = useHistory()

        const onOpen = () => {
            dispatch(loadDashboard({dashboardId}))
            dispatch(loadScope({dashboardId}))
            dispatch(loadLayouts({dashboardId}))
            dispatch(loadAnalytics({dashboardId}))
            history.push('/dashboard')
        }
        return (<DashboardDescriptionCard {...props} onOpen={onOpen}/>)
    }

    function mapStateToProps(state: State, {dashboardId}) {
        return {...state.dashboard.dashboards.items[dashboardId]}
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

const AnalyticsDashBoardDescription = _analyticDashboardDescription()

const _analyticsDashboardCatalog = () => {
    function View(props) {
        const {currentDashBoardId, dashboardIds, dispatch} = props
        const [open, setOpen] = React.useState(false);

        const handleNewDashboard = () => {
            setOpen(true)
        }

        const handleCreate = (title, description) => {
            if (title && title !== '') {
                dispatch(addDashboard({dashboardTitle: title, dashboardDescription: description}))
                setOpen(false)
            } else {
                setOpen(false)
            }
        }

        const selection = (dashboardId) => {
            return dashboardId === currentDashBoardId ? {'elevation': 5} : {'variant': "outlined"}
        }
        return (
            <div className={"analytics-catalog"}>
                <Paper className={"analytics-catalog-grid"}>
                    <Grid container spacing={3}>
                        {dashboardIds.map(dashboardId => (
                                <Grid item key={dashboardId} xs={3}>
                                    <Card style={{
                                        "height": "100%",
                                        "width": "100%",
                                        "display": "flex",
                                    }} {...selection((dashboardId))}>
                                        <CardContent style={{"alignSelf": "center"}}>
                                            <AnalyticsDashBoardDescription dashboardId={dashboardId}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        )}
                        <Grid item xs={3}>
                            <Card style={{
                                "height": "100%",
                                "width": "100%",
                                "display": "flex",
                                "justifyContent": "center"
                            }} variant={"outlined"}>
                                <CardContent style={{"alignSelf": "center", "display": "flex"}}>
                                    <Fab color="primary" aria-label="add">
                                        <Add onClick={handleNewDashboard}/>
                                    </Fab>
                                    <AddDashboardDialog open={open} onClose={handleCreate}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

    function mapStateToProps(state: State) {
        return {
            currentDashBoardId: state.dashboard.dashboardId,
            dashboardIds: state.dashboard.dashboards.ids
        }
    }

    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }

    return connect(mapStateToProps, mapDispatchToProps)(View)
}

export const AnalyticsDashboardCatalog = _analyticsDashboardCatalog()