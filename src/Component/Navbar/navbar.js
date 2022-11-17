import React, { useRef, useContext, useEffect } from 'react'
import nvstyle from './navbar.module.css';
import './navbar.css'
import { pageDesignContext, userDetailsContext } from '../../Context/contexts';
import { useNavigate, useMatch, Link } from 'react-router-dom';
export default function Navbar() {

    const navigate = useNavigate();

    const parentDropDownSlide = useRef(null);
    const dropdownSlide = useRef(null);
    const selectPageList = useRef(null);

    const pageDesignState = useContext(pageDesignContext);
    const UserDetailsState = useContext(userDetailsContext);

    const isPageDesign = useMatch("/designer/:projectId/:pageId")
    const isPageDesignEmpty = useMatch("/designer/:projectId/:pageId")

    useEffect(() => {

    }, [pageDesignState.webDesignState])

    const currentActiveMenu = (e) => {

        let elpos = +(e.target.closest("li").getAttribute("data-elementId"));

        let allListEl = parentDropDownSlide.current.querySelectorAll("li[data-elementid]");

        if (elpos - 2 > -1) {
            //prev elem

            allListEl[elpos - 2].querySelector("ul").style.transform = `translateX(${allListEl[elpos - 2].getBoundingClientRect().width}px) `
            allListEl[elpos - 2].querySelector("ul").style.scale = 0;
        }

        if ((elpos) < (allListEl.length)) {
            allListEl[elpos].querySelector("ul").style.transform = `translateX(-${allListEl[elpos].getBoundingClientRect().width}px) `
            allListEl[elpos].querySelector("ul").style.scale = 0;
        }

        //set current active elem
        let el = e.target.closest("li").querySelector("ul");
        if (el) {
            el.style.transform = `translateX(0px) rotateY(0deg)`
            el.style.scale = 1;
        }

        //get child heigh
        let ht = e.target.closest("li").getAttribute("data-dropheight");
        dropdownSlide.current.style.transform = `translateX(${(e.target.getBoundingClientRect().x - parentDropDownSlide.current.getBoundingClientRect().x - 10)}px)`;
        dropdownSlide.current.style.height = ht + 'px';

    }

    const elementLeaveRemove = (e) => {
        let el = e.target.closest("li").querySelector("ul");
        if (el) {
            el.style.transform = `translateX(0px) rotateY(0deg) scale(0)`
            el.style.scale = 0;
            // console.log("element removed to 0");
        }
    }

    const elementInnerLeaveRemove = (e) => {

        if (e.clientY > 40) {
            let el = e.target.closest("li[data-elementid]").querySelector("ul");
            if (el) {
                el.style.transform = `translateX(0px) rotateY(0deg) scale(0)`
                el.style.scale = 0;
                el.style.height = 0;
            }
        }
    }


    const removeSliderBox = (e) => {
        dropdownSlide.current.style.scale = 0
        dropdownSlide.current.style.opacity = 0;
    }

    const showSliderBox = (e) => {
        dropdownSlide.current.style.opacity = 1;
        dropdownSlide.current.style.scale = 1
    }

    const createNewPage = () => {
        pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 4 })
    }



    return (
        <nav className={nvstyle["navbar"]}>
            <div className={nvstyle["navbar_header_logo"]}>
                WebPage Builder
            </div>
            {(isPageDesign && pageDesignState.webDesignState.pages && (pageDesignState.webDesignState.pages.length > 0)) &&
                <div className={nvstyle["navbar_header_logo"]}>
                    <span className='pageSelectorSpan' onClick={() => { selectPageList.current.classList.toggle("show"); }}>{
                        // console.log(pageDesignState.webDesignState.pages)
                        (pageDesignState.webDesignState.pages) && pageDesignState.webDesignState.pages.map((e) => {
                            return (UserDetailsState.editorState.pageId === e.pageId) ? e.pageName : ""
                        })
                    }</span>


                    <>
                        <button className='selectPage' onClick={() => { selectPageList.current.classList.toggle("show"); }}><i className="las la-angle-down"></i></button>
                        <div ref={selectPageList} className='subPagesList'>
                            <ul className='selectPage'>
                                <div className='inList'>
                                    {
                                        // console.log(pageDesignState.webDesignState.pages)
                                        (pageDesignState.webDesignState.pages) && pageDesignState.webDesignState.pages.map((e, i) => {
                                            return (<li key={i} className={(UserDetailsState.editorState.pageId === e.pageId) ? "active menuPagesList" : "menuPagesList"}>
                                                <Link className='pageOption' to={`/designer/${UserDetailsState.editorState.websiteId}/${e.pageId}/`} data-page-id={e.pageId}>{e.pageName}</Link>
                                            </li>)

                                        })
                                    }
                                </div>
                                <hr />
                                <button onClick={createNewPage}>+ Create New Page</button>
                            </ul>
                        </div>
                    </>

                </div>
            }
            <div ref={parentDropDownSlide} className={nvstyle["navbar_menu_bar"]}>
                <ul className={nvstyle["navbar_menu_level_one"]} onMouseEnter={showSliderBox} onMouseLeave={removeSliderBox}>
                    {(isPageDesign || isPageDesignEmpty) ? <>
                        <li data-elementid="1" data-dropheight="115" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                            <a href='#'>WebPage</a>
                            <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                                <li><a onClick={createNewPage}>New Page</a></li>
                                <li><a onClick={pageDesignState.getWebPageImageAndSavePage}>Save Page</a></li>
                                <li><a href='/'>Publish Page</a></li>
                                {(pageDesignState.webDesignState.pages && pageDesignState.webDesignState.pages.length > 1) && <li><a onClick={pageDesignState.removeWebPage}>Delete Page</a></li>}
                                <li><Link to='/my-websites'>Exit editor</Link></li>
                            </ul>
                        </li>
                        <li data-elementid="2" data-dropheight="86" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                            <a href='#'>Settings</a>
                            <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                                <li className={nvstyle["pointerHover"]}><a onClick={() => { pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 3 }) }}>Settings & Meta</a></li>
                                <li className={nvstyle["pointerHover"]}><a onClick={() => { pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 1 }) }}>Font Manager</a></li>
                                {/* <li className={nvstyle["pointerHover"]}><a href='/'>Social Links</a></li> */}
                                <li className={nvstyle["pointerHover"]}><a onClick={() => { pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 2 }) }} >Google Analytics</a></li>
                            </ul>
                        </li>

                        <li data-elementid="3" data-dropheight="57" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                            <a href='/'>About</a>
                            <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                                <li><a href='https://github.com/abhibagul/Wix-Clone' target="_blank">Project Link</a></li>
                                <li><a href='/'>Donate</a></li>
                            </ul>
                        </li>
                    </> : <li data-elementid="1" data-dropheight="57" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                        <a href='/'>About</a>
                        <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                            <li><a href='https://github.com/abhibagul/Wix-Clone' target="_blank">Project Link</a></li>
                            <li><a href='/'>Donate</a></li>
                        </ul>
                    </li>}
                </ul>
                <div ref={dropdownSlide} className={nvstyle["spanning_menu_box"]}>

                </div>
            </div>
            {(isPageDesign || isPageDesignEmpty) && <>
                <div className={nvstyle["user_persistant_actions"]}>
                    <ul className={nvstyle["navbar_menu_level_one"]}>
                        <li><a onClick={() => pageDesignState.setDesign({ ...pageDesignState.design, pageMode: 1 })} className={nvstyle["btn_responsive"] + " responsive_mobile " + ((pageDesignState.design.pageMode) ? nvstyle["active"] : "")} href='#'><i className="las la-desktop"></i></a></li>
                        <li><a onClick={() => pageDesignState.setDesign({ ...pageDesignState.design, pageMode: 0 })} className={nvstyle["btn_responsive"] + " responsive_pc " + ((!pageDesignState.design.pageMode) ? nvstyle["active"] : "")} href='#'><i className="las la-mobile"></i></a></li>
                    </ul>
                </div>
                <div className={nvstyle["user_persistant_actions"]}>
                    <ul className={nvstyle["navbar_menu_level_one"]}>
                        <li><a className={nvstyle["highlight_btn_light"]} onClick={pageDesignState.getWebPageImageAndSavePage}>Save</a></li>
                        <li><a className={nvstyle["highlight_btn"]} href='/'>Publish</a></li>
                    </ul>
                </div>
            </>}
            <div className={nvstyle["navbar_user_details"]}>
                <ul className={nvstyle["navbar_user_details"]}>
                    <li>
                        <a href='/' className={nvstyle["navbar_user_profile"]}>{UserDetailsState.user.user.charAt(0).toUpperCase()}</a>
                        <ul>
                            <li><a href='/'>My Profile</a></li>
                            <li><Link to='/my-websites'>My Websites</Link></li>
                            <li><a onClick={() => { localStorage.removeItem('token'); navigate("/") }}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
