import React, { useRef, useState, useContext } from 'react'
import sideStyle from './sideColumn.module.css'

/**
 * Sidepanel
 */
import SideColumnLayout from './layout/sideColumnLayout'
import HtmlElement from './elements/htmlElement';
import ElementLayer from './layers/elementLayer';

import { pageDesignContext } from '../../Context/contexts';

export default function SideColumn(props) {

    const markerpos = useRef(null);

    let pageDesignState = useContext(pageDesignContext);

    const [panelMode, setPanelMode] = useState({
        panel: 0
    })

    const updateMarkerPos = (e) => {
        markerpos.current.style.scale = 1;
        markerpos.current.style.top = (e.target.getBoundingClientRect().top - 40) + "px";
    }



    return (
        <div className={sideStyle["sidebar"]}>
            <div className={sideStyle["sidebar_optionsbar"]} onMouseEnter={() => { markerpos.current.style.display = "block" }} onMouseLeave={() => { markerpos.current.style.display = "none" }}>
                <ul className={sideStyle["sidebar_optionbar_options"]}>
                    <li onClick={() => { setPanelMode({ ...panelMode, panel: 0 }) }} className={(panelMode.panel === 0) ? sideStyle["active"] : ""} onMouseEnter={updateMarkerPos}><a><i className="las la-th-large"></i></a></li>
                    <li onClick={() => { setPanelMode({ ...panelMode, panel: 1 }) }} className={(panelMode.panel === 1) ? sideStyle["active"] : ""} onMouseEnter={updateMarkerPos}><a><i className="las la-plus-circle"></i></a></li>
                    <li onClick={() => { setPanelMode({ ...panelMode, panel: 2 }) }} className={(panelMode.panel === 2) ? sideStyle["active"] : ""} onMouseEnter={updateMarkerPos}><a><i className="las la-laptop-code"></i></a></li>
                </ul>
                <span ref={markerpos} className={sideStyle["sidebar_option_highlighter"]}></span>
            </div>
            <div style={props.prevWid} className={sideStyle["sidebar_optionResults"]}>
                {
                    /**
                     * Layout panel
                     */
                    (panelMode.panel === 0) && <SideColumnLayout />
                }
                {
                    /**
                     * Html Elements Panel
                     */
                    (panelMode.panel === 1) && <HtmlElement />
                }
                {
                    /**
                     * Layers
                     */
                    (panelMode.panel === 2) && <ElementLayer key={pageDesignState.activeElemLayer.current} />
                }
            </div>
        </div>
    )
}
