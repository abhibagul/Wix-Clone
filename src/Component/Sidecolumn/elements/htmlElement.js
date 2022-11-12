import React, { useState, useContext } from 'react'
import { set, get } from "lodash";
import { pageDesignContext } from '../../../Context/contexts';
import './htmlElement.css'

export default function HtmlElement() {
    const pageDesignState = useContext(pageDesignContext)
    const htmlElems = [
        {
            previmg: "/assets/images/elements/layouts/2col.png",
            elid: "paragraph",
            inHTML: "Type your content here...",
            desc: "Paragraph",
            elementType: "paragraph",
            classList: "",
            attributes: {},
            elemType: "p",
            styles: { color: "#000000" },
            elemEditable: true,
            enableDropping: false,
            elements: []
        },
        {
            previmg: "/assets/images/elements/layouts/2col.png",
            elid: "headers",
            inHTML: "Header element",
            desc: "headers",
            attributes: {},
            elementType: "Headings",
            classList: "",
            styles: { color: "#000000" },
            elemType: "h1",
            elemEditable: true,
            enableDropping: false,
            elements: []
        },
        {
            previmg: "/assets/images/elements/layouts/2col.png",
            elid: "image",
            inHTML: "",
            desc: "Image",
            attributes: { src: "/assets/images/elements/html/dummyImage.jpg", width: "500px", height: "auto", alt: "Demo Preview Image" },
            elementType: "Image",
            classList: "",
            styles: {},
            elemType: "img",
            elemEditable: false,
            enableDropping: false,
            elements: []
        },
        {
            previmg: "/assets/images/elements/layouts/2col.png",
            elid: "ullistedItem",
            inHTML: "",
            desc: "List",
            attributes: {},
            elementType: "List",
            classList: "",
            styles: { color: "#000000", padding: "5px" },
            elemType: "ul",
            elemEditable: false,
            enableDropping: true,
            elements: [
                {
                    previmg: "/assets/images/elements/layouts/2col.png",
                    elid: "listItem",
                    inHTML: "List item",
                    desc: "List Item",
                    attributes: {},
                    elementType: "ListItem",
                    classList: "",
                    styles: { color: "#000000" },
                    elemType: "li",
                    elemEditable: true,
                    enableDropping: false,
                    elements: [

                    ]
                }
            ]
        },
        {
            previmg: "/assets/images/elements/layouts/2col.png",
            elid: "iframe",
            inHTML: "",
            desc: "Inline Frame",
            attributes: { src: "https://example.com", width: "100%", height: "300px", allowtransparency: "true" },
            elementType: "Iframe",
            classList: "",
            styles: { padding: "5px" },
            elemType: "iframe",
            elemEditable: false,
            enableDropping: false,
            elements: []
        }
    ]

    const [htmlElem, setHtmlElem] = useState(htmlElems);

    const AddSubElement = (elNode, index) => {
        //console.log("HTML : AddSubElement: 38")
        //lets deal with the sub elems!
        elNode = elNode.substr(0, [elNode.length - 1]).split(',');
        let _depth = { ...pageDesignState.design }
        let tempOpt = [...htmlElem]
        // for (let i = 0; i < elNode.length; i++) {
        //     //console.log(subDepth.elements[elNode[i]]);
        //     subDepth = { ...subDepth.elements[elNode[i]] }
        // }

        // //console.log(elNode.reduce((o, i) => o.elements[i], subDepth), 'highway')
        // //console.log(_depth);
        // let parentNode = [...elNode];
        // parentNode = parentNode.slice(0, -1);
        // //console.log(parentNode, parentNode.splice(0, -1), elNode, 'nods');

        // let _parent_el = get(_depth, 'elements[' + parentNode.join('].elements[') + '].elements')
        let _earlier_options = get(_depth, 'elements[' + elNode.join('].elements[') + ']');
        // //console.log(_earlier_options, _parent_el, 'eo');


        if (!_earlier_options.enableDropping) {
            //remove the last elem might help
            //console.log(elNode);
            elNode = elNode.slice(0, -1);
            if (elNode.length > 0) {
                _earlier_options = get(_depth, 'elements[' + elNode.join('].elements[') + '].elements');
                _depth = set(_depth, 'elements[' + elNode.join('].elements[') + '].elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
            } else {
                _earlier_options = get(_depth, 'elements');
                _depth = set(_depth, 'elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
            }
            //console.log(_earlier_options, elNode)

        } else {

            _earlier_options = _earlier_options.elements
            _depth = set(_depth, 'elements[' + elNode.join('].elements[') + '].elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
        }

        pageDesignState.setDesign(_depth);
        // //console.log(elNode);
        // //console.log("Final Return", SetObjValues(_depth, elNode, "Hello i am set"))


        /**
         *   obj 
         *   -elem
         *      -elem
         *         - elem
         *              - elem
         *                  - elem
         */

    }

    const AddDroppedElement = (e) => {
        //lets get new context
        // let pageDesignStateNew = useContext(pageDesignContext)
        //console.log("HTML : AddDroppedElement: 97")
        if (pageDesignState.design.isDropEnabled) {

            //reset the insert position
            // //console.log(pageDesignState.nodeLevel.current, 'currentType');
            // //console.log(_elems);
            if (pageDesignState.nodeLevel.current === null) {

                //console.log("this way 1")

                let _elems = [];
                let tempOptions = [];
                tempOptions = [...htmlElem];
                _elems = [...pageDesignState.design.elements];

                //insert at index
                // //console.log(pageDesignState.dropPosition)
                //e.target.closest("").getAttribute("data-elementindex")

                //console.log(_elems);

                _elems.splice(pageDesignState.dropPosition.current, 0, JSON.parse(JSON.stringify(tempOptions[e.target.closest(".item_drag").getAttribute("data-elementindex")])));

                pageDesignState.setDesign({ ...pageDesignState.design, elements: _elems });
                pageDesignState.dropPosition.current = null;

            } else {

                if (pageDesignState.nodeLevel.current) {

                    AddSubElement(pageDesignState.nodeLevel.current, e.target.closest(".item_drag").getAttribute("data-elementindex"));
                    // //console.log(objR, 'ObjR');
                    // //console.log('before', pageDesignState.design);

                    ////console.log(objR);
                    pageDesignState.nodeLevel.current = null;
                }
            }
        }
    }


    return (
        (htmlElem.length > 0) ?
            <div className='htmlElemGrid'>
                {htmlElem.map((e, i) => {
                    return (<div data-elementindex={i} className="item_drag half" key={e.elid} onDoubleClick={AddDroppedElement} onDragEnd={AddDroppedElement}>
                        <img className="item_drag_img" src={e.previmg} />
                        <p className="item_drag_desc">{e.desc}</p>
                    </div>)
                })}
            </div>
            : ""
    )
}
