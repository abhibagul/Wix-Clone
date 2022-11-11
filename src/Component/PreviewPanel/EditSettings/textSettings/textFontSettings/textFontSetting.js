import React from 'react'
import FontPicker from "font-picker-react";

import './textFontSetting.css'

export default function TextFontSetting({ textSetting, setTextSetting }) {
    return (
        <div className='textFontSelector'>
            <div className='inputTextFont'>
                <h5>Select the typeface</h5>
                <FontPicker
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    activeFontFamily={textSetting.fontFamily}
                    onChange={(nextFont) => {
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
