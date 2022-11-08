import React, { useState, useEffect } from 'react'
import './borderSettings.css'
export default function BorderSettings(props) {
    const [borderDetails, setBorderDetails] = useState({
        lockedAll: true,
        borderTop: {
            color: '#000000',
            thickness: 2,
            type: "solid"
        },
        borderLeft: {
            color: '#000000',
            thickness: 2,
            type: "solid"
        },
        borderRight: {
            color: '#000000',
            thickness: 2,
            type: "solid"
        },
        borderBottom: {
            color: '#000000',
            thickness: 2,
            type: "solid"
        }
    })

    useEffect(() => {
        showPrevBorder();
    }, [borderDetails])

    useEffect(() => {
        showPrevBorder();
    }, [])

    const changeLockMode = (e) => {
        if (borderDetails.lockedAll) {
            setBorderDetails({ ...borderDetails, lockedAll: !borderDetails.lockedAll })
        }
        else {
            setBorderDetails({
                ...borderDetails,
                lockedAll: !borderDetails.lockedAll,
                borderLeft: borderDetails.borderTop,
                borderRight: borderDetails.borderTop,
                borderBottom: borderDetails.borderTop
            })
        }
    }

    const setBorderColor = (val) => {
        if (borderDetails.lockedAll) {
            setBorderDetails({
                ...borderDetails,
                borderTop: { ...borderDetails.borderTop, color: val },
                borderLeft: { ...borderDetails.borderLeft, color: val },
                borderRight: { ...borderDetails.borderRight, color: val },
                borderBottom: { ...borderDetails.borderBottom, color: val }
            })
        } else {
            setBorderDetails({ ...borderDetails, borderTop: { ...borderDetails.borderTop, color: val } })
        }
    }

    const setWidthSize = val => {
        if (borderDetails.lockedAll) {
            setBorderDetails({
                ...borderDetails,
                borderTop: { ...borderDetails.borderTop, thickness: val },
                borderLeft: { ...borderDetails.borderLeft, thickness: val },
                borderRight: { ...borderDetails.borderRight, thickness: val },
                borderBottom: { ...borderDetails.borderBottom, thickness: val }
            })
        } else {
            setBorderDetails({ ...borderDetails, borderTop: { ...borderDetails.borderTop, thickness: val } })
        }
    }

    const setBorderType = val => {
        if (borderDetails.lockedAll) {
            setBorderDetails({
                ...borderDetails,
                borderTop: { ...borderDetails.borderTop, type: val },
                borderLeft: { ...borderDetails.borderLeft, type: val },
                borderRight: { ...borderDetails.borderRight, type: val },
                borderBottom: { ...borderDetails.borderBottom, type: val }
            })
        } else {
            setBorderDetails({ ...borderDetails, borderTop: { ...borderDetails.borderTop, type: val } })
        }
    }



    const showPrevBorder = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        node.style.borderTop = `${borderDetails.borderTop.thickness}px ${borderDetails.borderTop.type} ${borderDetails.borderTop.color}`;
        node.style.borderLeft = `${borderDetails.borderLeft.thickness}px ${borderDetails.borderLeft.type} ${borderDetails.borderLeft.color}`;
        node.style.borderRight = `${borderDetails.borderRight.thickness}px ${borderDetails.borderRight.type} ${borderDetails.borderRight.color}`;
        node.style.borderBottom = `${borderDetails.borderBottom.thickness}px ${borderDetails.borderBottom.type} ${borderDetails.borderBottom.color}`;
    }


    return (
        <div className='border_panel'>
            <div className="border-panel-inner">
                <h5>Border:</h5>

                <div className='border-panel-shape'>
                    <div className='border-panel-shape-top'>
                        <div className="linedetails">
                            <input type={"color"} value={borderDetails.borderTop.color} onChange={(e) => setBorderColor(e.target.value)} />
                            <input
                                type={"number"}
                                value={borderDetails.borderTop.thickness}
                                onChange={(e) => (e.target.value > 0 && e.target.value < 11) ? setWidthSize(e.target.value) : ""} />
                            <select onChange={(e) => setBorderType(e.target.value)}>
                                <option value="none">none</option>
                                <option value="solid">Solid</option>
                                <option value="dotted">dotted</option>
                                <option value="dashed">dashed</option>
                            </select>
                        </div>
                        <div className="line-pr" style={{ borderTop: `${borderDetails.borderTop.thickness}px ${borderDetails.borderTop.type} ${borderDetails.borderTop.color}` }}></div>

                    </div>
                    <div className="border-mid-cols">
                        <div className='border-panel-shape-left'>
                            <div className="linedetails">
                                {(!borderDetails.lockedAll) && <input type={"color"} value={borderDetails.borderLeft.color} onChange={(e) => setBorderDetails({ ...borderDetails, borderLeft: { ...borderDetails.borderLeft, color: e.target.value } })} />}
                                {(!borderDetails.lockedAll) && <input
                                    type={"number"}
                                    value={borderDetails.borderLeft.thickness}
                                    onChange={(e) => (e.target.value > 0 && e.target.value < 11) ? setBorderDetails({ ...borderDetails, borderLeft: { ...borderDetails.borderLeft, thickness: e.target.value } }) : ""} />}
                                {(!borderDetails.lockedAll) && <select onChange={(e) => setBorderDetails({ ...borderDetails, borderLeft: { ...borderDetails.borderLeft, type: e.target.value } })}>
                                    <option value="none">none</option>
                                    <option value="solid" selected={true}>Solid</option>
                                    <option value="dotted">dotted</option>
                                    <option value="dashed">dashed</option>
                                </select>}
                            </div>
                            <div className="line-pr" style={{ borderLeft: `${borderDetails.borderLeft.thickness}px ${borderDetails.borderLeft.type} ${borderDetails.borderLeft.color}` }}></div>

                        </div>
                        <div className="lockregion">

                            <button className={(borderDetails.lockedAll) ? "locked" : "unlocked"} onClick={changeLockMode}><i className={(borderDetails.lockedAll) ? "las la-lock" : "las la-unlock"}></i></button>
                        </div>
                        <div className='border-panel-shape-right'>
                            <div className="linedetails">
                                {(!borderDetails.lockedAll) && <input type={"color"} value={borderDetails.borderRight.color} onChange={(e) => setBorderDetails({ ...borderDetails, borderRight: { ...borderDetails.borderRight, color: e.target.value } })} />}
                                {(!borderDetails.lockedAll) && <input
                                    type={"number"}
                                    value={borderDetails.borderRight.thickness}
                                    onChange={(e) => (e.target.value > 0 && e.target.value < 11) ? setBorderDetails({ ...borderDetails, borderRight: { ...borderDetails.borderRight, thickness: e.target.value } }) : ""} />}
                                {(!borderDetails.lockedAll) && <select onChange={(e) => setBorderDetails({ ...borderDetails, borderRight: { ...borderDetails.borderRight, type: e.target.value } })}>
                                    <option value="none">none</option>
                                    <option value="solid">Solid</option>
                                    <option value="dotted">dotted</option>
                                    <option value="dashed">dashed</option>
                                </select>}
                            </div>
                            <div className="line-pr" style={{ borderRight: `${borderDetails.borderRight.thickness}px ${borderDetails.borderRight.type} ${borderDetails.borderRight.color}` }}></div>

                        </div>
                    </div>
                    <div className='border-panel-shape-bottom'>
                        <div className="line-pr" style={{ borderBottom: `${borderDetails.borderBottom.thickness}px ${borderDetails.borderBottom.type} ${borderDetails.borderBottom.color}` }}></div>

                        <div className="linedetails">
                            {(!borderDetails.lockedAll) && <input type={"color"} value={borderDetails.borderBottom.color} onChange={(e) => setBorderDetails({ ...borderDetails, borderBottom: { ...borderDetails.borderBottom, color: e.target.value } })} />}
                            {(!borderDetails.lockedAll) && <input
                                type={"number"}
                                value={borderDetails.borderBottom.thickness}
                                onChange={(e) => (e.target.value > 0 && e.target.value < 11) ? setBorderDetails({ ...borderDetails, borderBottom: { ...borderDetails.borderBottom, thickness: e.target.value } }) : ""} />}
                            {(!borderDetails.lockedAll) && <select onChange={(e) => setBorderDetails({ ...borderDetails, borderBottom: { ...borderDetails.borderBottom, type: e.target.value } })}>
                                <option value="none">none</option>
                                <option value="solid">Solid</option>
                                <option value="dotted">dotted</option>
                                <option value="dashed">dashed</option>
                            </select>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
