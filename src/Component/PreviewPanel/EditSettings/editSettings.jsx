
import { useState } from 'react'

/**
 * Panels
 */
import BackgroundSetting from './backgroundSettings/backgroundSetting';
import BorderSettings from './borderSettings/borderSettings';
import BorderRadiusSettings from './borderRadiusSettings/borderRadiusSettings';
import BoxShadowSetting from './boxShadowSettings/boxShadowSetting';
import PaddingSettings from './paddingSettings/paddingSettings';
import TextSettings from './textSettings/textSettings';

import './editSettings.css'
export default function EditSettings(props) {
    const [editSettingState, setEditSettingState] = useState({
        currentSet: 0
    });


    return (
        <div className='editSettings'>
            <div className='editSettingLeftSidebr'>
                <ul>
                    <li className={(editSettingState.currentSet === 0) ? "active" : ""} onClick={() => setEditSettingState({ ...editSettingState, currentSet: 0 })}><i className="las la-fill"></i></li>
                    <li className={(editSettingState.currentSet === 1) ? "active" : ""} onClick={() => setEditSettingState({ ...editSettingState, currentSet: 1 })}><i className="las la-font"></i></li>
                    <li className={(editSettingState.currentSet === 2) ? "active" : ""} onClick={() => setEditSettingState({ ...editSettingState, currentSet: 2 })}><i className="las la-border-style"></i></li>
                    <li className={(editSettingState.currentSet === 3) ? "active" : ""} onClick={() => setEditSettingState({ ...editSettingState, currentSet: 3 })}><i className="las la-expand"></i></li>
                    <li className={(editSettingState.currentSet === 4) ? "active" : ""} onClick={() => setEditSettingState({ ...editSettingState, currentSet: 4 })}><i className="las la-copy"></i></li>
                    <li className={(editSettingState.currentSet === 5) ? "active" : ""} onClick={() => setEditSettingState({ ...editSettingState, currentSet: 5 })}><i className="lar la-object-group"></i></li>
                </ul>
            </div>
            <div className='editSettingPanels'>
                {
                    /**
                     * Background
                     */
                    (editSettingState.currentSet === 0) && <BackgroundSetting closePanel={props.closePanel} key={props.currentlyActive.current} currentlyActive={props.currentlyActive} />
                }

                {
                    /**
                     * Text
                     */
                    (editSettingState.currentSet === 1) && <TextSettings closePanel={props.closePanel} key={props.currentlyActive.current} currentlyActive={props.currentlyActive} />
                }

                {
                    /**
                     * Border Settings
                     */
                    (editSettingState.currentSet === 2) && <BorderSettings closePanel={props.closePanel} key={props.currentlyActive.current} currentlyActive={props.currentlyActive} />
                }

                {
                    /**
                     * border radius
                     */
                    (editSettingState.currentSet === 3) && <BorderRadiusSettings closePanel={props.closePanel} key={props.currentlyActive.current} currentlyActive={props.currentlyActive} />
                }

                {
                    /**
                     *  Box shadow
                     */
                    (editSettingState.currentSet === 4) && <BoxShadowSetting closePanel={props.closePanel} key={props.currentlyActive.current} currentlyActive={props.currentlyActive} />
                }

                {
                    /**
                     * Box sizing (padding)
                     */
                    (editSettingState.currentSet === 5) && <PaddingSettings closePanel={props.closePanel} key={props.currentlyActive.current} currentlyActive={props.currentlyActive} />
                }
            </div>
        </div>
    )
}
