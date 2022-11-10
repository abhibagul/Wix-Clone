import React from 'react'

import './textSizingSetting.css'

export default function TextSizingSetting({ textSetting, setTextSetting, applyFontStyle }) {


    return (
        <>
            <div className='inputTextColor'>
                <h5>Font Color:</h5>
                <input type={"color"} onChange={(e) => setTextSetting({ ...textSetting, fontColor: e.target.value })} value={textSetting.fontColor} />
            </div>
            <div className='inputTextSize extp'>
                <h5>Font Size:</h5>
                <div className="slidewrap">
                    <input min={0.1} max={10} step={0.1} onChange={(e) => setTextSetting({ ...textSetting, fontSize: +e.target.value })} type={"range"} value={textSetting.fontSize} />
                    <span>{textSetting.fontSize}em</span>
                </div>
            </div>

            <div className='inputTextSize'>
                <h5>Font Weight:</h5>
                <div className="slidewrap">
                    <input min={300} max={800} step={100} onChange={(e) => setTextSetting({ ...textSetting, fontWeight: +e.target.value })} type={"range"} value={textSetting.fontWeight} />
                    <span>{textSetting.fontWeight}</span>
                </div>
            </div>

            <div className='applyPanelOneSettings' > <button onClick={applyFontStyle}>Apply Font</button></div>


        </>

    )
}
