import React, { useState, useEffect, useContext, useRef } from 'react'
import { set, get } from "lodash";
import { pageDesignContext } from '../../../Context/contexts'
import './navigationSettings.css'
export default function NavigationSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    let [linksState, setLinksState] = useState({
        navEl: []
    });

    let dragPositionRef = useRef(null);
    let dragPositionStart = useRef(null);


    useEffect(() => {


        loadLinkStructure();
    }, [])

    const setNodeData = (elString, level, data, offset) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString, level, offset) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        return get(pageDesignState.design, _node_path);
    }

    const loadLinkStructure = () => {

        let __nav = getNodeData(props.currentlyActive.current, 0, "");

        if (__nav.elemType !== "ul" && __nav.elemType !== "li" && __nav.elemType !== "a" && __nav.elemType !== "nav") {
            props.closePanel()
        }

        if (__nav.elemType === "ul") {
            __nav = getNodeData(props.currentlyActive.current, 1, "");
        }


        if (__nav.elemType === "li" || __nav.elemType === "a") {
            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
            let curr = node.closest("nav").getAttribute("data-path");
            __nav = getNodeData(curr.slice(0, -1), 0, "");

        }

        if (__nav) {

            setLinksState({ ...linksState, navEl: __nav.elements[0].elements });
        }
    }


    const openUrlOptions = (e) => {
        e.target.closest("[data-link-idx]").querySelector(".linkModifyPanel").classList.toggle("open");
    }

    const addNewLink = () => {
        let __newLink = {
            previmg: "/assets/images/elements/layouts/2col.png",
            elid: "NavLinkItem",
            inHTML: "",
            desc: "NavLinkItem",
            attributes: {},
            elementType: "NavLinkItem",
            classList: "",
            styles: { padding: "5px" },
            elemType: "li",
            elemEditable: false,
            enableDropping: false,
            elements: [
                {
                    previmg: "/assets/images/elements/layouts/2col.png",
                    elid: "NavInerLinkItem",
                    inHTML: "Link Item " + linksState.navEl.length,
                    desc: "NavInnerLinkItem",
                    attributes: { href: "#", target: "_blank" },
                    elementType: "NavInnerLinkItem",
                    classList: "",
                    linktype: "url",
                    styles: { color: "#000000", padding: "5px", textDecoration: "none" },
                    elemType: "a",
                    elemEditable: false,
                    enableDropping: false,
                    elements: [

                    ]
                }
            ]
        }

        setLinksState({ ...linksState, navEl: [...linksState.navEl, JSON.parse(JSON.stringify(__newLink))] })
    }

    const handleLinkNameChange = (e) => {
        let __linkState = { ...linksState };
        __linkState.navEl[+e.target.getAttribute("data-link-idx")].elements[0].inHTML = e.target.value;
        setLinksState(__linkState)
    }

    const handleLinkAttributeChange = (e) => {
        let __linkState = { ...linksState };
        __linkState.navEl[+e.target.getAttribute("data-link-idx")].elements[0].attributes[e.target.getAttribute("data-link-prop")] = e.target.value;
        setLinksState(__linkState)
    }

    const handleLinkTypeChange = (e) => {
        let __linkState = { ...linksState };
        __linkState.navEl[+e.target.getAttribute("data-link-idx")].elements[0].linktype = e.target.value;
        setLinksState(__linkState)
    }

    const getEmailDataFromLink = (uri) => {

        if (uri.indexOf("mailto:") !== -1) {

            let uriN = uri.split("mailto:")[1];

            if (uriN.indexOf("?subject=") !== -1) {
                return (uriN.split("?subject="));
            }

            return [uriN, ""];

        }

        return ["", ""];
    }

    const updateEmailLink = (e, type) => {

        //get the current link
        let _linkUri = linksState.navEl[+e.target.getAttribute("data-link-idx")].elements[0].attributes.href;
        let _emailData = getEmailDataFromLink(_linkUri);

        let _newLink;
        if (type == "email") {
            _newLink = `mailto:${e.target.value}?subject=${_emailData[1]}`
        } else {
            _newLink = `mailto:${_emailData[0]}?subject=${e.target.value}`
        }

        let __linkState = { ...linksState };
        __linkState.navEl[+e.target.getAttribute("data-link-idx")].elements[0].attributes["href"] = _newLink;
        setLinksState(__linkState)

    }

    const moveElementUp = (e) => {
        let __linkState = { ...linksState };
        let _rm_el_pos;
        if (e.target.hasAttribute("data-link-idx")) {

            _rm_el_pos = +e.target.getAttribute("data-link-idx");
        } else {
            _rm_el_pos = +e.target.closest("[data-link-idx]").getAttribute("data-link-idx");
        }
        let _rm_el = __linkState.navEl.splice(_rm_el_pos, 1)[0];
        __linkState.navEl.splice(_rm_el_pos - 1, 0, _rm_el);
        setLinksState(__linkState);
    }

    const moveElementDown = (e) => {
        let __linkState = { ...linksState };
        let _rm_el_pos;
        if (e.target.hasAttribute("data-link-idx")) {

            _rm_el_pos = +e.target.getAttribute("data-link-idx");
        } else {
            _rm_el_pos = +e.target.closest("[data-link-idx]").getAttribute("data-link-idx");
        }
        let _rm_el = __linkState.navEl.splice(_rm_el_pos, 1)[0];
        __linkState.navEl.splice(_rm_el_pos + 1, 0, _rm_el);
        setLinksState(__linkState);
    }

    const arrangeElemsDragged = (e) => {

        if (dragPositionStart.current > -1 && dragPositionRef.current > -1) {
            let __linkState = { ...linksState };
            /**
             * Array.prototype.swapItems = function(a, b){
                    this[a] = this.splice(b, 1, this[a])[0];
                    return this;
                }
            */

            __linkState.navEl[dragPositionStart.current] = __linkState.navEl.splice(dragPositionRef.current, 1, __linkState.navEl[dragPositionStart.current])[0]

            // let _rm_el = __linkState.navEl.splice(dragPositionStart.current, 1)[0];
            // __linkState.navEl.splice(dragPositionRef.current, 0, _rm_el);
            setLinksState(__linkState);
        }
    }

    const updateDragEnterPosition = (e) => {
        if (e.target.hasAttribute("data-is-dragel")) {
            dragPositionRef.current = +e.target.getAttribute("data-link-idx");
        } else {
            dragPositionRef.current = +e.target.closest("[data-link-idx]").getAttribute("data-link-idx");
        }
    }

    const getPhoneFromLink = (uri) => {
        if (uri.indexOf("tel:") !== -1) {
            return uri.split("tel:")[1]
        }
        return "";
    }

    const updatePhoneLink = (e) => {
        let _newLink = `tel:${e.target.value}`;
        let __linkState = { ...linksState };
        __linkState.navEl[+e.target.getAttribute("data-link-idx")].elements[0].attributes["href"] = _newLink;
        setLinksState(__linkState)
    }

    const saveNavigationMenu = (e) => {
        let __nav = { ...getNodeData(props.currentlyActive.current, 0, "") };
        let __isParent = 0;

        if (__nav.elemType === "ul") {
            __nav = { ...getNodeData(props.currentlyActive.current, 1, "") };
            __isParent = 1;
        }

        __nav.elements[0].elements = linksState.navEl;

        setNodeData(props.currentlyActive.current, __isParent, __nav.elements, '["elements"]')
        // setLinksState({ ...linksState, navEl: __nav.elements[0].elements });
        props.closePanel()
    }

    const deleteLink = (e) => {
        let __nodeID = null;
        if (e.target.hasAttribute("data-link-idx")) {
            __nodeID = e.target.getAttribute("data-link-idx");
        } else {
            __nodeID = e.target.closest("[data-link-idx]").getAttribute("data-link-idx");
        }

        let __new_links = [...linksState.navEl];

        __new_links.splice(+__nodeID, 1);

        setLinksState({ ...linksState, navEl: __new_links });

    }

    return (
        <div className='linksManager'>
            <div className="linksManagerInner">

                <div className='LinksOptions'>

                    {
                        (linksState.navEl) &&
                        linksState.navEl.map((e, i) => {
                            return (
                                <div key={i} data-is-dragel draggable
                                    onDragStart={(e) => { dragPositionStart.current = +e.target.getAttribute("data-link-idx"); }}
                                    onDragEnter={updateDragEnterPosition}
                                    onDragEnd={arrangeElemsDragged}
                                    className='linkModify' data-link-idx={i} >
                                    <div className="linktext">
                                        <div className='flex-link-arrange' >
                                            {(i !== 0) ? <button onClick={moveElementUp} data-link-idx={i}><i className="las la-caret-up"></i></button> : <span className='filler'></span>}
                                            <button><i className="las la-bars"></i></button>
                                            {(i !== (linksState.navEl.length - 1)) ? <button onClick={moveElementDown} data-link-idx={i}><i className="las la-caret-down"></i></button> : <span className='filler'></span>}
                                        </div>
                                        <div className='flex-link-left'>
                                            <span className='linktitle'>{e.elements[0].inHTML}</span>
                                            <span className='linkURL'>{e.elements[0].attributes.href}  {e.elements[0].attributes.target}</span>
                                        </div>
                                        <div className='flex-link-action-right'>
                                            <button onClick={openUrlOptions}><i className="las la-chevron-circle-down"></i></button>
                                            <button className='btnDelLink' onClick={deleteLink} data-link-idx={i}><i className="las la-trash-alt"></i></button>
                                        </div>
                                    </div>
                                    <div className='linkModifyPanel'>
                                        <div className="panelmodifylinkinner">
                                            <h5>Link name</h5>
                                            <input type="text" onChange={handleLinkNameChange} data-link-idx={i} value={e.elements[0].inHTML} />

                                            <h5>What you want the link to do?</h5>
                                            <select onChange={handleLinkTypeChange} data-link-idx={i}>
                                                <option value="url" selected={((e.elements[0].attributes.linktype) === "url") ? true : false}>Go to another page</option>
                                                <option value="mail" selected={((e.elements[0].attributes.linktype) === "mail") ? true : false}>Send Email</option>
                                                <option value="tel" selected={((e.elements[0].attributes.linktype) === "tel") ? true : false}>Call a number</option>
                                            </select>
                                            {
                                                (e.elements[0].linktype === "mail") && <>
                                                    <h5></h5>
                                                </>
                                            }

                                            {
                                                (e.elements[0].linktype === "mail") && <>
                                                    <h5>Email to:</h5>
                                                    <input type="text" onChange={(e) => updateEmailLink(e, "email")} data-link-idx={i} value={getEmailDataFromLink(e.elements[0].attributes.href)[0]} />

                                                    <h5>Subject:</h5>
                                                    <input type="text" onChange={(e) => updateEmailLink(e, "subject")} data-link-idx={i} value={getEmailDataFromLink(e.elements[0].attributes.href)[1]} />
                                                </>
                                            }

                                            {
                                                (e.elements[0].linktype === "tel") && <>
                                                    <h5>Phone number:</h5>
                                                    <input type="text" onChange={updatePhoneLink} data-link-idx={i} value={getPhoneFromLink(e.elements[0].attributes.href)} />

                                                </>
                                            }

                                            {(e.elements[0].linktype === "url") && <>
                                                <h5>URL</h5>
                                                <input type="text" onChange={handleLinkAttributeChange} data-link-prop="href" data-link-idx={i} value={e.elements[0].attributes.href} />


                                                <h5>How you want to open the link?</h5>
                                                <select onChange={handleLinkAttributeChange} data-link-prop="target" data-link-idx={i} >
                                                    <option selected={(e.elements[0].attributes.target === "_blank") ? true : false} value="_blank">Open in new tab</option>
                                                    <option selected={(e.elements[0].attributes.target === "_self") ? true : false} value="_self">Open in same tab</option>
                                                </select>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className='addMoreLink'>
                        <button onClick={addNewLink}>Add new link</button>
                        <button onClick={saveNavigationMenu}>Save All Links</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
