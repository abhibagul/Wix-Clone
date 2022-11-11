import React, { useContext, useState } from 'react'
import { pageDesignContext } from '../../../Context/contexts'
import { set, get } from "lodash";
export default function ListSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    const directChangeListType = (e) => {
        if (e.target.value !== "none") {
            let currentNode = props.currentlyActive.current;
            let __current_elem = getNodeData(currentNode, 0)
            __current_elem.elemType = e.target.value;
            setNodeData(currentNode, 0, __current_elem);
        }

    }

    const getCurrentListType = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)
        return __current_elem.elemType;
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

    return (
        <div className='ListSettingsPanel'>
            <div className="ListSettingsPanelInner">
                <h5>List Type</h5>
                <select onChange={directChangeListType}>
                    <option selected={(getCurrentListType() === "ul") ? true : false} value={"ul"}>Unordered List</option>
                    <option selected={(getCurrentListType() === "ol") ? true : false} value={"ol"}>Ordered List 2</option>
                </select>


            </div>
        </div>
    )
}
