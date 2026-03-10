import React, { useContext, useState } from 'react'
import { pageDesignContext } from '../../Context/contexts'

import CreateRowsLayout from './createRowsLayout/createRowsLayout';
import FontManager from './fontManager/fontManager';
import GoogleAnalytics from './googleAnalytics/googleAnalytics';
import WebsiteSettings from './websiteSetting/websiteSetting';
import CreateNewPage from './createNewPage/createNewPage';
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

                    {
                        /**
                         * case 2
                         */
                        (pageDesignState.design.settigMode === 2) && <GoogleAnalytics closeWin={closeSettingPanel} />
                    }

                    {
                        /**
                         * case 3
                         */
                        (pageDesignState.design.settigMode === 3) && <WebsiteSettings closeWin={closeSettingPanel} />
                    }

                    {
                        /**
                         * case 4
                         */
                        (pageDesignState.design.settigMode === 4) && <CreateNewPage closeWin={closeSettingPanel} />
                    }

                    {/* <button onClick={() => pageDesignState.setDesign({ ...pageDesignState.design, settigMode: -1 })}>Close</button> */}
                </div>
            </div>
        </div>
    )
}
