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


                return React.createElement("li", { ...elProp, className: "hasSubNode" }, [<span data-spannode onDoubleClick={selectLayerNode} onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}>{e.elementType} <button className='elementNodeSelector' onClick={selectLayerNode}><i className="las la-mouse-pointer"></i></button></span>, React.createElement("ul", __classNames, <GenerateLayer datapath={props.datapath + '0,'} element={e.elements[0]} >{e.elementType}</GenerateLayer>)])



            } else {
                //more then one element

                return React.createElement("li", { ...elProp, className: "hasSubNode" }, [<span onDoubleClick={selectLayerNode} data-spannode onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}>{e.elementType}<button className='elementNodeSelector' onClick={selectLayerNode}><i className="las la-mouse-pointer"></i></button></span>, React.createElement("ul", __classNames, <MultiLayers datapath={props.datapath} e={e.elements} />)]);

            }

        } else {

            return React.createElement("li", { ...elProp, className: "layerNode" }, <span onDoubleClick={selectLayerNode} data-spannode onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}>{e.elementType}<button className='elementNodeSelector' onClick={selectLayerNode}><i className="las la-mouse-pointer"></i></button></span>);

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
