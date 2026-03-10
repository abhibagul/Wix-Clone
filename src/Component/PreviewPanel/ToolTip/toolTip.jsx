import React from 'react'
import './toolTip.css'

export default function ToolTip(props) {
    return (
        <span className="custom-tooltip-wrapper">
            <i className={props.iconclass}></i>
            <span className="custom-tooltip-content">{props.tooltipcontent}</span>
        </span>
    )
}
