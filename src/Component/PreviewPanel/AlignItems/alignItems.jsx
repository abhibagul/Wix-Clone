import React, { useState, useEffect, useRef, useContext } from 'react'
import './alignItems.css'
import { set, get } from "lodash";
import { pageDesignContext } from '../../../Context/contexts';
export default function AlignItems(props) {


    let pageDesignState = useContext(pageDesignContext);

    const [flexAlignOptions, setFlexAlignOptions] = useState({
        alignItems: "flex-start",
        justifyContent: "flex-start"
    })

    let prevTimerHelper = useRef(null);

    useEffect(() => {
        prevFlexOptions();
    }, [flexAlignOptions])

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

        //close panel

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

    const applyFlexOptions = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };

        __style_prop = { ...__style_prop, ...flexAlignOptions };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();
    }

    const prevFlexOptions = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");

        node.style.alignItems = flexAlignOptions.alignItems;
        node.style.justifyContent = flexAlignOptions.justifyContent;

        node.classList.add("alignOptionsPrev");

        if (prevTimerHelper.current) clearTimeout(prevTimerHelper.current);

        prevTimerHelper.current = setTimeout(() => {
            document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]").classList.remove("alignOptionsPrev")
        }, 2000)
    }

    return (
        <div className='wdAlignPanel'>
            <div className='wdAlignInner'>
                <h5>
                    Horizontal align
                </h5>
                <div className='halign-options'>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, alignItems: "flex-start" })}>
                        <img src="/assets/images/flexAlign/leftAlign.jpg" />
                        <span>Left</span>
                    </div>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, alignItems: "center" })}>
                        <img src="/assets/images/flexAlign/centerAlign.jpg" />
                        <span>Center</span>
                    </div>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, alignItems: "flex-end" })}>
                        <img src="/assets/images/flexAlign/rightAlign.jpg" />
                        <span>Right</span>
                    </div>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, alignItems: "stretch" })}>
                        <img src="/assets/images/flexAlign/stretchAlign.jpg" />
                        <span>Stretch</span>
                    </div>
                </div>
                <h5>Vertical Align</h5>
                <div className='halign-options'>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, justifyContent: "flex-start" })}>
                        <img src="/assets/images/flexAlign/justifyTop.jpg" />
                        <span>Top</span>
                    </div>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, justifyContent: "center" })}>
                        <img src="/assets/images/flexAlign/justifyCenter.jpg" />
                        <span>Center</span>
                    </div>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, justifyContent: "flex-end" })}>
                        <img src="/assets/images/flexAlign/justifyBottom.jpg" />
                        <span>Bottom</span>
                    </div>

                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, justifyContent: "space-evenly" })}>
                        <img src="/assets/images/flexAlign/justifySpaceEvenly.jpg" />
                        <span>Space Evenly</span>
                    </div>
                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, justifyContent: "space-around" })}>
                        <img src="/assets/images/flexAlign/justifySpaceAround.jpg" />
                        <span>Space Around</span>
                    </div>

                    <div className='align-option' onClick={() => setFlexAlignOptions({ ...flexAlignOptions, justifyContent: "space-between" })}>
                        <img src="/assets/images/flexAlign/justifySpaceBetween.jpg" />
                        <span>Space Between</span>
                    </div>
                </div>

                <div className='applyFlexOption'>
                    <button onClick={applyFlexOptions}>Apply</button>
                </div>
            </div>
        </div >
    )
}
