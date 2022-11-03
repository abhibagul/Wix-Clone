import React, { useRef } from 'react'
import sideStyle from './sideColumn.module.css'
import SideColumnLayout from './layout/sideColumnLayout'
import HtmlElement from './elements/htmlElement';
export default function SideColumn() {
    const markerpos = useRef(null);

    const updateMarkerPos = (e) => {
        markerpos.current.style.scale = 1;
        markerpos.current.style.top = (e.target.getBoundingClientRect().top + 0) + "px";
    }


    return (
        <div className={sideStyle["sidebar"]}>
            <div className={sideStyle["sidebar_optionsbar"]}>
                <ul className={sideStyle["sidebar_optionbar_options"]}>
                    <li className={sideStyle["active"]} onMouseEnter={updateMarkerPos}><a href='/'><i className="las la-th-large"></i></a></li>
                    <li onMouseEnter={updateMarkerPos}><a href='/'><i className="las la-plus-circle"></i></a></li>
                    <li onMouseEnter={updateMarkerPos}><a href='/'><i className="las la-laptop-code"></i></a></li>
                </ul>
                <span ref={markerpos} className={sideStyle["sidebar_option_highlighter"]}></span>
            </div>
            <div className={sideStyle["sidebar_optionResults"]}>
                <SideColumnLayout />
                <HtmlElement />
            </div>
        </div>
    )
}
