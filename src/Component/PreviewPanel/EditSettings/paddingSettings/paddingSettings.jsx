import React, { useState, useEffect, useRef, useContext } from 'react'

import { pageDesignContext } from '../../../../Context/contexts';
import { set, get } from "lodash";

import './paddingSettings.css'

export default function PaddingSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    const [elPadding, setElPadding] = useState({
        lockedAll: true,
        paddingTop: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingRight: 0,
        setDone: false
    })

    let previewPaddingHelper = useRef(null);

    useEffect(() => {
        setExistingPadding();
    }, [])

    useEffect(() => {
        if (elPadding.setDone) showPrevPadding();
    }, [elPadding])

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



    const changeLockMode = () => {
        setElPadding({ ...elPadding, lockedAll: !elPadding.lockedAll })
    }

    const setExistingPadding = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        setElPadding({
            ...elPadding,
            paddingTop: parseInt(node.style.paddingTop, 10),
            paddingLeft: parseInt(node.style.paddingLeft, 10),
            paddingBottom: parseInt(node.style.paddingBottom, 10),
            paddingRight: parseInt(node.style.paddingRight, 10),
            setDone: true
        })
    }


    const showPrevPadding = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");

        if (elPadding.lockedAll) {
            node.style.padding = elPadding.paddingTop + "px";
        } else {

            node.style.paddingTop = elPadding.paddingTop + "px";
            node.style.paddingLeft = elPadding.paddingLeft + "px";
            node.style.paddingBottom = elPadding.paddingBottom + "px";
            node.style.paddingRight = elPadding.paddingRight + "px";
        }

        node.classList.add("paddingChPre");

        clearInterval(previewPaddingHelper.current);

        previewPaddingHelper.current = setTimeout(() => {
            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
            node.classList.remove("paddingChPre")
        }, 2000);
    }

    const applyPaddingDetials = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };
        let __apply_bg;
        if (elPadding.lockedAll) {
            __apply_bg = {
                padding: elPadding.paddingTop + "px"
            }
        } else {
            __apply_bg = {
                paddingTop: elPadding.paddingTop + "px",
                paddingLeft: elPadding.paddingLeft + "px",
                paddingBottom: elPadding.paddingBottom + "px",
                paddingRight: elPadding.paddingRight + "px"
            }
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();
    }


    return (
        <div className='paddingPanel'>
            <div className="paddingPanelInner">
                <h5>Paddings</h5>
                <div className='paddingBox'>
                    <input type="number" onChange={(e) =>
                        (elPadding.lockedAll) ?
                            setElPadding({ ...elPadding, paddingTop: e.target.value, paddingBottom: e.target.value, paddingRight: e.target.value, paddingLeft: e.target.value })
                            : setElPadding({ ...elPadding, paddingTop: e.target.value })

                    } value={elPadding.paddingTop} min={0} className={(elPadding.lockedAll) ? "padding-input pad-top lockedAll" : "padding-input pad-top"} />
                    {(!elPadding.lockedAll) &&
                        <>
                            <input type="number" min={0} onChange={(e) => setElPadding({ ...elPadding, paddingRight: e.target.value })} value={elPadding.paddingRight} className="padding-input pad-right" />
                            <input type="number" min={0} onChange={(e) => setElPadding({ ...elPadding, paddingBottom: e.target.value })} value={elPadding.paddingBottom} className="padding-input pad-btm" />
                            <input type="number" min={0} onChange={(e) => setElPadding({ ...elPadding, paddingLeft: e.target.value })} value={elPadding.paddingLeft} className="padding-input pad-left" />

                        </>}
                    <button className={(elPadding.lockedAll) ? "locked" : "unlocked"} onClick={changeLockMode}><i className={(elPadding.lockedAll) ? "las la-lock" : "las la-unlock"}></i></button>
                </div>
                <div className='applyPadding'>
                    <button onClick={applyPaddingDetials}>Apply</button>
                </div>
            </div>
        </div>
    )
}
