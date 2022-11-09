import React, { useEffect, useContext, useState } from 'react'
import { set, get } from "lodash";
import { pageDesignContext } from '../../../../Context/contexts';

import './borderRadiusSettings.css'

export default function BorderRadiusSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    const [borderRadiusProps, setBorderRadiusProps] = useState({
        lockedAll: true,
        borderRadiusTopLeft: 0,
        borderRadiusTopRight: 0,
        borderRadiusBottomLeft: 0,
        borderRadiusBottomRight: 0,
    })

    const changeLockMode = () => {
        setBorderRadiusProps({ ...borderRadiusProps, lockedAll: !borderRadiusProps.lockedAll })
    }

    useEffect(() => {
        updateBorderRadPrev();
    }, [borderRadiusProps])

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


    const updateBorderRadPrev = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        if (borderRadiusProps.lockedAll) {

            node.style.borderRadius = borderRadiusProps.borderRadiusTopLeft + "px"
        } else {

            node.style.borderTopLeftRadius = borderRadiusProps.borderRadiusTopLeft + "px"
            node.style.borderTopRightRadius = borderRadiusProps.borderRadiusTopRight + "px"
            node.style.borderBottomLeftRadius = borderRadiusProps.borderRadiusBottomLeft + "px"
            node.style.borderBottomRightRadius = borderRadiusProps.borderRadiusBottomRight + "px"
        }
    }

    const saveBorderRadius = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };
        let __apply_bg;
        if (borderRadiusProps.lockedAll) {
            __apply_bg = {
                borderRadius: borderRadiusProps.borderRadiusTopLeft + "px"
            }
        } else {
            __apply_bg = {
                borderTopLeftRadius: borderRadiusProps.borderRadiusTopLeft + "px",
                borderTopRightRadius: borderRadiusProps.borderRadiusTopRight + "px",
                borderBottomLeftRadius: borderRadiusProps.borderRadiusBottomLeft + "px",
                borderBottomRightRadius: borderRadiusProps.borderRadiusBottomRight + "px"
            }
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();
    }

    return (
        <div className='borderRadiusPanel'>
            <div className="borderRadiusPanelInner">
                <h5>Border Radius</h5>
                <div className="border-radius-box"
                    style={
                        (borderRadiusProps.lockedAll) ? { borderRadius: (borderRadiusProps.borderRadiusTopLeft > 40) ? "40px" : borderRadiusProps.borderRadiusTopLeft + "px" } : {
                            borderTopLeftRadius: (borderRadiusProps.borderRadiusTopLeft > 40) ? "40px" : borderRadiusProps.borderRadiusTopLeft + "px",
                            borderTopRightRadius: (borderRadiusProps.borderRadiusTopRight > 40) ? "40px" : borderRadiusProps.borderRadiusTopRight + "px",
                            borderBottomLeftRadius: (borderRadiusProps.borderRadiusBottomLeft > 40) ? "40px" : borderRadiusProps.borderRadiusBottomLeft + "px",
                            borderBottomRightRadius: (borderRadiusProps.borderRadiusBottomRight > 40) ? "40px" : borderRadiusProps.borderRadiusBottomRight + "px"
                        }}>
                    <input onChange={(e) => setBorderRadiusProps({ ...borderRadiusProps, borderRadiusTopLeft: +e.target.value })} value={borderRadiusProps.borderRadiusTopLeft} className={(borderRadiusProps.lockedAll) ? "border-radius-input top-left lockedpos" : 'border-radius-input top-left'} type={"number"} min="0"></input>
                    {
                        (!borderRadiusProps.lockedAll) &&
                        <>
                            <input onChange={(e) => setBorderRadiusProps({ ...borderRadiusProps, borderRadiusTopRight: +e.target.value })} value={borderRadiusProps.borderRadiusTopRight} className='border-radius-input top-right' type={"number"} min="0"></input>
                            <input onChange={(e) => setBorderRadiusProps({ ...borderRadiusProps, borderRadiusBottomLeft: +e.target.value })} value={borderRadiusProps.borderRadiusBottomLeft} className='border-radius-input bottom-left' type={"number"} min="0"></input>
                            <input onChange={(e) => setBorderRadiusProps({ ...borderRadiusProps, borderRadiusBottomRight: +e.target.value })} value={borderRadiusProps.borderRadiusBottomRight} className='border-radius-input bottom-right' type={"number"} min="0"></input>
                        </>
                    }<button className={(borderRadiusProps.lockedAll) ? "locked" : "unlocked"} onClick={changeLockMode}><i className={(borderRadiusProps.lockedAll) ? "las la-lock" : "las la-unlock"}></i></button>
                </div>
                <div className='applyBorderRadius'>
                    <button onClick={saveBorderRadius}>Apply</button>
                </div>
            </div>
        </div>
    )
}
