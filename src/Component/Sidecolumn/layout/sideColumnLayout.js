import { useState, useContext } from 'react'
import '../elementalStyles.css';
import { pageDesignContext } from '../../../Context/contexts';
// import DirtyData from './dirtyData';
// import { Set, Get } from "react-lodash"
// import set from "lodash.set";
import { set, get } from "lodash";

export default function SideColumnLayout() {

    const pageDesignState = useContext(pageDesignContext)

    const layout = [{
        previmg: "/assets/images/elements/layouts/2col.png",
        elid: "layout_2_col",
        desc: "2 Column Layout",
        elementType: "outerLayout",
        classList: "wd-row",
        elemType: "div",
        styles: {},
        elemEditable: false,
        enableDropping: true,
        elements: [
            { classList: ["wd wd-6"], elemType: "div", styles: {}, elemEditable: false, enableDropping: true, elementType: "layout", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 1", elementType: "tempElem", elements: [] }] },
            { classList: ["wd wd-6"], elemType: "div", styles: {}, elemEditable: false, enableDropping: true, elementType: "layout", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 2", elementType: "tempElem", elements: [] }] },
        ]
    }, {
        previmg: "/assets/images/elements/layouts/2col.png",
        elid: "layout_3_col",
        desc: "3 Column Layout",
        classList: "wd-row",
        elemType: "div",
        styles: {},
        elemEditable: false,
        elements: [
            { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: {}, enableDropping: true, elementType: "layout", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 1", elementType: "tempElem", elements: [] }] },
            { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: {}, enableDropping: true, elementType: "layout", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 2", elementType: "tempElem", elements: [] }] },
            { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: {}, enableDropping: true, elementType: "layout", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 3", elementType: "tempElem", elements: [] }] },
        ]
    }, {
        previmg: "/assets/images/elements/layouts/2col.png",
        elid: "layout_1_col",
        desc: "1 Column Layout",
        classList: "wd-row",
        elemType: "div",
        styles: {},
        enableDropping: true,
        elemEditable: false,
        elements: [
            {
                classList: ["wd wd-12"], elemType: "div", styles: {}, elemEditable: false, enableDropping: true, elementType: "layout", elements: [{ classList: ["temp_elem"], elemType: "div", elemEditable: false, styles: { color: "#dddddd", padding: "30px 0px" }, enableDropping: true, inHTML: "Column 1", elementType: "tempElem", elements: [] }]
            },
        ]
    }]

    const [layoutOptions, setLayoutOptions] = useState(layout);



    const AddSubElement = (elNode, index) => {
        //lets deal with the sub elems!
        elNode = elNode.substr(0, [elNode.length - 1]).split(',');
        let _depth = { ...pageDesignState.design }
        let tempOpt = [...layoutOptions]

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
        if (pageDesignState.design.isDropEnabled) {


            //reset the insert position
            // //console.log(pageDesignState.nodeLevel.current, 'currentType');
            // //console.log(_elems);
            if (pageDesignState.nodeLevel.current === null) {

                let _elems = [];
                let tempOptions = [];
                tempOptions = [...layoutOptions];
                _elems = [...pageDesignState.design.elements];

                //insert at index
                // //console.log(pageDesignState.dropPosition)
                //e.target.closest("").getAttribute("data-elementindex")

                _elems.splice(pageDesignState.dropPosition.current, 0, JSON.parse(JSON.stringify(tempOptions[e.target.closest(".item_drag").getAttribute("data-elementindex")])));
                //console.log(pageDesignState.design.elements);
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

        (layoutOptions.length > 0) ?

            layoutOptions.map((e, i) => {
                return (<div data-elementindex={i} className="item_drag half" key={e.elid} onDragEnd={AddDroppedElement}>
                    <img className="item_drag_img" src={e.previmg} />
                    <p className="item_drag_desc">{e.desc}</p>
                </div>)
            })

            : ""

    )
}
