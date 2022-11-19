import React, { useState, useEffect, useRef, useContext } from 'react'
import { createClient } from 'pexels';
import { pageDesignContext } from '../../../Context/contexts';
import { set, get } from "lodash";
import './imageSetting.css';
export default function ImageSetting(props) {

    let pageDesignState = useContext(pageDesignContext);

    let loadMoreImages = useRef(null);
    const [imageList, setImageList] = useState([]);
    const [imageSearchSetting, setImageSearchSetting] = useState({
        imageAlt: "",
        imageWidth: 300,
        imageHeight: 500,
        isLoading: false,
        imageWidthUnit: "px",
        imageHeightUnit: "px",
        rType: "Loading..",
        q: "",
        cURI: "",
        page: 1,
        perPage: 20,
        totalResult: 0,
        nextURI: "",
        loadType: "curated",
        panelMode: 0,
        gotDetails: false
    })

    useEffect(() => {
        //load initial images

        getElemValues();
    }, [])

    useEffect(() => {
        updatePrevs();

    }, [imageSearchSetting])

    const setNodeData = (elString, level, data) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString, level) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        return get(pageDesignState.design, _node_path);
    }

    const loadImages = async (type) => {



        if (type === "curated") {
            if (!imageSearchSetting.isLoading) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: "Popular Images" });
                //latest uri
                const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);
                await client.photos.curated({ per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    setImageList([...photos.photos])



                    if (photos.next_page && loadMoreImages.current) {
                        loadMoreImages.current.style.display = "block";
                    } else {
                        loadMoreImages.current.style.display = "none";
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
                    if (photos.next_page && loadMoreImages.current) {
                        loadMoreImages.current.style.display = "block";
                    } else {
                        loadMoreImages.current.style.display = "none";
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

    const loadMore = async () => {

        if (imageSearchSetting.loadType === "curated") {
            if (!imageSearchSetting.isLoading) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: "Popular Images" });
                //latest uri
                const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);
                await client.photos.curated({ page: imageSearchSetting.page, per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    setImageList([...imageList, ...photos.photos])
                    if (photos.next_page && loadMoreImages.current) {
                        loadMoreImages.current.style.display = "block";
                    } else {
                        loadMoreImages.current.style.display = "none";
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
                    if (photos.next_page && loadMoreImages.current) {
                        loadMoreImages.current.style.display = "block";
                    } else {
                        loadMoreImages.current.style.display = "none";
                    }
                    setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page, page: (photos.page + 1), totalResult: photos.total_results, loadType: "search", isLoading: false, rType: `Currently showing: ${imageSearchSetting.q}` });
                }).catch(err => {

                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    loadMoreImages.current.style.display = "none";
                });

            }
        }
    }

    const getElemValues = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        if (node && !imageSearchSetting.gotDetails) {

            let WidthUnit = "px";
            if (node.getAttribute("width").indexOf("%") != -1) {
                WidthUnit = "%";
            }
            if (isNaN(parseInt(node.getAttribute("width"), 10))) {
                WidthUnit = "auto";
            }

            let HeightUnit = "px";
            if (node.getAttribute("height").indexOf("%") != -1) {
                HeightUnit = "%";
            }
            if (isNaN(parseInt(node.getAttribute("height"), 10))) {
                HeightUnit = "auto";
            }


            setImageSearchSetting({
                ...imageSearchSetting,
                cURI: node.getAttribute("src"),
                imageAlt: (node.getAttribute("alt")) ? node.getAttribute("alt") : "",
                imageHeight: parseInt(node.getAttribute("height"), 10),
                imageWidth: parseInt(node.getAttribute("width"), 10),
                gotDetails: true,
                imageWidthUnit: WidthUnit,
                imageHeightUnit: HeightUnit
            })

            // loadImages("curated");
        }
    }

    const updatePrevs = () => {
        if (imageSearchSetting.gotDetails) {
            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
            node.setAttribute("src", imageSearchSetting.cURI);
            node.setAttribute("alt", imageSearchSetting.imageAlt);
            if (imageSearchSetting.imageHeightUnit === "auto")
                node.setAttribute("height", imageSearchSetting.imageHeightUnit)
            else
                node.setAttribute("height", imageSearchSetting.imageHeight + imageSearchSetting.imageHeightUnit)

            if (imageSearchSetting.imageWidthUnit === "auto")
                node.setAttribute("width", imageSearchSetting.imageWidthUnit)
            else
                node.setAttribute("width", imageSearchSetting.imageWidth + imageSearchSetting.imageWidthUnit)
        }
    }

    const updateImgPath = (e) => {

        if (imageSearchSetting.gotDetails) {

            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
            node.setAttribute("src", e.target.getAttribute("data-src"));
            node.setAttribute("alt", e.target.getAttribute("data-alt"));

            //set the setting for it
            setImageSearchSetting({ ...imageSearchSetting, cURI: e.target.getAttribute("data-src"), imageAlt: e.target.getAttribute("data-alt"), panelMode: 1 })
        }

    }

    const saveImageSettings = () => {

        let currentNode = props.currentlyActive.current;

        let __el = getNodeData(currentNode, 0);

        let __new_attr = {
            src: imageSearchSetting.cURI,
            alt: imageSearchSetting.imageAlt
        }

        if (imageSearchSetting.imageHeightUnit === "auto")
            __new_attr = { ...__new_attr, height: imageSearchSetting.imageHeightUnit }
        else
            __new_attr = { ...__new_attr, height: imageSearchSetting.imageHeight + imageSearchSetting.imageHeightUnit }

        if (imageSearchSetting.imageWidthUnit === "auto")
            __new_attr = { ...__new_attr, width: imageSearchSetting.imageWidthUnit }
        else
            __new_attr = { ...__new_attr, width: imageSearchSetting.imageWidth + imageSearchSetting.imageWidthUnit }

        if (__el.attributes.length > 0) {
            __new_attr = { ...__el.attributes, __new_attr }
        }

        __el.attributes = __new_attr;

        setNodeData(currentNode, 0, __el);

        //close panel
        props.closePanel();

    }

    return (
        <div className='imageSettingPanel'>
            <div className='imagePanel'>
                <div className='imageListOption'>
                    <ul>
                        <li className={(imageSearchSetting.panelMode === 0) ? "active" : ""} onClick={() => { setImageSearchSetting({ ...imageSearchSetting, panelMode: 0 }) }}>Online Images</li>
                        <li className={(imageSearchSetting.panelMode === 1) ? "active" : ""} onClick={() => { setImageSearchSetting({ ...imageSearchSetting, panelMode: 1 }) }}>Custom Image</li>
                    </ul>
                </div>
                {
                    /**
                     * Online images
                     */
                    (imageSearchSetting.panelMode === 0) &&
                    <div className="imageOnlineSuggest">
                        {(imageList.length === 0) && <h3 className='emptyImageList'> Search the images you are looking for..</h3>}

                        <div className='image_search'>
                            <div className='bgImageSearchbar'>
                                <input className={"sbarImg"} type={"text"} onKeyDown={(e) => { if (e.key === "Enter") { loadImages("search") } }} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, q: e.target.value })} placeholder="Search images.."></input>
                                <button className='ImgSearchAct' onClick={() => loadImages("search")}> <i className="las la-search"></i></button>
                            </div>
                        </div>
                        <div className='image_results'>
                            {
                                (imageList.length > 0) ?
                                    imageList.map((e) => {
                                        return (<div className='BgImageItem' onClick={updateImgPath} key={e.id} style={{ backgroundImage: `url(${e.src.small})` }} data-alt={e.alt + " by " + e.photographer} data-src={e.src.large2x}></div>)
                                    })

                                    : ""
                            }
                        </div>
                        <div ref={loadMoreImages} style={{ display: "none" }} className='show-more-images'>
                            <button onClick={loadMore}>Load more..</button>
                        </div>
                    </div>
                }
                {
                    /**
                     * Custom Image & settings
                     */
                    (imageSearchSetting.panelMode === 1) &&
                    <>
                        <div className='customImageApply'>
                            <div className='imageInputGroup'>
                                <h5>Image source:</h5>
                                <input type={"text"} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, cURI: e.target.value })} value={imageSearchSetting.cURI} />
                            </div>
                            <div className='imageInputGroup'>
                                <h5>Image Alt:</h5>
                                <input type={"text"} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, imageAlt: e.target.value })} value={(imageSearchSetting.imageAlt) ? imageSearchSetting.imageAlt : ""} />
                            </div>
                            <div className='imageSizing'>
                                <div className='imgSizeCol imageSizeWid'>
                                    <span>Width</span>
                                    <div className='innerSizeCol'>
                                        {
                                            (imageSearchSetting.imageWidthUnit !== "auto") &&
                                            <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setImageSearchSetting({ ...imageSearchSetting, imageWidth: +e.target.value }) : ""} value={imageSearchSetting.imageWidth}></input>
                                        }



                                        <select className={(imageSearchSetting.imageWidthUnit === "auto") ? "fullSizeUnit" : ""} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, imageWidthUnit: e.target.value })}>
                                            <option selected={(imageSearchSetting.imageWidthUnit === "px") ? true : false} value={"px"}>px</option>
                                            <option selected={(imageSearchSetting.imageWidthUnit === "%") ? true : false} value={"%"}>%</option>
                                            <option selected={(imageSearchSetting.imageWidthUnit === "auto") ? true : false} value={"auto"}>auto</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='imgSizeCol imageSizeWid'>
                                    <span>Height</span>
                                    <div className='innerSizeCol'>
                                        {
                                            (imageSearchSetting.imageHeightUnit !== "auto") &&
                                            <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setImageSearchSetting({ ...imageSearchSetting, imageHeight: +e.target.value }) : ""} value={imageSearchSetting.imageHeight}></input>
                                        }

                                        <select className={(imageSearchSetting.imageHeightUnit === "auto") ? "fullSizeUnit" : ""} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, imageHeightUnit: e.target.value })}>
                                            <option selected={(imageSearchSetting.imageHeightUnit == "px") ? true : false} value={"px"}>px</option>
                                            <option selected={(imageSearchSetting.imageHeightUnit == "%") ? true : false} value={"%"}>%</option>
                                            <option selected={(imageSearchSetting.imageHeightUnit == "auto") ? true : false} value={"auto"}>auto</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='applyImageSettings'>
                                <button onClick={saveImageSettings}>Apply</button>

                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}
