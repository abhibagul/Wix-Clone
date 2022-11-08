
import { useState } from 'react'
import BackgroundSetting from './backgroundSettings/backgroundSetting';
import BorderSettings from './borderSettings/borderSettings';
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
                    (editSettingState.currentSet === 0) && <BackgroundSetting closePanel={props.closePanel} currentlyActive={props.currentlyActive} />
                }

                {
                    /**
                     * Text
                     */
                }

                {
                    /**
                     * Border Settings
                     */
                    (editSettingState.currentSet === 2) && <BorderSettings closePanel={props.closePanel} currentlyActive={props.currentlyActive} />
                }

                {
                    /**
                     * border radius
                     */
                }

                {
                    /**
                     *  Box shadow
                     */
                }

                {
                    /**
                     * Box sizing (padding)
                     */
                }
            </div>
        </div>
    )
}
