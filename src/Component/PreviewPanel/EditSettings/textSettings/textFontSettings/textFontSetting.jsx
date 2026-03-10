import React, { useEffect } from 'react'
import './textFontSetting.css'

export default function TextFontSetting(props) {


    useEffect(() => {

    }, [props.fontList])

    return (
        <div className='textFontSelector'>
            <div className='inputTextFont'>
                <h5>Select the typeface</h5>
                <div className='fontSelectorCus'>
                    <select onChange={(e) => {

                        props.setTextSetting({
                            ...props.textSetting,
                            fontFamily: e.target.value
                        })

                    }}>
                        {
                            props.fontList.map((e) => {
                                return (<option key={e.font} value={e.font}>{e.font}</option>)
                            })
                        }
                    </select>
                    <button onClick={props.showFontListOption}><i className="las la-cog"></i></button>
                </div>
                {/* <FontPicker
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
                /> */}
            </div>
        </div>
    )
}
