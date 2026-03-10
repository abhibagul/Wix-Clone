import React, { useState, useEffect, useContext } from 'react'
import { pageDesignContext } from '../../../../Context/contexts';
import { set, get } from "lodash";

import './boxShadowSetting.css'

export default function BoxShadowSetting(props) {

    let pageDesignState = useContext(pageDesignContext);

    const [boxShadows, setBoxShadows] = useState({
        shadows: [
            {
                distanceY: 5,
                distanceX: 5,
                blur: 5,
                color: '#000000',
                opacity: 10,
                inset: false
            }
        ]
    });

    useEffect(() => {
        showShadowPrev();
    }, [boxShadows])

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



    const hexToRgb = (hex) => {
        let _hex = hex.replace("#", "");
        var bigint = parseInt(_hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return { r, g, b };
    }

    const genrateShadowString = () => {
        let _shadow_str = [];

        for (let i of boxShadows.shadows) {
            let __rgbClr = hexToRgb(i.color);

            _shadow_str.push(`${(i.inset) ? "inset" : ""} ${i.distanceX}px ${i.distanceY}px ${i.blur}px rgba(${__rgbClr.r},${__rgbClr.g},${__rgbClr.b},${(i.opacity / 100)})`)
        }

        return _shadow_str.join(",");
    }

    const showShadowPrev = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        node.style.boxShadow = genrateShadowString();
    }

    const setShadowProp = (e, prp, v) => {
        let __allShadows = [...boxShadows.shadows];

        __allShadows[+e.target.getAttribute("data-shadow-index")][prp] = v;

        setBoxShadows({ ...boxShadows, shadows: __allShadows });
    }

    const removeShadow = (e) => {
        let __allShadows = [...boxShadows.shadows];
        __allShadows.splice(+e.target.getAttribute("data-shadow-index"), 1);
        setBoxShadows({ ...boxShadows, shadows: __allShadows });
    }

    const applyBoxShadow = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };

        let __apply_bg = {
            boxShadow: genrateShadowString()
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();
    }

    return (
        <div className='boxShadowPanel'>
            <div className='boxShadowPanelInner'>
                <h5>Box shadow</h5>
                <div className='boxShadowsInputs'>
                    {boxShadows.shadows.map((e, i) => {
                        return (<div className="boxShadowInput" key={i}>
                            <div className='boxShadowInputContainer' data-switch-shadow>
                                <div className='boxShadowColor'>
                                    <input className='shadowColor' onChange={(e) => setShadowProp(e, "color", e.target.value)} data-shadow-index={i} value={e.color} title='color' type="color"></input>
                                    <input className='shadowOpacityRange' onChange={(e) => setShadowProp(e, "opacity", +e.target.value)} max={100} min={0} data-shadow-index={i} value={e.opacity} title='opacity' type="range"></input>
                                    <button className='toggleSwitch' onClick={(e) => {
                                        e.target.closest("[data-switch-shadow]").querySelector(".boxShadowRange").classList.toggle("hidden");

                                        if (e.target.classList.contains("toggleSwitch")) {

                                            e.target.classList.toggle("active");
                                        } else {
                                            e.target.closest(".toggleSwitch").classList.toggle("active")
                                        }
                                    }}><i className="las la-sliders-h"></i></button>
                                    {(boxShadows.shadows.length > 1) && <button className='removeShadow' data-shadow-index={i} onClick={removeShadow}><i className="las la-trash-alt"></i></button>}
                                </div>
                                <div className='boxShadowRange hidden'>
                                    <h5>Shadow type</h5>
                                    <select data-shadow-index={i} onChange={(e) => setShadowProp(e, "inset", (e.target.value == "t") ? true : false)}>
                                        <option value={"f"} selected={(e.inset) ? false : true}>Outer</option>
                                        <option value={"t"} selected={(!e.inset) ? false : true}>Inset</option>
                                    </select>
                                    <h5>distanceX</h5>
                                    <input className='shadowDistanceRange' min={-200} max={200} onChange={(e) => setShadowProp(e, "distanceX", +e.target.value)} data-shadow-index={i} value={e.distanceX} title='DistanceX' type="range"></input>
                                    <h5>DistanceY</h5>
                                    <input className='shadowAngleRange' min={-200} max={200} onChange={(e) => setShadowProp(e, "distanceY", +e.target.value)} data-shadow-index={i} value={e.distanceY} title='DistanceY' type="range"></input>
                                    <h5>Blur</h5>
                                    <input className='shadowBlurRange' onChange={(e) => setShadowProp(e, "blur", +e.target.value)} data-shadow-index={i} value={e.blur} title='Blur' type="range"></input>
                                </div>
                            </div>
                        </div>)
                    })}

                    <div className='addMoreShadow'>
                        <button onClick={() => setBoxShadows({
                            ...boxShadows, shadows: [...boxShadows.shadows, {
                                distanceY: 5,
                                distanceX: 5,
                                blur: 5,
                                color: '#000000',
                                opacity: 10,
                                inset: false
                            }]
                        })}><i className="las la-plus-circle"></i> Add Shadow</button>
                    </div>
                </div>
                <div className='boxShadowApply'>
                    <button onClick={applyBoxShadow}>Apply</button>
                </div>
            </div>
        </div >
    )
}
