import React from 'react'
import { Tooltip } from 'react-lightweight-tooltip';

export default function ToolTip(props) {

    let tooltipStyles = {
        content: {
            backgroundColor: 'transparent',
            color: '#000',

        },
        tooltip: {
            backgroundColor: 'white',
            borderRadius: '2px',
            boxShadow: "5px 5px 10px rgb(0 0 0 / 10%), -5px -5px 10px rgb(0 0 0 / 10%)",
            textAlign: "center",
            minWidth: "auto",
            fontFamily: 'POPPINS',
            fontSize: "12px"
        },
        arrow: {
            borderTop: 'solid #f7f7f7 5px',
        },
        wrapper: {
            cursor: "pointer"
        }
    }

    return (
        <Tooltip content={props.tooltipcontent} styles={tooltipStyles}><i className={props.iconclass}></i></Tooltip>
    )
}
