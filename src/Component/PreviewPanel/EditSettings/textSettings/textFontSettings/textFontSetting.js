import React from 'react'
import FontPicker from "font-picker-react";

import './textFontSetting.css'

export default function TextFontSetting({ textSetting, setTextSetting }) {
    return (
        <div className='textFontSelector'>
            <div className='inputTextFont'>
                <h5>Select the typeface</h5>
                <FontPicker
                    apiKey="AIzaSyDe5I9VTl76CBZjjA7dV8oitTNiqcVjXf8"
                    activeFontFamily={textSetting.fontFamily}
                    onChange={(nextFont) => {
                        console.log(nextFont);
                        setTextSetting({
                            ...textSetting,
                            fontFamily: nextFont.family,
                            adderFont: nextFont
                        })
                    }
                    }
                />
            </div>
        </div>
    )
}
