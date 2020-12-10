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

import React, {useEffect, useMemo, useRef} from "react";
import axios from "axios";
import {
    EditableItemDescription,
    EditableItemHeader,
    EditableItemLegend, ItemDescription,
    ItemHeader,
    ItemLegend
} from "../components/ContentView";
import {fetchGetEmbed} from "./dashbaord/api/dashboardAPI";

const Content = ({dashboardId, analyticId, analyticVersion}) => {
    const ref = useRef()
    useEffect(() => {
        console.log('fire use effet content')

        let script = false
        let container = undefined
        const cleanUp = () => {
            console.log('clean up')
            if (container) {
                console.log('clean up element')

                container.parentNode.removeChild(container)
            }
            if (script) {// remove script tag
                console.log('clean up script')

                document.body.removeChild(script)
            }
        }
        fetchGetEmbed(dashboardId, analyticId, {}).then(content => {
            // add container which will be replaced upon script execution
            container = document.createElement("div")
            container.id = content.elementId // TODO
            ref.current.appendChild(container)


            axios.get(content.srcPath, {...content.headers, responseType: 'blob'})
                .then(res => {
                        script = document.createElement("script")
                        if ('srcObject' in script) {
                            script.srcObject = res.data
                        } else {
                            script.src = URL.createObjectURL(res.data)
                        }
                        document.body.appendChild(script)
                        return script
                    }
                ).catch(e => {
                // display error message
                console.log(e)
            })
            return container
        })

        return cleanUp
    }, [dashboardId, analyticId, analyticVersion, ref])

    return (<div ref={ref} className="analytics-item-content"/>)
}

export const AnalyticsContent = (props) => {
    const {dashboardId, analyticId, analyticVersion, title, legend, description} = props
    const item = useMemo(() => {
        return (<Content dashboardId={dashboardId} analyticId={analyticId} analyticVersion={analyticVersion}/>)
    }, [dashboardId, analyticId, analyticVersion])
    return (
        <React.Fragment>
            <ItemHeader title={title}/>
            {item}
            <ItemLegend legend={legend}/>
            <ItemDescription description={description}/>
        </React.Fragment>)
}

export const EditableAnalyticsContent = (props) => {
    const {dashboardId, analyticId, analyticVersion, title, legend, description, updateTitle, updateLegend, updateDescription} = props
    const item = useMemo(() => {
        return (<Content dashboardId={dashboardId} analyticId={analyticId} analyticVersion={analyticVersion}/>)
    }, [dashboardId, analyticId, analyticVersion])
    return (
        <React.Fragment>
            <EditableItemHeader title={title}
                                updateTitle={updateTitle}/>
            {item}
            <EditableItemLegend legend={legend}
                                updateLegend={updateLegend}/>
            <EditableItemDescription description={description}
                                     updateDescription={updateDescription}/>
        </React.Fragment>)
}