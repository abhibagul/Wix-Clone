import React from 'react'
import { useState, useContext } from 'react';
import './addLink.css';
import { set, get } from "lodash";
import { pageDesignContext } from '../../../Context/contexts';

export default function AddLink(props) {
    let pageDesignState = useContext(pageDesignContext);
    const [addLinkState, setAddLinkState] = useState({
        currentMode: "url",
        urlLink: {
            targetURL: "",
            targetType: "_blank",
            rel: {
                opner: true,
                refer: true,
                follow: false,
                sponsored: false
            }
        },
        emailLink: {
            targetEmail: "",
            targetSubject: ""
        },
        phoneLink: {
            targetPhone: ""
        },
        scrollLink: {
            targetScroll: "top"
        }
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

    const createLinkHTMLFromURI = ([__url, __type, _relStr]) => {
        let a = document.createElement('a');
        a.href = __url;
        a.target = __type;
        a.rel = _relStr.join(" ");
        return a;
    }

    const createLinkHTML = () => {
        let __url = addLinkState.urlLink.targetURL;
        let __type = addLinkState.urlLink.targetType;
        let __rel = addLinkState.urlLink.rel;
        let _relStr = [];

        if (__rel.follow) {
            _relStr.push("nofollow");
        }

        if (__rel.opner) {
            _relStr.push("noopner")
        }

        if (__rel.refer) {
            _relStr.push("noreffer")
        }

        if (__rel.sponsored) {
            _relStr.push("sponsored")
        }

        return [__url, __type, _relStr];
    }

    const createEmailHTML = () => {
        let __url = "mailto:";
        __url += addLinkState.emailLink.targetEmail;

        if (addLinkState.emailLink.targetSubject) {
            __url += "?subject=" + addLinkState.emailLink.targetSubject;
        }

        return [__url, "_self", []];
    }

    const createPhoneHTML = () => {
        let __url = "tel:";
        __url += addLinkState.phoneLink.targetPhone;

        return [__url, "_self", []];
    }

    const createScrollHTML = () => {
        let __url = "modify:";

        if (addLinkState.scrollLink.targetScroll === "top") {
            __url += "pageFunctionMoveToTop"
        } else {
            __url += "pageFunctionMoveToBottom"
        }
        // __url += addLinkState.phoneLink.targetPhone;

        return [__url, "_self", []];
    }

    const applyLinkToSelection = () => {
        let currentNode = props.currentlyActive.current;
        let __currentEl = getNodeData(currentNode, 0);
        let __parentEl = getNodeData(currentNode, -1);


        if (__currentEl.elemEditable) {
            let ws = window.getSelection();
            if (ws.toString().length < 1) {
                alert("Unable to add hyperlink: Empty selection");
                return;
            }
            if (ws.anchorNode === ws.focusNode && ws.type === "Range") {

                if (ws.toString()) {
                    let ws = window.getSelection();
                    let __a;
                    switch (addLinkState.currentMode) {
                        case "none":
                            //remove the link if exist

                            /**
                             * some function to remove the link
                             */
                            return;
                            break;
                        case "url":
                            __a = createLinkHTML();
                            break;
                        case "email":
                            __a = createEmailHTML();
                            break;
                        case "phone":
                            __a = createPhoneHTML();
                            break;
                        case "scroll":
                            __a = createScrollHTML();
                            break;
                    }

                    ws.getRangeAt(0).surroundContents(createLinkHTMLFromURI(__a));


                    //Todo [done]: also will need to update in the object

                    //set the current elem 
                    let __before_node = getNodeData(props.currentlyActive.current, 0);
                    let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
                    setNodeData(props.currentlyActive.current, 0, { ...__before_node, inHTML: encodeURIComponent(node.innerHTML) })


                    props.closePanel();
                    return;
                } else {
                    alert("Unable to create hyperlink: selection is empty string")
                    return;
                }



            } else {

                let __a;
                switch (addLinkState.currentMode) {
                    case "none":
                        //remove the link if exist

                        /**
                         * some function to remove the link
                         */
                        return;
                        break;
                    case "url":
                        __a = createLinkHTML();
                        break;
                    case "email":
                        __a = createEmailHTML();
                        break;
                    case "phone":
                        __a = createPhoneHTML();
                        break;
                    case "scroll":
                        __a = createScrollHTML();
                        break;
                }

                /**
                 * I really hate to use this here, but have no other option after spending a day around it.
                 * Deprecated function: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
                 */
                document.execCommand('createLink', false, __a[0]);

                /* update the datain object */
                //set the current elem 
                let __before_node = getNodeData(props.currentlyActive.current, 0);
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
                setNodeData(props.currentlyActive.current, 0, { ...__before_node, inHTML: encodeURIComponent(node.innerHTML) })

                props.closePanel();
                return;
            }
        } else {
            // let currentNode = props.currentlyActive.current;
            // let __currentEl = getNodeData(currentNode, 0);
            // let __parentEl = getNodeData(currentNode, -1);

            let __a;
            switch (addLinkState.currentMode) {
                case "none":
                    //remove the link if exist

                    /**
                     * some function to remove the link
                     */
                    return;
                    break;
                case "url":
                    __a = createLinkHTML();
                    break;
                case "email":
                    __a = createEmailHTML();
                    break;
                case "phone":
                    __a = createPhoneHTML();
                    break;
                case "scroll":
                    __a = createScrollHTML();
                    break;
            }


            let attribs = { href: __a[0] }

            if (__a[1].length > 0) {
                attribs = { ...attribs, target: __a[1] }
            }

            if (__a[2].length > 0) {
                attribs = { ...attribs, rel: __a[2].join(" ") }
            }

            if (__parentEl.elementType === "a") {
                //update the param elem only
                setNodeData(props.currentlyActive.current, -1, { ...__parentEl, attributes: attribs })


            } else {
                //insert the a node inside

                let __newLinkNode = {
                    ...__parentEl
                }

                //insertIndex
                let __hrefIndex = props.currentlyActive.current.split(",");
                __hrefIndex = __hrefIndex[__hrefIndex.length - 1];
                __newLinkNode.elements[__hrefIndex] = {
                    previmg: "/assets/images/elements/layouts/2col.png",
                    elid: "anchorLink",
                    inHTML: "",
                    desc: "AnchorLink",
                    attributes: attribs,
                    elementType: "AnchorLink",
                    classList: "",
                    styles: { color: "#000000" },
                    elemType: "a",
                    elemEditable: true,
                    enableDropping: false,
                    elements: [__parentEl.elements[__hrefIndex]]
                }

                //no need for inner html as state has to be 
                setNodeData(props.currentlyActive.current, -1, __newLinkNode)

            }
            props.closePanel();
            return;
        }

    }

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

    const selectAllText = () => {

        //node
        let currentNode = props.currentlyActive.current;
        let selectTextCls = getNodeData(currentNode, 0).elemEditable;

        if (selectTextCls) {
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
        } else {
            requestAnimationFrame(() => {
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]")
                node.focus();
            });
        }
    }



    return (
        <div className='LinkBoxOptions'>
            <div className='linkBox-types'>
                <ul>
                    {/* <li className={(addLinkState.currentMode === "none") ? "active" : ""} onClick={() => { setAddLinkState({ ...addLinkState, currentMode: "none" }); selectAllText() }} >None</li> */}
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
                                    <div className='link_url_scroll'>
                                        <div className='link_url_input'>
                                            <h5>What's the web address{" (URL)"}?</h5>
                                            <input type={"text"} onChange={(e) => { setAddLinkState({ ...addLinkState, urlLink: { ...addLinkState.urlLink, targetURL: e.target.value } }) }} value={addLinkState.urlLink.targetURL} required="" placeholder='Paste the url here..' />
                                        </div>
                                        <div className='link_url_input'>
                                            <h5>How you want to open the link?</h5>
                                            <select onChange={(e) => { setAddLinkState({ ...addLinkState, urlLink: { ...addLinkState.urlLink, targetType: e.target.value } }) }} value={addLinkState.urlLink.targetType}>
                                                <option value="_self"  >Open in current window</option>
                                                <option value="_blank" >Open in new tab</option>
                                            </select>
                                        </div>
                                        <div className='link_url_input'>
                                            <h5>Link relations,</h5>
                                            <div className='link_checkbox'>
                                                <input type={"checkbox"} id="inp_noopener"
                                                    checked={(addLinkState.urlLink.rel.opner)}
                                                    onChange={(e) => {
                                                        setAddLinkState({ ...addLinkState, urlLink: { ...addLinkState.urlLink, rel: { ...addLinkState.urlLink.rel, opner: !addLinkState.urlLink.rel.opner } } })
                                                    }}
                                                    value="noopener"></input>
                                                <label htmlFor="inp_noopener">Block access to source</label>
                                            </div>
                                            <div className='link_checkbox'>
                                                <input type={"checkbox"} id="inp_noreferrer"
                                                    checked={(addLinkState.urlLink.rel.refer)}
                                                    onChange={(e) => {
                                                        setAddLinkState({ ...addLinkState, urlLink: { ...addLinkState.urlLink, rel: { ...addLinkState.urlLink.rel, refer: !addLinkState.urlLink.rel.refer } } })
                                                    }}
                                                    value="noreferrer"></input>
                                                <label htmlFor="inp_noreferrer">Hide information about source</label>
                                            </div>
                                            <div className='link_checkbox'>
                                                <input type={"checkbox"} id="inp_nofollow"
                                                    checked={(addLinkState.urlLink.rel.follow)}
                                                    onChange={(e) => {
                                                        setAddLinkState({ ...addLinkState, urlLink: { ...addLinkState.urlLink, rel: { ...addLinkState.urlLink.rel, follow: !addLinkState.urlLink.rel.follow } } })
                                                    }}
                                                    value="nofollow"></input>
                                                <label htmlFor="inp_nofollow">Skip by search engine</label>
                                            </div>
                                            <div className='link_checkbox'>
                                                <input type={"checkbox"} id="inp_sponsored"
                                                    checked={(addLinkState.urlLink.rel.sponsored)}
                                                    onChange={(e) => {
                                                        setAddLinkState({ ...addLinkState, urlLink: { ...addLinkState.urlLink, rel: { ...addLinkState.urlLink.rel, sponsored: !addLinkState.urlLink.rel.sponsored } } })
                                                    }}
                                                    value="sponsored"></input>
                                                <label htmlFor="inp_sponsored">Paid / Sponsor/ Affiliate link</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='button_footer_wrap_link'>
                                        <button className='link_gen_btn' onClick={applyLinkToSelection}>Add URL Link</button>
                                    </div>
                                </div>
                            </> : ""
                    }




                    {
                        /**
                         * Email link panel
                         */
                        (addLinkState.currentMode === "email") ?
                            <>
                                <div className='hyperlink'>
                                    <div className='link_url_scroll'>
                                        <div className='link_url_input'>
                                            <h5>What is the email?</h5>
                                            <input type={"email"} onChange={(e) => { setAddLinkState({ ...addLinkState, emailLink: { ...addLinkState.emailLink, targetEmail: e.target.value } }) }} value={addLinkState.emailLink.targetEmail} required="" />
                                        </div>
                                        <div className='link_url_input'>
                                            <h5>What is the subject for the email?</h5>
                                            <input type={"text"} onChange={(e) => { setAddLinkState({ ...addLinkState, emailLink: { ...addLinkState.emailLink, targetSubject: e.target.value } }) }} value={addLinkState.emailLink.targetSubject} />
                                        </div>
                                    </div>
                                    <div className='button_footer_wrap_link'>
                                        <button className='link_gen_btn' onClick={applyLinkToSelection}>Add Email Link</button>
                                    </div>
                                </div>
                            </> : ""
                    }



                    {
                        /**
                         * Phone link panel
                         */
                        (addLinkState.currentMode === "phone") ?
                            <>
                                <div className='hyperlink'>
                                    <div className='link_url_scroll'>
                                        <div className='link_url_input'>
                                            <h5>Add the phone number along with country and area code</h5>
                                            <input type={"phone"} onChange={(e) => { setAddLinkState({ ...addLinkState, phoneLink: { ...addLinkState.phoneLink, targetPhone: e.target.value } }) }} value={addLinkState.phoneLink.targetPhone} required="" />
                                            <span className='link_description'>( When people click on the link from mobile or tablet, the link will take them to dialpad with the number. )</span>
                                        </div>
                                    </div>
                                    <div className='button_footer_wrap_link'>
                                        <button className='link_gen_btn' onClick={applyLinkToSelection}>Add Phone Link</button>
                                    </div>
                                </div>
                            </> : ""
                    }

                    {
                        /**
                         * Scroll link panel
                         */
                        (addLinkState.currentMode === "scroll") ?
                            <>
                                <div className='hyperlink'>
                                    <div className='link_url_scroll'>
                                        <div className='link_url_input'>
                                            <h5>Link visitors to the top/bottom of the page (whichever page they're on).</h5>
                                            <div className={(addLinkState.scrollLink.targetScroll === "top") ? "scrollOptionLink active" : "scrollOptionLink"}
                                                onClick={() => { setAddLinkState({ ...addLinkState, scrollLink: { ...addLinkState.scrollLink, targetScroll: "top" } }) }}
                                            >
                                                <div className='scroll_option'>
                                                    <img src='/assets/images/link/top.png' />
                                                </div>
                                                <div className='scroll_name'>
                                                    Top
                                                </div>
                                            </div>
                                            <div
                                                className={(addLinkState.scrollLink.targetScroll === "bottom") ? "scrollOptionLink active" : "scrollOptionLink"}
                                                onClick={() => { setAddLinkState({ ...addLinkState, scrollLink: { ...addLinkState.scrollLink, targetScroll: "bottom" } }) }}
                                            >
                                                <div className='scroll_option'>
                                                    <img src='/assets/images/link/bottom.png' />
                                                </div>
                                                <div className='scroll_name'>
                                                    Bottom
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='button_footer_wrap_link'>
                                        <button className='link_gen_btn' onClick={applyLinkToSelection}>Add Scroll Link</button>
                                    </div>
                                </div>
                            </> : ""
                    }

                </div>
            </div>
        </div>
    )
}
