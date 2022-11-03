import React from 'react'
import { useState } from 'react';
import './addLink.css';
export default function AddLink(props) {

    const [addLinkState, setAddLinkState] = useState({
        currentMode: "none"
    })
    // e.preventDefault();
    // let ws = window.getSelection();
    // if (ws.anchorNode === ws.focusNode && ws.type === "Range") {
    //     if (ws.toString()) {
    //         let a = document.createElement('a');
    //         a.href = 'http://www.google.com';
    //         a.title = 'GOOGLE';
    //         ws.getRangeAt(0).surroundContents(a);
    //     }
    // } else {
    //     /**
    //      * I really hate to use this here, but have no other option after spending a day against it.
    //      * Deprecated function: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
    //      */
    //     document.execCommand('createLink', false, prompt('URL', ''));
    // }

    const applyLinkToSelection = () => {
        let ws = window.getSelection();
        if (ws.toString().length < 1) {
            alert("Unable to add hyperlink: Empty selection");
            return;
        }
        if (ws.anchorNode === ws.focusNode && ws.type === "Range") {
            if (ws.toString()) {
                let a = document.createElement('a');
                a.href = 'http://www.google.com';
                a.title = 'GOOGLE';
                ws.getRangeAt(0).surroundContents(a);
            }
        } else {
            /**
             * I really hate to use this here, but have no other option after spending a day against it.
             * Deprecated function: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
             */
            document.execCommand('createLink', false, prompt('URL', ''));
        }
    }

    const selectAllText = () => {

        requestAnimationFrame(() => {
            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
            node.focus();
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(node);
                range.select();
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNodeContents(node);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        });
    }

    return (
        <div className='LinkBoxOptions'>
            <div className='linkBox-types'>
                <ul>
                    <li className={(addLinkState.currentMode === "none") ? "active" : ""} onClick={() => { setAddLinkState({ ...addLinkState, currentMode: "none" }); selectAllText() }} >None</li>
                    <li className={(addLinkState.currentMode === "url") ? "active" : ""} onClick={() => { setAddLinkState({ ...addLinkState, currentMode: "url" }); selectAllText() }} >Web Address</li>
                    <li className={(addLinkState.currentMode === "email") ? "active" : ""} onClick={() => { setAddLinkState({ ...addLinkState, currentMode: "email" }); selectAllText() }} >Email</li>
                    <li className={(addLinkState.currentMode === "phone") ? "active" : ""} onClick={() => { setAddLinkState({ ...addLinkState, currentMode: "phone" }); selectAllText() }} >Phone number</li>
                    <li className={(addLinkState.currentMode === "scroll") ? "active" : ""} onClick={() => { setAddLinkState({ ...addLinkState, currentMode: "scroll" }); selectAllText() }} >Top / Bottom of page</li>
                </ul>
            </div>
            <div className='linkbox-settings'>
                <div className='linkbox_inner_panel'>
                    {
                        /**
                         * No Link Panel
                         */
                        (addLinkState.currentMode === "none") ?
                            <>
                                <div className='no-link'>
                                    <p className='no-link-descriptor'>
                                        Choose from the left list which type of link you wish to apply.
                                    </p>
                                </div>
                            </> : ""
                    }


                    {
                        /**
                         * absolute link panel
                         */
                        (addLinkState.currentMode === "url") ?
                            <>
                                <div className='hyperlink'>
                                    <div className='link_url'>
                                        <h5>What's the web address{" (URL)"}?</h5>
                                        <input type={"text"} required="" placeholder='Paste the url here..' />
                                    </div>
                                    <div className='link_url'>
                                        <h5>How you want to open the link?</h5>
                                        <input type={"text"} required="" placeholder='Paste the url here..' />
                                    </div>
                                    <button onClick={applyLinkToSelection}>apply</button>
                                </div>
                            </> : ""
                    }




                    {
                        /**
                         * absolute link panel
                         */
                    }

                    {
                        /**
                         * Email link panel
                         */
                    }

                    {
                        /**
                         * Phone link panel
                         */
                    }

                    {
                        /**
                         * Scroll link panel
                         */
                    }

                    {/* <button onClick={applyLinkToSelection}>apply</button> */}
                </div>
            </div>
        </div>
    )
}
