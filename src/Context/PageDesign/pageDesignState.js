import { useEffect } from "react";
import { useState, useRef } from "react";
import { pageDesignContext } from "../contexts";

const PageDesignState = (props) => {
    const InitialDeisgnState = {
        pageMode: 1,
        settigMode: -1,
        isDropEnabled: true,
        dropIndex: 0,
        fonts: [],
        elements: []
    }



    const dropPosition = useRef(0)
    const nodeLevel = useRef(null)

    const activeElemLayer = useRef(null);

    const [design, setDesign] = useState(InitialDeisgnState);
    const [actElLayer, setELLayer] = useState("0,");

    // useEffect(() => {
    //     console.log(design, 'from state update');
    // }, [design])

    return (
        <pageDesignContext.Provider value={{ design, setDesign, dropPosition, nodeLevel, activeElemLayer, actElLayer, setELLayer }}>
            {props.children}
        </pageDesignContext.Provider>
    )
}


export default PageDesignState;
