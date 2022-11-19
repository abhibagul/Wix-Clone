import React, { useState, useEffect, useContext, useRef } from 'react'
import { set, get } from "lodash";
import { pageDesignContext } from '../../../Context/contexts';
import './headerSettings.css';
export default function HeaderSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    let [headerSetting, setHeaderSetting] = useState({
        headerPosition: "static",
        positionDir: "top",
        positions: {
            topEl: null,
            bottomEl: null
        }
    });

    useEffect(() => {
        loadInitialHeaderSettings();
    }, [])

    useEffect(() => {
        prevHeaderPosition();
    }, [headerSetting])

    useEffect(() => {
        //waits for .2s transition to finish
        setTimeout(() => {
            prevHeaderPosition();
        }, 200);
    }, [pageDesignState.design.pageMode])

    const setNodeData = (elString, level, data, offset) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString, level, offset) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        return get(pageDesignState.design, _node_path);
    }

    const loadInitialHeaderSettings = () => {
        let __headerSetting = getNodeData(props.currentlyActive.current, 0, '["styles"]');
        if (__headerSetting && (__headerSetting === "static" || __headerSetting === "sticky" || __headerSetting === "fixed" || __headerSetting === "absolute")) {

            let __temp_style_setter = { headerPosition: __headerSetting.position };

            if (__headerSetting !== "static") {
                if (__headerSetting.hasOwnProperty("top")) {
                    __temp_style_setter = { ...__temp_style_setter, positions: { topEl: __headerSetting.top } }
                } else if (__headerSetting.hasOwnProperty("bottom")) {
                    __temp_style_setter = { ...__temp_style_setter, positions: { bottomEl: __headerSetting.bottom } }
                }
            }


            setHeaderSetting({ ...headerSetting, ...__temp_style_setter })
        }
    }


    const prevHeaderPosition = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");

        //will need to apply this to parent to show it to user
        node = node.closest("section");

        node.style.position = headerSetting.headerPosition;

        let parentWid = document.querySelector("[data-prevpanel]").getBoundingClientRect();
        node.style.width = (headerSetting.headerPosition === "fixed") ? parentWid.width + "px" : "100%";
        node.style.zIndex = "200";

        if (headerSetting.headerPosition !== "static") {

            if (headerSetting.positions.topEl !== null) {
                node.style.bottom = "initial";
                node.style.top = (headerSetting.headerPosition === "fixed") ? (headerSetting.positions.topEl + 40) + "px" : headerSetting.positions.topEl + "px";
            }
            if (headerSetting.positions.bottomEl !== null) {
                node.style.top = "initial";
                node.style.bottom = headerSetting.positions.bottomEl + "px";
            }
            if (headerSetting.positions.topEl === null && headerSetting.positions.bottomEl === null) {

                node.style.top = (headerSetting.headerPosition === "fixed") ? "40px" : "0px"
            }
        }
    }


    const setHeaderStyles = (e) => {
        let __temp_style_setter = {};
        let __el;
        if (e.target.hasAttribute("data-header-position")) {
            __el = e.target;
        } else {
            __el = e.target.closest("[data-header-position]")
        }

        if (!__el) {
            return;
        }

        __temp_style_setter = { ...__temp_style_setter, headerPosition: __el.getAttribute("data-header-value") }
        setHeaderSetting({ ...headerSetting, ...__temp_style_setter })
    }


    const setPosValue = (e) => {


        let __temp_style_setter = { ...headerSetting };

        if (headerSetting.positionDir === "top") {
            __temp_style_setter.positions.topEl = +e.target.value;
            __temp_style_setter.positions.bottomEl = null;
        }
        if (headerSetting.positionDir === "bottom") {
            __temp_style_setter.positions.topEl = null;
            __temp_style_setter.positions.bottomEl = +e.target.value;
        }

        setHeaderSetting({ ...headerSetting, ...__temp_style_setter })
    }

    const setHeaderType = (e) => {
        let __temp_style_setter = {};


        if (e.target.value === "top") __temp_style_setter = { positions: { topEl: 0, bottomEl: null } }
        else __temp_style_setter = { positions: { topEl: null, bottomEl: 0 } }


        setHeaderSetting({ ...headerSetting, positionDir: e.target.value, ...__temp_style_setter })
    }

    const saveHeaderSettings = () => {
        let __headerSetting = getNodeData(props.currentlyActive.current, 0, '["styles"]');
        //generate styles
        let __temp_style_setter = { ...__headerSetting, position: headerSetting.headerPosition };

        if (headerSetting.positionDir === "top") {
            __temp_style_setter = { ...__temp_style_setter, top: headerSetting.positions.topEl + "px" }
        }
        if (headerSetting.positionDir === "bottom") {
            __temp_style_setter = { ...__temp_style_setter, bottom: headerSetting.positions.bottomEl + "px" }
        }

        setNodeData(props.currentlyActive.current, 0, __temp_style_setter, '["styles"]');

        alert("Saved!");
        //close panel
        props.closePanel();
    }

    return (
        <div className='headerPositionSetting'>
            <div className="hederPositionSettingInner">
                <h5>Select Option</h5>
                <div className='headerPosOps'>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value="static" data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/static.jpg' />
                        <span>Static Position</span>
                    </div>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value="absolute" data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/absolute.jpg' />
                        <span>Over Content</span>
                    </div>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value="sticky" data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/sticky.jpg' />
                        <span>Sticky</span>
                    </div>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value="fixed" data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/fixed.jpg' />
                        <span>Always Show</span>
                    </div>
                </div>
            </div>

            {(headerSetting.headerPosition !== "static") && <>
                <h5>Position</h5>
                <select onChange={setHeaderType}>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </select>
                <div className='headerPositionValue'>
                    <input onChange={setPosValue} type={"range"} value={(headerSetting.positionDir === "top") ? (headerSetting.positions.topEl === null) ? 0 : headerSetting.positions.topEl : (headerSetting.positions.bottomEl === null) ? 0 : headerSetting.positions.bottomEl} />
                    <span>{(headerSetting.positionDir === "top") ? (headerSetting.positions.topEl === null) ? 0 : headerSetting.positions.topEl : (headerSetting.positions.bottomEl === null) ? 0 : headerSetting.positions.bottomEl}px</span>
                </div>
            </>}

            <div className='applyHeaderSettings'>
                <button onClick={saveHeaderSettings}>Save Header</button>
            </div>
        </div>
    )
}
