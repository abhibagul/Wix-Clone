import React, { useState, useEffect, useContext } from 'react'

/**
 * Setting Panels
 */
import TextSizingSetting from './textSizingSetting/textSizingSetting'
import TextFontSetting from './textFontSettings/textFontSetting';
import TextSpacingSetting from './textSpacingSetting/textSpacingSetting';
import TextFormattingSetting from './textFormattingSetting/textFormattingSetting';
import TextShadowSetting from './textShadowSettings/textShadowSetting';

/**
 * Context
 */
import { pageDesignContext } from '../../../../Context/contexts'

/**
 * Lodash
 */
import { set, get } from "lodash";

/**
 * Styles
 */
import './textSettings.css'

export default function TextSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    const [textSetting, setTextSetting] = useState({
        panelMode: 0,
        fontFamily: "Poppins",
        fontSize: 1,
        fontWeight: 500,
        fontColor: "#000000",
        adderFont: null,
        lineHeight: 1.2,
        letterSpace: 1,
        textAlign: "left",
        textTransform: "none",
        shadows: [{
            distanceX: 2,
            distanceY: 2,
            blur: 5,
            color: "#000000",
            opacity: 40
        }]
    })

    useEffect(() => {
        prevTextDecor();
    }, [textSetting])

    const hexToRgb = (hex) => {
        let _hex = hex.replace("#", "");
        var bigint = parseInt(_hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return { r, g, b };
    }

    const genTextShadow = () => {
        let __txt_shadows = [];

        for (let i of textSetting.shadows) {
            let __rgb_shadow = hexToRgb(i.color);
            __txt_shadows.push(` ${i.distanceX}px ${i.distanceY}px ${i.blur}px rgba(${__rgb_shadow.r},${__rgb_shadow.g},${__rgb_shadow.b},${(i.opacity / 100)}) `);
        }

        return __txt_shadows.join(",");
    }

    const prevTextDecor = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        node.style.fontSize = textSetting.fontSize + "em";
        node.style.fontWeight = textSetting.fontWeight;
        node.style.color = textSetting.fontColor;
        node.style.fontFamily = textSetting.fontFamily;
        node.style.lineHeight = textSetting.lineHeight + "em";
        node.style.letterSpacing = textSetting.letterSpace + "px";
        node.style.textAlign = textSetting.textAlign
        node.style.textTransform = textSetting.textTransform
        node.style.textShadow = genTextShadow();
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

    const applyFontStyle = () => {
        //add the fonts to the reqlib
        // let __fonts = (pageDesignState.design.fonts.length > 0) ? [...pageDesignState.design.fonts, textSetting.adderFont] : [textSetting.adderFont];
        // pageDesignState.setDesign({ ...pageDesignState.design, fonts: __fonts });

        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };

        let __apply_bg = {
            fontFamily: textSetting.fontFamily,
            color: textSetting.fontColor,
            fontSize: textSetting.fontSize + "em",
            fontWeight: textSetting.fontWeight
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        alert("Font style saved.")
        //close panel
        //props.closePanel();
    }

    const applyFormattingStyle = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };

        let __apply_bg = {
            textAlign: textSetting.textAlign,
            textTransform: textSetting.textTransform,
            letterSpacing: textSetting.letterSpace + "px",
            lineHeight: textSetting.lineHeight + "em"
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        alert("Formatting Saved.")
    }

    const applyTextShadow = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };

        let __apply_bg = {
            textShadow: genTextShadow()
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        alert("Text Shadow Saved.")
    }

    return (
        <div className='textPanel'>
            <div className="txtPanelInner">
                <div className="txtPanelModes">
                    <ul>
                        <li onClick={() => setTextSetting({ ...textSetting, panelMode: 0 })} className={(textSetting.panelMode === 0) ? "txtOptionItem active" : "txtOptionItem"} >Font</li>
                        <li onClick={() => setTextSetting({ ...textSetting, panelMode: 1 })} className={(textSetting.panelMode === 1) ? "txtOptionItem active" : "txtOptionItem"} >Spacing & Alignment</li>
                        <li onClick={() => setTextSetting({ ...textSetting, panelMode: 2 })} className={(textSetting.panelMode === 2) ? "txtOptionItem active" : "txtOptionItem"} >Shadow</li>
                    </ul>
                </div>
                <div className="txtSetting">

                    {
                        <>
                            {
                                <>
                                    {
                                        /**
                                         * Font type
                                         */
                                        (textSetting.panelMode === 0) && <TextFontSetting showFontListOption={() => { pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 1 }) }} fontList={pageDesignState.design.fonts} textSetting={textSetting} setTextSetting={setTextSetting} />
                                    }
                                    {
                                        /**
                                         * Font size & Color
                                         */
                                        (textSetting.panelMode === 0) && <TextSizingSetting textSetting={textSetting} setTextSetting={setTextSetting} applyFontStyle={applyFontStyle} />
                                    }

                                    {
                                        /**
                                         * text formatting
                                         */
                                        (textSetting.panelMode === 1) && <TextFormattingSetting textSetting={textSetting} setTextSetting={setTextSetting} />
                                    }

                                    {
                                        /**
                                        * Text Spacing
                                        */
                                        (textSetting.panelMode === 1) && <TextSpacingSetting textSetting={textSetting} setTextSetting={setTextSetting} applyFormattingStyle={applyFormattingStyle} />
                                    }
                                </>
                            }

                            {
                                /**
                                * text shadows
                                */
                                (textSetting.panelMode === 2) && <TextShadowSetting textSetting={textSetting} setTextSetting={setTextSetting} applyTextShadow={applyTextShadow} />
                            }

                        </>
                    }
                </div>
            </div>

        </div>
    )
}
