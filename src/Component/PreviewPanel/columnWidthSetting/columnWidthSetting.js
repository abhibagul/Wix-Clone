import React, { useState, useEffect, useContext } from 'react'
import { set, get } from "lodash";
import { pageDesignContext } from '../../../Context/contexts';
import './columnWidthSetting.css'
export default function ColumnWidthSetting(props) {

    let pageDesignState = useContext(pageDesignContext);

    let [colSize, setColSize] = useState({
        selEl: null,
        colwd: -1,
        emptySpace: 0,
        options: [],
        colSizes: [],
        colIdx: 0
    })

    useEffect(() => {
        getCurrentColSize();
    }, [])

    useEffect(() => {
        updateWidthSetting();
    }, [pageDesignState.design])

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

    const updateWidthSetting = () => {

        if (!colSize.selEl) {
            return;
        }

        let __class_list = getNodeData(colSize.selEl, 0, "");
        let __cwd = getWidthCol(__class_list.classList)

        //calculate empty space of it
        let __emptySpace = getNodeData(colSize.selEl, 1, "");
        let __availableSpace = 0;
        let __cols_sizes = [];
        for (let i of __emptySpace.elements) {
            __availableSpace += getWidthCol(i.classList);
            __cols_sizes.push(getWidthCol(i.classList));
        }

        let __options_new = [];
        for (let i = 0; i < (__cwd + (12 - __availableSpace)); i++) {
            __options_new.push((i + 1));
        }

        setColSize({ ...colSize, colwd: __cwd, emptySpace: (12 - __availableSpace), options: __options_new, colSizes: __cols_sizes });
    }

    const getCurrentColSize = () => {

        // let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        // if (node) {
        let __class_list = getNodeData(props.currentlyActive.current, 0, "");
        let __cwd = getWidthCol(__class_list.classList)

        //calculate empty space of it
        let __emptySpace = getNodeData(props.currentlyActive.current, 1, "");
        let __availableSpace = 0;
        let __cols_sizes = [];
        for (let i of __emptySpace.elements) {
            __availableSpace += getWidthCol(i.classList);
            __cols_sizes.push(getWidthCol(i.classList));
        }

        let __colIdx = props.currentlyActive.current;
        __colIdx = __colIdx.split(",");
        __colIdx = __colIdx[__colIdx.length - 1];

        let __options = [];


        for (let i = 0; i < (__cwd + (12 - __availableSpace)); i++) {
            __options.push((i + 1));
        }

        setColSize({ ...colSize, colwd: __cwd, emptySpace: (12 - __availableSpace), options: __options, selEl: props.currentlyActive.current, colIdx: +__colIdx, colSizes: __cols_sizes });
        // }
    }



    const ApplyElementWidths = (e) => {
        if (e.target.value !== "none") {

            let currentNode = props.currentlyActive.current;
            let __current_elem = getNodeData(currentNode, 0, '')
            let __currentClasslist = [...__current_elem.classList];

            let __cwd = getWidthCol(__currentClasslist)

            __currentClasslist.splice(__currentClasslist.indexOf(`wd wd-${__cwd}`), 1, e.target.value);

            __current_elem.classList = __currentClasslist;
            setNodeData(currentNode, 0, __current_elem, '');
        }
    }

    const createEmptyColumn = () => {
        let currentNode = props.currentlyActive.current;
        let __parent_node = { ...getNodeData(currentNode, 1, '') };
        let __parent_node_elems = [...__parent_node.elements];

        let _empty_colJson = { classList: ["wd wd-" + colSize.emptySpace], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column " + (colSize.colSizes.length + 1), elementType: "tempElem", elements: [] }] };

        __parent_node_elems.push(JSON.parse(JSON.stringify(_empty_colJson)));

        __parent_node.elements = __parent_node_elems;

        // pageDesignState.setDesign()
        setNodeData(currentNode, 1, __parent_node_elems, '["elements"]')

    }

    return (
        <div className='columnWidthSettingPanel'>
            <div className="columnWidthSettingInner">

                <h5>Select Column Width:</h5>
                <div className='row_resize_prev'>
                    <div className='resize_row'>
                        {
                            colSize.colSizes.map((e, i) => {
                                return (
                                    <div key={`column-${i}`} className={(i === colSize.colIdx) ? "slectedEl" : "deadEl"} style={{ width: (e * 8.333333333333333333333 + "%") }}>
                                        <span className='resizerColName'>Column {(i + 1)}</span>
                                        {
                                            (i === colSize.colIdx) &&
                                            <>
                                                <select onChange={ApplyElementWidths}>
                                                    {

                                                        colSize.options.map((e) => {
                                                            return (
                                                                <option key={e} value={`wd wd-${e}`}>{`${e} unit`}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            (colSize.emptySpace > 0) &&
                            <>
                                <div className='colEmptySpace' style={{ width: (colSize.emptySpace * 8.333333333333333333333 + "%") }}>
                                    <span className='resizerColName'>Empty Space</span>
                                    <button className='createNewCol' onClick={createEmptyColumn}><i className="las la-plus"></i> Column</button>
                                </div>
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
