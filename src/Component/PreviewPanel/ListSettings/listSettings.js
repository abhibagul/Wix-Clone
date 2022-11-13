import React, { useContext, useState, useEffect, useRef } from 'react'
import { pageDesignContext } from '../../../Context/contexts'
import { set, get } from "lodash";
import EmojiPicker from 'emoji-picker-react';

import './listSettings.css'

export default function ListSettings(props) {

    let pageDesignState = useContext(pageDesignContext);
    let [listSetting, setListSetting] = useState({
        elemType: "ul",
        listStyleType: "initial",
        listStylePosition: "outside",
        preFix: "😊",
        showPicker: false,
        textPreFix: "-"
    })

    let showEmojiOptions = useRef(null);

    const directChangeListType = (e) => {
        if (e.target.value !== "none") {
            let currentNode = props.currentlyActive.current;
            let __current_elem = getNodeData(currentNode, 0)
            __current_elem.elemType = e.target.value;
            setNodeData(currentNode, 0, __current_elem);
        }
    }

    useEffect(() => {
        prevListStyle();
    }, [listSetting])

    const prevListStyle = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        if (listSetting.listStyleType === "custom") {
            node.style.listStyleType = '"' + listSetting.preFix + '"';
        } else if (listSetting.listStyleType === "customTxt") {
            node.style.listStyleType = '"' + listSetting.textPreFix + '"';
        }
        else {
            node.style.listStyleType = listSetting.listStyleType;
        }
        node.style.listStylePosition = listSetting.listStylePosition;
    }

    const getCurrentListType = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)
        if (__current_elem) return __current_elem.elemType;
        else return null
    }

    const applyStylingAndPosition = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };
        let __apply_bg;
        if (listSetting.listStyleType === "custom") {
            __apply_bg = {
                listStylePosition: listSetting.listStylePosition,
                listStyleType: '"' + listSetting.preFix + '"'
            }
        } else if (listSetting.listStyleType === "customTxt") {
            __apply_bg = {
                listStylePosition: listSetting.listStylePosition,
                listStyleType: '"' + listSetting.textPreFix + '"'
            }
        } else {
            __apply_bg = {
                listStyleType: listSetting.listStyleType,
                listStylePosition: listSetting.listStylePosition
            }
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();
    }

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

    return (
        <div className='ListSettingsPanel'>
            <div className="ListSettingsPanelInner">
                <h5>List Type</h5>
                <select onChange={directChangeListType}>
                    <option selected={(getCurrentListType() === "ul") ? true : false} value={"ul"}>Unordered List</option>
                    <option selected={(getCurrentListType() === "ol") ? true : false} value={"ol"}>Ordered List 2</option>
                </select>

                <h5>List Styling</h5>
                <select onChange={(e) => setListSetting({ ...listSetting, listStyleType: e.target.value })}>
                    {
                        (getCurrentListType() === "ul") && <>
                            <option value={"disc"}>Disc</option>
                            <option value={"circle"}>Circle</option>
                            <option value={"square"}>Square</option>
                            <option value={"custom"}>Custom Emoji</option>
                            <option value={"customTxt"}>Custom Text</option>
                        </>
                    }

                    {
                        (getCurrentListType() === "ol") && <>
                            <option value={"upper-roman"}>Roman</option>
                            <option value={"lower-alpha"}>Alphabet</option>
                            <option value={"custom"}>Custom Emoji</option>
                            <option value={"customTxt"}>Custom Text</option>
                        </>
                    }
                </select>

                {
                    (listSetting.listStyleType === "custom") && <>
                        <div className="emojiPickerOuter">
                            <h5>Select custom prefix</h5>
                            <button onClick={() => { showEmojiOptions.current.classList.toggle("show") }}>{listSetting.preFix}</button>
                            <div className='emojiPicker' ref={showEmojiOptions}>
                                <EmojiPicker height="200px" width="100%" size="12" onEmojiClick={(e) => { setListSetting({ ...listSetting, preFix: e.emoji }) }} />
                            </div>
                        </div>
                    </>
                }

                {
                    (listSetting.listStyleType === "customTxt") && <>
                        <div className="textPreFix">
                            <h5>Custom text prefix</h5>
                            <input value={listSetting.textPreFix} onChange={(e) => setListSetting({ ...listSetting, textPreFix: e.target.value })}></input>
                        </div>
                    </>
                }

                <h5>List Bullet Position</h5>
                <select onChange={(e) => setListSetting({ ...listSetting, listStylePosition: e.target.value })}>
                    <option value={"outside"}>Outside</option>
                    <option value={"inside"}>Inside</option>
                </select>


                <div className='applyStyle'>
                    <button onClick={applyStylingAndPosition}>Save Styling and Position</button>
                </div>
            </div>
        </div>
    )
}
