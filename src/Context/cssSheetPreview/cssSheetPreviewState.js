import { useState } from "react";
import { cssSheetPreview } from "../contexts";

const CssSheetPreviewState = (props) => {


    const [cssSheet, setCssSheet] = useState("");




    // useEffect(() => {
    //     
    // }, [design])

    return (
        <cssSheetPreview.Provider value={{ cssSheet, setCssSheet }}>
            {props.children}
        </cssSheetPreview.Provider>
    )
}


export default CssSheetPreviewState;
