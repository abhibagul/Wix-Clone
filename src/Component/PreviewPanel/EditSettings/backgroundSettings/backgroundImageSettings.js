import React, { useState, useEffect, useRef } from 'react'
import { createClient } from 'pexels';
import { set, get } from "lodash";
import './bgImage.css'
export default function BackgroundImageSettings(props) {


    const [imageList, setImageList] = useState([]);
    const [imageSearchSetting, setImageSearchSetting] = useState({
        q: "",
        cURI: "",
        page: 1,
        perPage: 20,
        totalResult: 0,
        nextURI: "",
        loadType: "curated",
        panelMode: 0,
        isLoading: false,
        rType: "Loading..."
    })

    let loadMoreImages = useRef(null);

    const loadImages = async (type) => {

        //reset all settings!
        setImageSearchSetting({
            q: "",
            cURI: "",
            page: 1,
            perPage: 20,
            totalResult: 0,
            nextURI: "",
            loadType: "curated",
            panelMode: 0,
            isLoading: false,
            rType: "Loading..."
        })

        if (type === "curated") {
            if (!imageSearchSetting.isLoading) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: "Popular Images" });
                //latest uri
                const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);
                await client.photos.curated({ per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    setImageList([...photos.photos])


                    if (props.backgroundSettings.backgroundMode === 2) {

                        if (photos.next_page && loadMoreImages.current) {
                            loadMoreImages.current.style.display = "block";
                        } else {
                            loadMoreImages.current.style.display = "none";
                        }
                    }
                    setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page, page: (photos.page + 1), totalResult: photos.total_results, loadType: "curated", isLoading: false, rType: "Popular Images" });
                }).catch(err => {
                    console.error(err);
                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    loadMoreImages.current.style.display = "none";
                });
            }
        } else {
            //search uri
            if (!imageSearchSetting.isLoading) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: `Currently showing: ${imageSearchSetting.q}` });
                const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);
                const query = imageSearchSetting.q;

                client.photos.search({ query, per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    setImageList([...photos.photos])
                    if (props.backgroundSettings.backgroundMode === 2) {
                        if (photos.next_page && loadMoreImages.current) {
                            loadMoreImages.current.style.display = "block";
                        } else {
                            loadMoreImages.current.style.display = "none";
                        }
                    }
                    setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page, page: (photos.page + 1), totalResult: photos.total_results, loadType: "search", isLoading: false, rType: `Currently showing: ${imageSearchSetting.q}` });
                }).catch(err => {
                    console.error(err);
                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    loadMoreImages.current.style.display = "none";
                });

            }
        }
    }

    useEffect(() => {
        loadImages("curated");
    }, [])



    const loadMore = async () => {

        if (imageSearchSetting.loadType === "curated") {
            if (!imageSearchSetting.isLoading) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: "Popular Images" });
                //latest uri
                const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);
                await client.photos.curated({ page: imageSearchSetting.page, per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    setImageList([...imageList, ...photos.photos])
                    if (props.backgroundSettings.backgroundMode === 2) {
                        if (photos.next_page && loadMoreImages.current) {
                            loadMoreImages.current.style.display = "block";
                        } else {
                            loadMoreImages.current.style.display = "none";
                        }
                    }
                    setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page, page: (photos.page + 1), totalResult: photos.total_results, loadType: "curated", isLoading: false, rType: "Popular Images" });
                }).catch(err => {
                    console.error(err);
                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    loadMoreImages.current.style.display = "none";
                });
            }
        } else {
            //search uri
            if (!imageSearchSetting.isLoading) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: `Currently showing: ${imageSearchSetting.q}` });
                const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);
                const query = imageSearchSetting.q;

                client.photos.search({ page: imageSearchSetting.page, query, per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    setImageList([...imageList, ...photos.photos])
                    if (props.backgroundSettings.backgroundMode === 2) {
                        if (photos.next_page && loadMoreImages.current) {
                            loadMoreImages.current.style.display = "block";
                        } else {
                            loadMoreImages.current.style.display = "none";
                        }
                    }
                    setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page, page: (photos.page + 1), totalResult: photos.total_results, loadType: "search", isLoading: false, rType: `Currently showing: ${imageSearchSetting.q}` });
                }).catch(err => {

                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    loadMoreImages.current.style.display = "none";
                });

            }
        }
    }

    const updateBGPath = (e) => {
        let __iPath = e.target.getAttribute("data-src");
        props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, url: __iPath } });
        setImageSearchSetting({ ...imageSearchSetting, panelMode: 2 });
    }

    return (
        <div className='BgImagePanel'>

            <div className='bgPanelOption'>
                <ul>
                    <li className={(imageSearchSetting.panelMode === 0) ? "active" : ""} onClick={() => setImageSearchSetting({ ...imageSearchSetting, panelMode: 0 })}>Online Images</li>
                    <li className={(imageSearchSetting.panelMode === 1) ? "active" : ""} onClick={() => setImageSearchSetting({ ...imageSearchSetting, panelMode: 1 })}>Custom Image</li>
                    <li className={(imageSearchSetting.panelMode === 2) ? "active" : ""} onClick={() => setImageSearchSetting({ ...imageSearchSetting, panelMode: 2 })}>Settings</li>
                </ul>
            </div>
            <div className='bgPanelSec'>

                {(imageSearchSetting.panelMode === 0) && <div className='pexelSearchImg'>

                    <div className='bgImageSearchbar'>
                        <input className={"sbarImg"} type={"text"} onKeyDown={(e) => { if (e.key === "Enter") { loadImages("search") } }} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, q: e.target.value })} placeholder="Search images.."></input>
                        <button className='ImgSearchAct' onClick={() => loadImages("search")}> <i className="las la-search"></i></button>
                    </div>
                    <div className='bgImageSearchTxt'>
                        <h5>{imageSearchSetting.rType} </h5>
                    </div>
                    <div className='bgImageResults'>
                        {
                            imageList.map((e) => {
                                return (<div className='BgImageItem' onClick={updateBGPath} key={e.id} style={{ backgroundImage: `url(${e.src.small})` }} data-src={e.src.large2x}></div>)
                            })
                        }
                    </div>
                    <div ref={loadMoreImages} style={{ display: "none" }} className='show-more-images'>
                        <button onClick={loadMore}>Load more..</button>
                    </div>
                    <div className='applySearchBG'>
                        <a href="https://www.pexels.com" target={"_blank"} className="pexels_credit">
                            <img src="https://images.pexels.com/lib/api/pexels.png" />
                        </a>
                        <button onClick={() => props.setBgImg()}>Apply</button>
                    </div>
                </div>}
                {(imageSearchSetting.panelMode === 1) && <div className='userOwnImg'>
                    <div className='bgImageCustom'>
                        <input
                            className={"cusImg"}
                            type={"text"}
                            onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, cURI: e.target.value })}
                            placeholder="Your image url"
                        // value={(props.BackgroundImageSettings.backgroundImage.url) ? props.BackgroundImageSettings.backgroundImage.url : (imageSearchSetting.cURI) ? imageSearchSetting.cURI : ""}
                        // value={props.BackgroundImageSettings.backgroundImage.url}
                        ></input>
                        <button className='imgCusAct' onClick={() => {
                            props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, url: imageSearchSetting.cURI } })
                            setImageSearchSetting({ ...imageSearchSetting, panelMode: 2 });
                            props.setBgImg()
                        }}> Apply</button>
                    </div>
                </div>}
                {(imageSearchSetting.panelMode === 2) && <div className='bgImgSettings'>
                    <h5>Background Size</h5>
                    <div className='imageSettingsOption'>
                        <select onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, size: e.target.value } })}>
                            <option value="auto" selected={(props.backgroundSettings.backgroundImage.size === "auto") ? true : false}>Auto</option>
                            <option value="cover" selected={(props.backgroundSettings.backgroundImage.size === "cover") ? true : false}>Cover</option>
                            <option value="contain" selected={(props.backgroundSettings.backgroundImage.size === "contain") ? true : false}>Contain</option>
                            <option value="custom" selected={(props.backgroundSettings.backgroundImage.size === "custom") ? true : false}>Custom</option>
                        </select>
                        {(props.backgroundSettings.backgroundImage.size === "custom") && <div className='customImgSizes'>
                            <div className='colorPalletStrength'>
                                <label>Width:</label>
                                <input className='colorPalletOpacityRange' type={"range"} onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, customX: e.target.value } })}
                                    value={props.backgroundSettings.backgroundImage.customX} max={100} min={0} step="1" />
                                <span className='colorPalletOpacityValue'>{props.backgroundSettings.backgroundImage.customX}%</span>
                            </div>
                            <div className='colorPalletStrength'>
                                <label>Height:</label>
                                <input className='colorPalletOpacityRange' type={"range"} onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, customY: e.target.value } })}
                                    value={props.backgroundSettings.backgroundImage.customY} max={100} min={0} step="1" />
                                <span className='colorPalletOpacityValue'>{props.backgroundSettings.backgroundImage.customY}%</span>
                            </div>
                        </div>}
                    </div>
                    <h5>Background Parallax</h5>
                    <div className='imageSettingsOption'>
                        <select onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, attchement: e.target.value } })}>
                            <option value="fixed" selected={(props.backgroundSettings.backgroundImage.attchement === "fixed") ? true : false}>Parallax</option>
                            <option value="initial" selected={(props.backgroundSettings.backgroundImage.attchement === "initial") ? true : false}>No Parallax</option>
                        </select>
                    </div>
                    <h5>Background Position</h5>
                    <div className='imageSettingsOption'>
                        <div className='imagePosSort'>
                            <div className='ImgHorzPs'>
                                <h5>Horizontal</h5>
                                <select onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, positionLeft: e.target.value } })}>
                                    <option value="left" selected={(props.backgroundSettings.backgroundImage.positionLeft === "left") ? true : false}>Left</option>
                                    <option value="center" selected={(props.backgroundSettings.backgroundImage.positionLeft === "center") ? true : false}>Center</option>
                                    <option value="right" selected={(props.backgroundSettings.backgroundImage.positionLeft === "right") ? true : false}>Right</option>
                                    <option value="custom" selected={(props.backgroundSettings.backgroundImage.positionLeft === "custom") ? true : false}>Custom</option>
                                </select>
                                {(props.backgroundSettings.backgroundImage.positionLeft === "custom") && <div className='customImgSizes'>
                                    <div className='colorPalletStrength dircol'>
                                        <input className='colorPalletOpacityRange' type={"range"} onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, posX: e.target.value } })}
                                            value={props.backgroundSettings.backgroundImage.posX} max={100} min={-100} step="1" />
                                        <span className='colorPalletOpacityValue'>{props.backgroundSettings.backgroundImage.posX}%</span>
                                    </div>
                                </div>}
                            </div>
                            <div className='ImgVertPs'>
                                <h5>Vertical</h5>
                                <select onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, positionTop: e.target.value } })}>
                                    <option value="top" selected={(props.backgroundSettings.backgroundImage.positionTop === "top") ? true : false}>Top</option>
                                    <option value="center" selected={(props.backgroundSettings.backgroundImage.positionTop === "center") ? true : false}>Center</option>
                                    <option value="bottom" selected={(props.backgroundSettings.backgroundImage.positionTop === "bottom") ? true : false}>Bottom</option>
                                    <option value="custom" selected={(props.backgroundSettings.backgroundImage.positionTop === "custom") ? true : false}>Custom</option>

                                </select>
                                {(props.backgroundSettings.backgroundImage.positionTop === "custom") && <div className='customImgSizes'>
                                    <div className='colorPalletStrength dircol'>
                                        <input className='colorPalletOpacityRange' type={"range"} onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, posY: e.target.value } })}
                                            value={props.backgroundSettings.backgroundImage.posY} max={100} min={-100} step="1" />
                                        <span className='colorPalletOpacityValue'>{props.backgroundSettings.backgroundImage.posY}%</span>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <h5>Background Repeat</h5>
                    <div className='imageSettingsOption'>
                        <select onChange={(e) => props.setBackgroundSettings({ ...props.backgroundSettings, backgroundImage: { ...props.backgroundSettings.backgroundImage, repeat: e.target.value } })}>
                            <option value="repeat" selected={(props.backgroundSettings.backgroundImage.repeat === "repeat") ? true : false}>Repeat Both</option>
                            <option value="repeat-x" selected={(props.backgroundSettings.backgroundImage.repeat === "repeat-x") ? true : false}>Horizontal Repeat</option>
                            <option value="repeat-y" selected={(props.backgroundSettings.backgroundImage.repeat === "repeat-y") ? true : false}>Vertical Repeat</option>
                            <option value="no-repeat" selected={(props.backgroundSettings.backgroundImage.repeat === "no-repeat") ? true : false}>Do not repeat</option>
                            <option value="space" selected={(props.backgroundSettings.backgroundImage.repeat === "space") ? true : false}>Space</option>
                            <option value="round" selected={(props.backgroundSettings.backgroundImage.repeat === "round") ? true : false}>Round</option>
                        </select>
                    </div>
                    <div className='applySearchBG'>
                        <button onClick={() => props.setBgImg()}>Apply</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
