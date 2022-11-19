import { useState, useEffect } from "react";
import { userDetailsContext } from "../contexts";
import { useUser } from "../../Component/auth/useUser";

const UserDetailsState = (props) => {

    const initialUserDetails = {
        user: "",
        email: "",
        _id: "",
        pageId: "",
        websiteId: "",
        id: ""
    }


    const [user, setUserDeatils] = useState(initialUserDetails)
    const [editorState, setEditorState] = useState({})

    const userId = useUser();

    useEffect(() => {

        if (userId) {
            setUserDeatils({ ...userId, user: userId.username })

        }
    }, [userId])

    // useEffect(() => {
    //     
    // }, [editorState])

    return (
        <userDetailsContext.Provider value={{ user, setUserDeatils, editorState, setEditorState }}>
            {props.children}
        </userDetailsContext.Provider>
    )
}


export default UserDetailsState;
