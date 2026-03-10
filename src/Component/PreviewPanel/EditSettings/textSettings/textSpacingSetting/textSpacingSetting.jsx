import React from 'react'
import './textSpacingSetting.css'

export default function TextSpacingSetting({ textSetting, setTextSetting, applyFormattingStyle }) {
    return (
        <>
            <div className='textSpacingSetting'>
                <div className='inputTextSize'>
                    <h5>Line Height:</h5>
                    <div className="spacinginputwrap">
                        <input min={0.6} max={3} step={0.1} onChange={(e) => setTextSetting({ ...textSetting, lineHeight: +e.target.value })} type={"range"} value={textSetting.lineHeight} />
                        <span>{textSetting.lineHeight} em</span>
                    </div>
                </div>

                <div className='inputTextSize'>
                    <h5>Letter Spacing:</h5>
                    <div className="spacinginputwrap">
                        <input min={-10} max={100} step={0.1} onChange={(e) => setTextSetting({ ...textSetting, letterSpace: +e.target.value })} type={"range"} value={textSetting.letterSpace} />
                        <span>{textSetting.letterSpace} px</span>
                    </div>
                </div>
            </div>
            <div className='applyPanelOneSettings' > <button onClick={applyFormattingStyle}>Apply Formatting</button></div>
        </>
    )
}
