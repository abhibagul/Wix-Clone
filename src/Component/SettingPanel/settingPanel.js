import React, { useContext, useState } from 'react'
import { pageDesignContext } from '../../Context/contexts'

import CreateRowsLayout from './createRowsLayout/createRowsLayout';
import FontManager from './fontManager/fontManager';

import './settingPanel.css';
export default function SettingPanel() {

    let pageDesignState = useContext(pageDesignContext);

    const closeSettingPanel = () => {
        pageDesignState.setDesign({ ...pageDesignState.design, settigMode: -1 })
    }




    return (
        (pageDesignState.design.settigMode !== -1) && <div className='settingPanel' >
            <div className='setingPanelMain' style={(pageDesignState.design.settigMode === 0) ? { maxWidth: "70%" } : { maxWidth: "600px" }}>
                <div className='settingPanelInner'>
                    {
                        /**
                         * case 0
                         */
                        (pageDesignState.design.settigMode === 0) && <CreateRowsLayout closeWin={closeSettingPanel} />
                    }

                    {
                        /**
                         * case 1
                         */
                        (pageDesignState.design.settigMode === 1) && <FontManager closeWin={closeSettingPanel} />
                    }

                    {/* <button onClick={() => pageDesignState.setDesign({ ...pageDesignState.design, settigMode: -1 })}>Close</button> */}
                </div>
            </div>
        </div>
    )
}
