import React, { useState, useEffect, useContext } from 'react'
import { set, get } from "lodash";
import { pageDesignContext } from '../../../../Context/contexts';
import './borderSettings.css'
export default function BorderSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    const [borderDetails, setBorderDetails] = useState({
        lockedAll: true,
        borderTop: {
            color: '#000000',
            thickness: 2,
            type: "none"
        },
        borderLeft: {
            color: '#000000',
            thickness: 2,
            type: "none"
        },
        borderRight: {
            color: '#000000',
            thickness: 2,
            type: "none"
        },
        borderBottom: {
            color: '#000000',
            thickness: 2,
            type: "none"
        }
    })

    useEffect(() => {
        showPrevBorder();
    }, [borderDetails])

    useEffect(() => {
        showPrevBorder();
    }, [])

    const setNodeData = (elString, level, data) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString, level) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        return get(pageDesignState.design, _node_path);
    }


    const applyBorderStyle = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };

        let __apply_bg = {
            borderTop: `${borderDetails.borderTop.thickness}px ${borderDetails.borderTop.type} ${borderDetails.borderTop.color}`,
            borderLeft: `${borderDetails.borderLeft.thickness}px ${borderDetails.borderLeft.type} ${borderDetails.borderLeft.color}`,
            borderRight: `${borderDetails.borderRight.thickness}px ${borderDetails.borderRight.type} ${borderDetails.borderRight.color}`,
            borderBottom: `${borderDetails.borderBottom.thickness}px ${borderDetails.borderBottom.type} ${borderDetails.borderBottom.color}`
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();

    }

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
                                <option value="double">Double</option>
                                <option value="groove">Groove</option>
                                <option value="ridge">Ridge</option>
                                <option value="inset">Inset</option>
                                <option value="outset">Outset</option>
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
                                    <option value="solid">Solid</option>
                                    <option value="dotted">dotted</option>
                                    <option value="dashed">dashed</option>
                                    <option value="double">Double</option>
                                    <option value="groove">Groove</option>
                                    <option value="ridge">Ridge</option>
                                    <option value="inset">Inset</option>
                                    <option value="outset">Outset</option>
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
                                    <option value="double">Double</option>
                                    <option value="groove">Groove</option>
                                    <option value="ridge">Ridge</option>
                                    <option value="inset">Inset</option>
                                    <option value="outset">Outset</option>
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
                                <option value="double">Double</option>
                                <option value="groove">Groove</option>
                                <option value="ridge">Ridge</option>
                                <option value="inset">Inset</option>
                                <option value="outset">Outset</option>
                            </select>}
                        </div>

                    </div>
                </div>

                <div className='border-apply'>
                    <button onClick={applyBorderStyle}>Apply</button>
                </div>
            </div>
        </div>
    )
}
