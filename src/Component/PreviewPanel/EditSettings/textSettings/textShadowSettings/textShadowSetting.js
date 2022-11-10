import React from 'react'
import './textShadowSettings.css'

export default function TextShadowSetting({ textSetting, setTextSetting, applyTextShadow }) {

    const setShadowProp = (e, prp, v) => {
        let __allShadows = [...textSetting.shadows];

        __allShadows[+e.target.getAttribute("data-shadow-index")][prp] = v;

        setTextSetting({ ...textSetting, shadows: __allShadows });
    }

    const removeShadow = (e) => {
        let __allShadows = [...textSetting.shadows];
        __allShadows.splice(+e.target.getAttribute("data-shadow-index"), 1);
        setTextSetting({ ...textSetting, shadows: __allShadows });
    }

    return (
        <div className='textShadowPanel'>
            {textSetting.shadows.map((e, i) => {
                return (
                    <div className="boxShadowInput" key={i}>
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
                                {(textSetting.shadows.length > 1) && <button className='removeShadow' data-shadow-index={i} onClick={removeShadow}><i className="las la-trash-alt"></i></button>}
                            </div>
                            <div className='boxShadowRange hidden'>
                                <h5>DistanceX</h5>
                                <input className='shadowDistanceRange' min={-200} max={200} onChange={(e) => setShadowProp(e, "distanceX", +e.target.value)} data-shadow-index={i} value={e.distanceX} title='DistanceX' type="range"></input>
                                <h5>DistanceY</h5>
                                <input className='shadowAngleRange' min={-200} max={200} onChange={(e) => setShadowProp(e, "distanceY", +e.target.value)} data-shadow-index={i} value={e.distanceY} title='DistanceY' type="range"></input>
                                <h5>Blur</h5>
                                <input className='shadowBlurRange' onChange={(e) => setShadowProp(e, "blur", +e.target.value)} data-shadow-index={i} value={e.blur} title='Blur' type="range"></input>
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className='addMoreShadow'>
                <button onClick={() => setTextSetting({
                    ...textSetting, shadows: [...textSetting.shadows, {
                        distanceY: 5,
                        distanceX: 5,
                        blur: 5,
                        color: '#000000',
                        opacity: 10
                    }]
                })}><i className="las la-plus-circle"></i> Add Shadow</button>
            </div>

            <div className='applyPanelOneSettings' > <button onClick={applyTextShadow}>Apply Shadows</button></div>
        </div>
    )
}
