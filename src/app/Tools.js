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

import './css/Tools.scss'
import React from "react";
import {useHistory, useLocation} from 'react-router-dom';
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {useSelector} from "react-redux";

const UserAvatar = withStyles({
    root: {
        color: "#FFFFFF",
        backgroundColor: "black",
        marginRight: "4px"
    }
})(Avatar);

export function Sidebar() {
    const user = useSelector(state => state.user)
    const userName = user.login.name
    const history = useHistory()
    const location = useLocation()

    const onSelect = selected => {
        if (selected === location.pathname) {
            history.goBack()
        } else {
            history.push(selected)
        }
    }

    const btnClassName = selected => {
        return "shadow-none btn " + (selected[location.pathname] ? "btn-sidebar-enabled" : "btn-sidebar-disabled");
    }
    return (
        <div className="analytics-app-sidebar">
            <Toolbar className={"user-avatar"}>
                <UserAvatar>{userName && userName.length > 2 ? userName.slice(0, 2) : "GE"}</UserAvatar>
                <Typography variant="body1" component="h2">{userName}</Typography>
            </Toolbar>
            <Typography>Analytics</Typography>
            <div className="analytics-app-sidebar-menu" role="toolbar"
                 aria-label="Toolbar with button groups">
                <button type="button"
                        className={btnClassName({"/catalog": "catalog", "/": "catalog"})}
                        onClick={() => onSelect("/catalog")}>Catalog
                </button>
                <button type="button"
                        className={btnClassName({"/scope": "scope"})}
                        onClick={() => onSelect("/scope")}>Scope
                </button>
                <button type="button" className={btnClassName({"/dashboard": "dashboard"})}
                        onClick={() => onSelect("/dashboard")}>Dashboard
                </button>
                <button type="button" className={btnClassName({"/studio": "/studio"})}
                        onClick={() => onSelect("/studio")}>Studio
                </button>
            </div>
            <Typography>Team</Typography>
            <div className="analytics-app-sidebar-menu" role="toolbar"
                 aria-label="Toolbar with button groups">
                <button type="button" className={btnClassName({"/publisher": "/publisher"})}
                        onClick={() => onSelect("/publisher")}>Publisher
                </button>
                <button type="button" className={btnClassName({"sharing": "/sharing"})}
                        onClick={() => onSelect("/sharing")}>Sharing
                </button>
            </div>
        </div>
    )
}