import React, { useContext, useState, useEffect } from 'react'
import { pageDesignContext } from '../../../Context/contexts'

import './websiteSetting.css'

export default function WebsiteSettings(props) {
    let pageDesignState = useContext(pageDesignContext);


    useEffect(() => {

    }, [])

    return (
        <div className='layoutCreator'>
            <div className="outerLayoutHeader websettinghead">
                <div className='layoutCreatorHeader'>
                    <div className='layoutCreatorTitle'>
                        Page Settings
                    </div>
                    <div className='layoutCreatorAction'>
                        <button onClick={props.closeWin}><i className="las la-times"></i></button>
                    </div>
                </div>
            </div>
            <div className='webSettingPanel'>
                <div className="webSettingInner">
                    <div className={(pageDesignState.design.published) ? "websiteUnpublish" : "websitePublished"}>
                        <span> This page is {(pageDesignState.design.published) ? "Live" : "unpublished"} </span>
                        <button onClick={pageDesignState.publishWebPage} className={(pageDesignState.design.published) ? "unpublish" : ""}>{(pageDesignState.design.published) ? "Unpublish" : "Publish"}</button>
                    </div>

                    <div className='websiteSettingsPanelInner'>
                        <hr />
                        <h5 className='prevTxt'>Tab Preview:</h5>
                        <div className='all_prev'>
                            <div className='tab_prev'>
                                <img className='tab_bg_tab' src='/assets/images/tabPrev/tabBg.JPG' />
                                <img className='tab_favico' src={(pageDesignState.design.websiteSetting.favIco.length > 0) ? pageDesignState.design.websiteSetting.favIco : "/assets/images/tabPrev/noFav.JPG"} />
                                <span className='tab_name'>{pageDesignState.design.websiteSetting.siteName}</span>
                            </div>
                        </div>
                        <div className='inputWebSet favIcoFlex'>
                            <h5>Favicon Url</h5>
                            <input type="text" onChange={(e) => pageDesignState.setDesign({ ...pageDesignState.design, websiteSetting: { ...pageDesignState.design.websiteSetting, favIco: e.target.value } })} value={pageDesignState.design.websiteSetting.favIco}></input>
                        </div>
                        <hr />
                        <h5 className='prevTxt'>Google Search Preview:</h5>
                        <div className='all_prev'>
                            <div className='googleSearchPrev'>
                                <span className='googleSearchName'>
                                    {pageDesignState.design.websiteSetting.siteName}
                                </span>
                                <span className='googleSearchDesc'>
                                    {pageDesignState.design.websiteSetting.desc}
                                </span>
                            </div>
                        </div>
                        <div className='inputWebSet'>
                            <h5>Page Name</h5>
                            <input type="text" onChange={(e) => pageDesignState.setDesign({ ...pageDesignState.design, websiteSetting: { ...pageDesignState.design.websiteSetting, siteName: e.target.value } })} value={pageDesignState.design.websiteSetting.siteName}></input>
                        </div>
                        <div className='inputWebSet'>
                            <h5>Page Description</h5>
                            <input type="text" onChange={(e) => pageDesignState.setDesign({ ...pageDesignState.design, websiteSetting: { ...pageDesignState.design.websiteSetting, desc: e.target.value } })} value={pageDesignState.design.websiteSetting.desc}></input>
                        </div>


                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
}
