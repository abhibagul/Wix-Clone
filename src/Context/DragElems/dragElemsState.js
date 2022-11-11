import { useState } from "react";
import { dragElemsContext } from "../contexts";

const DragElemsState = (props) => {
    const InitialDragElemsState = {
        customLayoutOptions: []
    }

    const [__dragElems, __setDragElems] = useState(InitialDragElemsState);

    // useEffect(() => {
    //     console.log(design, 'from state update');
    // }, [design])

    return (
        <dragElemsContext.Provider value={{ __dragElems, __setDragElems }}>
            {props.children}
        </dragElemsContext.Provider>
    )
}


export default DragElemsState;
