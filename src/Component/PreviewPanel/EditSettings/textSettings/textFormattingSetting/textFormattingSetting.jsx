import React from 'react'
import './textFormattingSetting.css'

export default function TextFormattingSetting({ textSetting, setTextSetting }) {
    return (
        <div className='textFormatting'>
            <div className='inputTextSize'>
                <h5>Text Align</h5>
                <button className={(textSetting.textAlign == "left") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textAlign: "left" })}><i class="las la-align-left"></i></button>
                <button className={(textSetting.textAlign == "center") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textAlign: "center" })}><i class="las la-align-center"></i></button>
                <button className={(textSetting.textAlign == "right") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textAlign: "right" })}><i class="las la-align-right"></i></button>
                <button className={(textSetting.textAlign == "justify") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textAlign: "justify" })}><i class="las la-align-justify"></i></button>
            </div>

            <div className='inputTextSize'>
                <h5>Text Transform</h5>
                <button className={(textSetting.textTransform == "none") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textTransform: "none" })}>Ab cd</button>
                <button className={(textSetting.textTransform == "uppercase") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textTransform: "uppercase" })}>AB CD</button>
                <button className={(textSetting.textTransform == "lowercase") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textTransform: "lowercase" })}>ab cd</button>
                <button className={(textSetting.textTransform == "capitalize") ? "active" : ""} onClick={(e) => setTextSetting({ ...textSetting, textTransform: "capitalize" })}>Ab Cd</button>
            </div>
        </div>
    )
}
