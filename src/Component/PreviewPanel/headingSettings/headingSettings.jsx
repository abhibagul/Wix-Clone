import React, { useContext } from 'react'
import { pageDesignContext } from '../../../Context/contexts'
import { set, get } from "lodash";
import './headingSettings.css'
export default function HeadingSettings(props) {

    let pageDesignState = useContext(pageDesignContext);

    const directChangeHeadingType = (e) => {
        if (e.target.value !== "none") {

            let currentNode = props.currentlyActive.current;
            let __current_elem = getNodeData(currentNode, 0)
            __current_elem.elemType = e.target.value;
            setNodeData(currentNode, 0, __current_elem);
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
        <div className='headingSettingsPanel'>
            <div className="headingSettingsInner">
                <h5>Heading type:</h5>
                <select onChange={directChangeHeadingType}>
                    <option value="none">Select option..</option>
                    <option value={"h1"}>Heading 1</option>
                    <option value={"h2"}>Heading 2</option>
                    <option value={"h3"}>Heading 3</option>
                    <option value={"h4"}>Heading 4</option>
                    <option value={"h5"}>Heading 5</option>
                    <option value={"h6"}>Heading 6</option>
                    <option value={"p"}>Paragraph</option>
                </select>
            </div>
        </div>
    )
}
