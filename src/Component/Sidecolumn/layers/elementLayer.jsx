import React, { useState, useEffect, useRef, useContext } from 'react'
import { pageDesignContext } from '../../../Context/contexts';
import { set, get } from "lodash";

import './elementLayer.css'

export default function ElementLayer() {

    let pageDesignState = useContext(pageDesignContext);


    useEffect(() => {
        highlightActiveLayer();
    }, [pageDesignState.actElLayer])

    const highlightActiveLayer = () => {
        let node = document.querySelector("[data-path-layer=\"" + pageDesignState.actElLayer + ",\"]");
        if (node) {

            node.querySelector("span").classList.add("currentlyActiveNode");
        }
    }

    const collapseParentList = (e) => {
        e.stopPropagation()
        let node = e.target;
        if (node) {
            node = node.querySelector(".subNode")

            if (!node && e.target.hasAttribute("data-spannode")) {
                node = e.target.closest("li").querySelector(".subNode");
            }

            if (node) {
                node.classList.toggle("closeNode");
            }
        }
    }

    const MultiLayers = (props) => {

        return (
            <>
                {
                    props.e.map((el, i) => {
                        return (<GenerateLayer element={el} datapath={props.datapath + i + ','} key={props.datapath + i + ','} >{el.elementType}</GenerateLayer>)
                    })
                }
            </>
        )
    }

    const selectLayerNode = (e) => {
        e.stopPropagation()
        let __active_node = e.target.closest("[data-path-layer]").getAttribute("data-path-layer");
        pageDesignState.setELLayer(__active_node.slice(0, __active_node.length - 1));
    }

    const highlightNode = (e) => {
        e.stopPropagation()
        let __el;
        if (e.target.hasAttribute("data-path-layer")) {
            __el = e.target.getAttribute("data-path-layer");
        } else {
            __el = e.target.closest("[data-path-layer]").getAttribute("data-path-layer");
        }
        let node = document.querySelector("[data-path=\"" + __el + "\"]");

        if (node) {
            node.classList.add("layerBasedHighlight");

            // setTimeout(() => {
            //     node.classList.remove("layerBasedHighlight");
            // }, 2500);
        }

    }

    const removeHighlightNode = (e) => {
        e.stopPropagation()
        let __el;
        if (e.target.hasAttribute("data-path-layer")) {
            __el = e.target.getAttribute("data-path-layer");
        } else {
            __el = e.target.closest("[data-path-layer]").getAttribute("data-path-layer");
        }
        let node = document.querySelector("[data-path=\"" + __el + "\"]");

        if (node) {
            node.classList.remove("layerBasedHighlight");
        }
    }

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

    const getWidthCol = (arr) => {
        if (arr.includes("wd wd-1")) {
            return 1;
        }
        if (arr.includes("wd wd-2")) {
            return 2;
        }
        if (arr.includes("wd wd-3")) {
            return 3;
        }
        if (arr.includes("wd wd-4")) {
            return 4;
        }
        if (arr.includes("wd wd-5")) {
            return 5;
        }
        if (arr.includes("wd wd-6")) {
            return 6;
        }
        if (arr.includes("wd wd-7")) {
            return 7;
        }
        if (arr.includes("wd wd-8")) {
            return 8;
        }
        if (arr.includes("wd wd-9")) {
            return 9;
        }
        if (arr.includes("wd wd-10")) {
            return 10;
        }
        if (arr.includes("wd wd-11")) {
            return 11;
        }
        if (arr.includes("wd wd-12")) {
            return 12;
        }
    }

    const duplicateLayerNode = (e) => {
        e.stopPropagation()
        let __active_node = e.target.closest("[data-path-layer]").getAttribute("data-path-layer");
        __active_node = __active_node.slice(0, -1);

        let __el = { ...getNodeData(__active_node, 0, '') };

        let __all_els = [...getNodeData(__active_node, 1, '.elements')];

        let lastIdx = __active_node.split(",");
        lastIdx = +lastIdx[lastIdx.length - 1];

        if (__el.elementType === "Column") {
            /**
             * This will keep the width integrity of the website!
             */

            //calculate width of all the columns in row
            if (__all_els.length === 12) {
                alert("Can not duplicate the column as there is no space for it.")
                return;
            }

            let wd = 0;
            let _elWD = getWidthCol(__el.classList);

            for (let i of __all_els) {
                let __cwd = getWidthCol(i.classList);
                wd += __cwd;
            }

            if ((wd + _elWD) > 12) {
                alert("Dont have space for the duplicate element. Need empty column space of " + _elWD + " curretly columns are occupying the space of " + wd);
                return;
            }

        }



        __all_els.splice(lastIdx, 0, JSON.parse(JSON.stringify(__el)));

        if (__active_node.split(",").length < 2) {

            let __all_els = [...pageDesignState.design.elements];
            __all_els.splice(lastIdx, 0, JSON.parse(JSON.stringify(__el)));

            let __temp_structure = { ...pageDesignState.design }
            __temp_structure.elements = __all_els;

            pageDesignState.setDesign(__temp_structure);

        } else {


            setNodeData(__active_node, 1, __all_els, "elements");
        }

    }

    const GenerateLayer = (props) => {
        let e = props.element;

        // let elProp = { ["data-path-layer"]: props.datapath, onClick: collapseParentList, onMouseEnter: highlightNode, onMouseLeave: removeHighlightNode };
        let elProp = { ["data-path-layer"]: props.datapath, onClick: collapseParentList };


        if (e.elements.length > 0) {
            //has sub elem

            let __cln = props.datapath.charAt(0);
            let __eNode = pageDesignState.actElLayer.charAt(0);

            let __classNames = { className: "subNode  closeNode" };

            if (__cln == __eNode) {
                __classNames = { className: "subNode " }
            }

            if (e.elements.length < 2) {
                //single element


                return React.createElement("li", { ...elProp, className: "hasSubNode" }, [<span data-spannode onDoubleClick={selectLayerNode} onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}>{e.elementType} <div onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}><button className='elementNodeSelector' onClick={selectLayerNode}><i className="las la-mouse-pointer"></i></button><button className='duplicateLayer' onClick={duplicateLayerNode}><i className="las la-copy"></i></button></div></span>, React.createElement("ul", __classNames, <GenerateLayer datapath={props.datapath + '0,'} element={e.elements[0]} >{e.elementType}</GenerateLayer>)])



            } else {
                //more then one element

                return React.createElement("li", { ...elProp, className: "hasSubNode" }, [<span onDoubleClick={selectLayerNode} data-spannode onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}>{e.elementType} <div onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}><button className='elementNodeSelector' onClick={selectLayerNode}><i className="las la-mouse-pointer"></i></button><button className='duplicateLayer' onClick={duplicateLayerNode}><i className="las la-copy"></i></button></div></span>, React.createElement("ul", __classNames, <MultiLayers datapath={props.datapath} e={e.elements} />)]);

            }

        } else {

            return React.createElement("li", { ...elProp, className: "layerNode" }, <span onDoubleClick={selectLayerNode} data-spannode onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}>{e.elementType}<div onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}><button className='elementNodeSelector' onClick={selectLayerNode}><i className="las la-mouse-pointer"></i></button><button className='duplicateLayer' onClick={duplicateLayerNode}><i className="las la-copy"></i></button></div></span>);

        }
    }



    return (
        <div className='WebpageLayersOuter'>
            <div className="webpageLayerInner">
                <div className="layergroup">
                    <ul>
                        {
                            pageDesignState.design.elements.map((e, i) => {
                                return (<GenerateLayer key={i} element={e} datapath={i + ','} />)
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
