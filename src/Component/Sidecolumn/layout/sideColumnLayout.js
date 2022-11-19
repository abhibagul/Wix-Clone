import { useState, useContext } from 'react'
import '../elementalStyles.css';
import { pageDesignContext, dragElemsContext } from '../../../Context/contexts';
// import DirtyData from './dirtyData';
// import { Set, Get } from "react-lodash"
// import set from "lodash.set";
import { set, get } from "lodash";

import './sideColumnLayout.css'
import { useEffect } from 'react';

export default function SideColumnLayout() {

    const pageDesignState = useContext(pageDesignContext)
    const dragElOptions = useContext(dragElemsContext)



    let layout = [{
        previmg: "/assets/images/elements/layouts/header.jpg",
        elid: "layout_12_col_header",
        desc: "Header Layout",
        classList: "wd-row",
        elementType: "Header Layout",
        attributes: {},
        elemType: "header",
        styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px", position: "static" },
        enableDropping: false,
        elemEditable: false,
        elements: [
            {
                classList: ["wd wd-12"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemType: "div", elemEditable: false, styles: { color: "#dddddd", padding: "30px 0px" }, enableDropping: true, inHTML: "Column 1", elementType: "tempElem", elements: [] }]
            },
        ]
    }, {
        previmg: "/assets/images/elements/layouts/1col.jpg",
        elid: "layout_12_col",
        desc: "1 Column Layout [12]",
        classList: "wd-row",
        elementType: "Row Layout",
        attributes: {},
        elemType: "div",
        styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px" },
        enableDropping: false,
        elemEditable: false,
        elements: [
            {
                classList: ["wd wd-12"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemType: "div", elemEditable: false, styles: { color: "#dddddd", padding: "30px 0px" }, enableDropping: true, inHTML: "Column 1", elementType: "tempElem", elements: [] }]
            },
        ]
    }, {
        previmg: "/assets/images/elements/layouts/2col.jpg",
        elid: "layout_6_6_col",
        desc: "2 Column Layout [6,6]",
        elementType: "Row Layout",
        classList: "wd-row",
        elemType: "div",
        styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px" },
        elemEditable: false,
        attributes: {},
        enableDropping: false,
        elements: [
            { classList: ["wd wd-6"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 1", elementType: "tempElem", elements: [] }] },
            { classList: ["wd wd-6"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 2", elementType: "tempElem", elements: [] }] },
        ]
    }, {
        previmg: "/assets/images/elements/layouts/3col.jpg",
        elid: "layout_4_4_4_col",
        desc: "3 Column Layout [4,4,4]",
        elementType: "Row Layout",
        classList: "wd-row",
        elemType: "div",
        attributes: {},
        styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px" },
        elemEditable: false,
        enableDropping: false,
        elements: [
            { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: { padding: "5px" }, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 1", elementType: "tempElem", elements: [] }] },
            { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: { padding: "5px" }, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 2", elementType: "tempElem", elements: [] }] },
            { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: { padding: "5px" }, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 3", elementType: "tempElem", elements: [] }] },
        ]
    }]

    if (dragElOptions.__dragElems.customLayoutOptions.length > 0) {
        layout = [...dragElOptions.__dragElems.customLayoutOptions, ...layout];
    }

    const [layoutOptions, setLayoutOptions] = useState(layout);

    const removeDuplicates = (myArr, prop) => {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
        })
    }

    useEffect(() => {

        let __new_options = [...layout];


        if (dragElOptions.__dragElems.customLayoutOptions.length > 0) {
            __new_options = [...dragElOptions.__dragElems.customLayoutOptions, ...__new_options]
        }

        setLayoutOptions(removeDuplicates(__new_options, "elid"));


    }, [dragElOptions]);

    const AddSubElement = (elNode, index) => {
        //lets deal with the sub elems!
        elNode = elNode.substr(0, [elNode.length - 1]).split(',');
        let _depth = { ...pageDesignState.design }
        let tempOpt = [...layoutOptions]

        // let _parent_el = get(_depth, 'elements[' + parentNode.join('].elements[') + '].elements')
        let _earlier_options = get(_depth, 'elements[' + elNode.join('].elements[') + ']');


        if (!_earlier_options.enableDropping) {
            //remove the last elem might help

            elNode = elNode.slice(0, -1);
            if (elNode.length > 0) {
                _earlier_options = get(_depth, 'elements[' + elNode.join('].elements[') + '].elements');
                _depth = set(_depth, 'elements[' + elNode.join('].elements[') + '].elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
            } else {
                _earlier_options = get(_depth, 'elements');
                _depth = set(_depth, 'elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
            }


        } else {

            _earlier_options = _earlier_options.elements
            _depth = set(_depth, 'elements[' + elNode.join('].elements[') + '].elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
        }

        pageDesignState.setDesign(_depth);



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
        if (pageDesignState.design.isDropEnabled) {


            //reset the insert position

            if (pageDesignState.nodeLevel.current === null) {


                let _elems = [];
                let tempOptions = [];
                tempOptions = [...layoutOptions];
                _elems = [...pageDesignState.design.elements];

                //insert at index

                //e.target.closest("").getAttribute("data-elementindex")

                _elems.splice(pageDesignState.dropPosition.current, 0, JSON.parse(JSON.stringify(tempOptions[e.target.closest(".item_drag").getAttribute("data-elementindex")])));

                // if (!pageDesignState.design.elements[pageDesignState.dropPosition.current].enableDropping) {
                //     alert("Can not add sub element to this element");
                //     return;
                // }

                pageDesignState.setDesign({ ...pageDesignState.design, elements: _elems });
                pageDesignState.dropPosition.current = null;

            } else {

                if (pageDesignState.nodeLevel.current) {
                    AddSubElement(pageDesignState.nodeLevel.current, e.target.closest(".item_drag").getAttribute("data-elementindex"));
                    pageDesignState.nodeLevel.current = null;
                }
            }
        }
    }

    return (
        <>
            <div className='custom-row'>
                <button onClick={() => { pageDesignState.setDesign({ ...pageDesignState.design, settigMode: 0 }) }}>Create custom Layout</button>
            </div>
            <div className='custom-layouts'>
                {/* <h5>Frequently used,</h5> */}
                {(layoutOptions.length > 0) ?

                    layoutOptions.map((e, i) => {
                        return (<div data-elementindex={i} className="item_drag half"
                            style={{ MoxUserSelect: "none", WebkitUserSelect: "none", MsUserSelect: "none", userSelect: "none", OUserSelect: "none" }}

                            key={e.elid + "-" + i} onDoubleClick={AddDroppedElement} onDragEnd={AddDroppedElement}>
                            <img className="item_drag_img" src={e.previmg} />
                            <p className="item_drag_desc">{e.desc}</p>
                        </div>)
                    })

                    : ""}
            </div>
        </>
    )
}
