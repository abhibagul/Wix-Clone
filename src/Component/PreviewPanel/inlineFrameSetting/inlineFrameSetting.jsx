import React, { useState, useEffect, useRef, useContext } from 'react'
import { pageDesignContext } from '../../../Context/contexts';
import { set, get } from "lodash";

import './iframeSettings.css'

export default function InlineFrameSetting(props) {

    let pageDesignState = useContext(pageDesignContext)

    const [iSetting, setISetting] = useState({
        src: "https://google.com",
        width: 200,
        height: 300,
        widthUnit: "px",
        heightUnit: "px",
        allowtransparency: "true",
        gotDetails: false,
    })

    useEffect(() => {
        //set initial values
        initialIframeData();
    }, [])

    useEffect(() => {
        if (iSetting.gotDetails) {
            updateElPrev();
        }
    }, [iSetting]);

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

    const updateElPrev = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        node.setAttribute("src", iSetting.src);
        node.setAttribute("allowtransparency", iSetting.allowtransparency);

        if (iSetting.heightUnit === "auto")
            node.setAttribute("height", iSetting.heightUnit)
        else
            node.setAttribute("height", iSetting.height + iSetting.heightUnit)

        if (iSetting.widthUnit === "auto")
            node.setAttribute("width", iSetting.widthUnit)
        else
            node.setAttribute("width", iSetting.width + iSetting.widthUnit)
    }

    const initialIframeData = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        if (node && !iSetting.gotDetails) {

            let WidthUnit = "px";
            if (node.getAttribute("width").indexOf("%") != -1) {
                WidthUnit = "%";
            }
            if (isNaN(parseInt(node.getAttribute("width"), 10))) {
                WidthUnit = "auto";
            }

            let HeightUnit = "px";
            if (node.getAttribute("height").indexOf("%") != -1) {
                HeightUnit = "%";
            }
            if (isNaN(parseInt(node.getAttribute("height"), 10))) {
                HeightUnit = "auto";
            }

            setISetting({
                ...iSetting,
                src: node.getAttribute("src"),
                height: parseInt(node.getAttribute("height"), 10),
                width: parseInt(node.getAttribute("width"), 10),
                gotDetails: true,
                widthUnit: WidthUnit,
                heightUnit: HeightUnit,
                allowtransparency: node.getAttribute("allowtransparency")
            })


        }
    }

    const saveIframeSettings = () => {
        let currentNode = props.currentlyActive.current;

        let __el = getNodeData(currentNode, 0);

        let __new_attr = {
            src: iSetting.src,
            allowtransparency: iSetting.allowtransparency
        }

        if (iSetting.heightUnit === "auto")
            __new_attr = { ...__new_attr, height: iSetting.heightUnit }
        else
            __new_attr = { ...__new_attr, height: iSetting.height + iSetting.heightUnit }

        if (iSetting.widthUnit === "auto")
            __new_attr = { ...__new_attr, width: iSetting.widthUnit }
        else
            __new_attr = { ...__new_attr, width: iSetting.width + iSetting.widthUnit }

        if (__el.attributes.length > 0) {
            __new_attr = { ...__el.attributes, __new_attr }
        }

        __el.attributes = __new_attr;

        setNodeData(currentNode, 0, __el);

        //close panel
        props.closePanel();
    }

    return (
        <div className='iFrameSettingPanel'>
            <div className="iFrameSettingInner">
                <div className="isetGroup">
                    <h5>Iframe link:</h5>
                    <input type={"text"} onChange={(e) => setISetting({ ...iSetting, src: e.target.value })} value={iSetting.src}></input>
                </div>
                <div className="isetGroup">
                    <h5>Transperency:</h5>
                    <select onChange={(e) => setISetting({ ...iSetting, allowtransparency: e.target.value })}>
                        <option value="true">Allow</option>
                        <option value="false">Dont Allow</option>
                    </select>
                </div>
                <div className='imageSizing'>
                    <div className='imgSizeCol imageSizeWid'>
                        <span>Width</span>
                        <div className='innerSizeCol'>
                            {
                                (iSetting.widthUnit !== "auto") &&
                                <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setISetting({ ...iSetting, width: +e.target.value }) : ""} value={iSetting.width}></input>
                            }



                            <select className={(iSetting.widthUnit === "auto") ? "fullSizeUnit" : ""} onChange={(e) => setISetting({ ...iSetting, widthUnit: e.target.value })}>
                                <option selected={(iSetting.widthUnit === "px") ? true : false} value={"px"}>px</option>
                                <option selected={(iSetting.widthUnit === "%") ? true : false} value={"%"}>%</option>
                                <option selected={(iSetting.widthUnit === "auto") ? true : false} value={"auto"}>auto</option>
                            </select>
                        </div>
                    </div>
                    <div className='imgSizeCol imageSizeWid'>
                        <span>Height</span>
                        <div className='innerSizeCol'>
                            {
                                (iSetting.heightUnit !== "auto") &&
                                <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setISetting({ ...iSetting, height: +e.target.value }) : ""} value={iSetting.height}></input>
                            }

                            <select className={(iSetting.heightUnit === "auto") ? "fullSizeUnit" : ""} onChange={(e) => setISetting({ ...iSetting, heightUnit: e.target.value })}>
                                <option selected={(iSetting.heightUnit == "px") ? true : false} value={"px"}>px</option>
                                <option selected={(iSetting.heightUnit == "%") ? true : false} value={"%"}>%</option>
                                <option selected={(iSetting.heightUnit == "auto") ? true : false} value={"auto"}>auto</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='applyImageSettings'>
                    <button onClick={saveIframeSettings}>Apply</button>
                </div>
            </div>
        </div>
    )
}
