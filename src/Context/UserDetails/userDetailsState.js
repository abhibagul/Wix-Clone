import { useState, useEffect } from "react";
import { userDetailsContext } from "../contexts";


const UserDetailsState = (props) => {

    const initialUserDetails = {
        user: "",
        email: "",
        _id: "",
        pageId: "",
        websiteId: ""
    }


    const [user, setUserDeatils] = useState(initialUserDetails)
    const [editorState, setEditorState] = useState({})

    useEffect(() => {
        console.log("effect on", user);
    }, [user])

    useEffect(() => {
        console.log("effect on editor", editorState);
    }, [editorState])

    return (
        <userDetailsContext.Provider value={{ user, setUserDeatils, editorState, setEditorState }}>
            {props.children}
        </userDetailsContext.Provider>
    )
}


export default UserDetailsState;
