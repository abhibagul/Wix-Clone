import React, { useContext, useState, useEffect } from 'react'
import { pageDesignContext } from '../../../Context/contexts'
import FontPicker from "font-picker-react";
import './fontManager.css'
export default function FontManager(props) {
    let pageDesignState = useContext(pageDesignContext);

    let [fontOptions, setFontOptions] = useState({
        fonts: [...pageDesignState.design.fonts]
    })




    const createFontJson = (i) => {

        let __weights = [];

        if (i.variants.includes("300")) {
            __weights.push("300");
        }
        if (i.variants.includes("regular")) {
            __weights.push("regular");
        }
        if (i.variants.includes("700")) {
            __weights.push("700");
        }

        let __temp_font = {
            font: i.family,
            weights: __weights
        }

        return __temp_font;
    }

    const deleteFontOption = (e) => {
        let __font_opt = [...fontOptions.fonts];
        __font_opt.splice(+e.target.getAttribute("data-font-index"), 1);
        setFontOptions({ ...fontOptions, fonts: __font_opt })
    }

    const fontSpeed = () => {
        if (fontOptions.fonts.length > 3) {
            return "Slow"
        }
        if (fontOptions.fonts.length > 2) {
            return "Medium"
        }
        if (fontOptions.fonts.length > 0) {
            return "Fast"
        }

        return "-"

    }

    const fontSpeedColor = () => {
        if (fontOptions.fonts.length > 3) {
            return { background: "#dc3545" }
        }
        if (fontOptions.fonts.length > 2) {
            return { background: "#fd7e14" }
        }
        if (fontOptions.fonts.length > 0) {
            return { background: "#198754" }
        }

        return { background: "#adb5bd" }

    }

    const applyFonts = () => {

        pageDesignState.setDesign({ ...pageDesignState.design, fonts: fontOptions.fonts })
        // props.closeWin();
    }

    return (
        <div className='layoutCreator'>
            <div className="outerLayoutHeader">

                <div className='layoutCreatorHeader'>
                    <div className='layoutCreatorTitle'>
                        Fonts Manager
                    </div>
                    <div className='layoutCreatorAction'>
                        <button onClick={props.closeWin}><i className="las la-times"></i></button>
                    </div>
                </div>
                <div className='fontSelectorList'>
                    <FontPicker
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        // activeFontFamily={fontOptions.fonts[fontOptions.fonts.length - 1]["font"]}
                        onChange={(nextFont) => {
                            let __new_font = createFontJson(nextFont);

                            // avoids font duplication
                            for (let e of fontOptions.fonts) {
                                if (e.font === __new_font.font) {

                                    return;
                                }
                            }
                            if (!fontOptions.fonts.includes(__new_font)) {
                                setFontOptions({ ...fontOptions, fonts: [...fontOptions.fonts, __new_font] })
                            }
                        }
                        }
                        sort={"popularity"}
                    />
                </div>
            </div>
            <div className='fontSelectorContent'>

                <div className='fontOptionsList'>
                    {
                        fontOptions.fonts.map((e, i) => {
                            return (
                                <div className='fontOption'>
                                    <div className='font_dets'>
                                        <span className='fontName' style={{ fontFamily: e.font }}>{e.font}</span>
                                        <span className='fontWeights'>
                                            {
                                                (e.weights.length > 0) && e.weights.join(", ")
                                            }
                                        </span>
                                    </div>
                                    <div className='actionGroup'>
                                        {
                                            (fontOptions.fonts.length > 1) && <button className="deleteFont" data-font-index={i} onClick={deleteFontOption}><i data-font-index={i} className="las la-trash-alt"></i></button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='footerStickyFontManager'>

                    <div className='webpageSpeed'>
                        <span style={fontSpeedColor()}><i className="las la-tachometer-alt"></i> {"" + fontSpeed()}</span>
                    </div>
                    <div className='applyFonts'>
                        <button onClick={applyFonts}>Save Fonts</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
