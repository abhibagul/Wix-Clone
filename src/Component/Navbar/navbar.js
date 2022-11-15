import React, { useRef, useContext } from 'react'
import nvstyle from './navbar.module.css';
import { pageDesignContext } from '../../Context/contexts';

export default function Navbar() {
    const parentDropDownSlide = useRef(null);
    const dropdownSlide = useRef(null);

    const pageDesignState = useContext(pageDesignContext)

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

    return (
        <nav className={nvstyle["navbar"]}>
            <div className={nvstyle["navbar_header_logo"]}>
                WebPage Builder
            </div>
            <div ref={parentDropDownSlide} className={nvstyle["navbar_menu_bar"]}>
                <ul className={nvstyle["navbar_menu_level_one"]} onMouseEnter={showSliderBox} onMouseLeave={removeSliderBox}>
                    <li data-elementid="1" data-dropheight="115" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                        <a href='/'>File</a>
                        <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                            <li><a href='/'>Save</a></li>
                            <li><a href='/'>Publish</a></li>
                            <li><a href='/'>Delete</a></li>
                            <li><a href='/'>Exit editor</a></li>
                        </ul>
                    </li>
                    <li data-elementid="2" data-dropheight="86" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                        <a href='/'>Settings</a>
                        <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                            <li className={nvstyle["pointerHover"]}><a href='/'>Meta Details</a></li>
                            <li className={nvstyle["pointerHover"]}><a onClick={() => { pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 1 }) }}>Font Manager</a></li>
                            <li className={nvstyle["pointerHover"]}><a href='/'>Social Links</a></li>
                            <li className={nvstyle["pointerHover"]}><a href='/'>Google Analytics</a></li>
                        </ul>
                    </li>
                    {/* <li data-elementId="3" data-dropheight="57" onMouseEnter={currentActiveMenu}>
                        <a href='/'>Keyboard Shortcuts</a>
                        <ul className={nvstyle["navbar_menu_level_two"]}>
                            <li><a href='/'>Project Link</a></li>
                            <li><a href='/'>Donate</a></li>
                        </ul>
                    </li> */}
                    <li data-elementid="3" data-dropheight="57" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                        <a href='/'>About</a>
                        <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                            <li><a href='/'>Project Link</a></li>
                            <li><a href='/'>Donate</a></li>
                        </ul>
                    </li>
                </ul>
                <div ref={dropdownSlide} className={nvstyle["spanning_menu_box"]}>

                </div>
            </div>
            <div className={nvstyle["user_persistant_actions"]}>
                <ul className={nvstyle["navbar_menu_level_one"]}>
                    <li><a onClick={() => pageDesignState.setDesign({ ...pageDesignState.design, pageMode: 1 })} className={nvstyle["btn_responsive"] + " responsive_mobile " + ((pageDesignState.design.pageMode) ? nvstyle["active"] : "")} href='#'><i className="las la-desktop"></i></a></li>
                    <li><a onClick={() => pageDesignState.setDesign({ ...pageDesignState.design, pageMode: 0 })} className={nvstyle["btn_responsive"] + " responsive_pc " + ((!pageDesignState.design.pageMode) ? nvstyle["active"] : "")} href='#'><i className="las la-mobile"></i></a></li>
                </ul>
            </div>
            <div className={nvstyle["user_persistant_actions"]}>
                <ul className={nvstyle["navbar_menu_level_one"]}>
                    <li><a className={nvstyle["highlight_btn_light"]} href='/'>Save</a></li>
                    <li><a className={nvstyle["highlight_btn"]} href='/'>Publish</a></li>
                </ul>
            </div>
            <div className={nvstyle["navbar_user_details"]}>
                <ul className={nvstyle["navbar_user_details"]}>
                    <li>
                        <a href='/' className={nvstyle["navbar_user_profile"]}>A</a>
                        <ul>
                            <li><a href='/'>My Profile</a></li>
                            <li><a href='/'>My Projects</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
