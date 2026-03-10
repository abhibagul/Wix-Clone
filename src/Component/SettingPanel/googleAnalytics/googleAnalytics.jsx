import React, { useContext, useState, useEffect } from 'react'
import { pageDesignContext } from '../../../Context/contexts'
import './googleAnalytics.css'
export default function GoogleAnalytics(props) {
    let pageDesignState = useContext(pageDesignContext);

    let [googleAnalyticsId, setGoogleAnalyticsId] = useState(pageDesignState.design.analyticsID)

    const saveGoogleAnalytics = () => {
        if (googleAnalyticsId.match("UA-[0-9]{8}-[0-9]{1}") != null) {
            pageDesignState.setDesign({ ...pageDesignState.design, analyticsID: googleAnalyticsId.match("UA-[0-9]{8}-[0-9]{1}")[0] });
            alert("saved");
        } else {
            alert("Invalid analytics Id.")
        }
    }

    return (
        <div className='layoutCreator'>
            <div className="outerLayoutHeader">
                <div className='layoutCreatorHeader'>
                    <div className='layoutCreatorTitle'>
                        Google Analytics Setting
                    </div>
                    <div className='layoutCreatorAction'>
                        <button onClick={props.closeWin}><i className="las la-times"></i></button>
                    </div>
                </div>
            </div>
            <div className='googleAnalyticsContent'>

                <div className='googleAnalyticsInner'>
                    <h5>Google Analytics ID</h5>
                    <input type="text" pattern="UA-[0-9]{8}-[0-9]{1}" onChange={(e) => setGoogleAnalyticsId(e.target.value)} value={googleAnalyticsId} placeholder="UA-00000000-0" />
                </div>
                <div className='footerStickyFontManager'>

                    <div className='applyFonts'>
                        <button onClick={saveGoogleAnalytics}>Save Setting</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
