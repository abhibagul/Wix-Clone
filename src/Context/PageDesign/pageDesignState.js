import { useState, useRef, useContext } from "react";
import { pageDesignContext } from "../contexts"
import { useUser } from "../../Component/auth/useUser";
import { useToken } from "../../Component/auth/useToken";
import axios from 'axios'
import { userDetailsContext } from "../contexts";
import * as htmlToImage from 'html-to-image';
import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

const PageDesignState = (props) => {

    const InitialDeisgnState = {
        projectId: null,
        projectAuthor: "",
        pageUri: "",
        websiteSetting: {
            siteName: "My Website",
            favIco: "https://reactjs.org/favicon.ico",
            socialImage: "",
            desc: "Description for the webpage"
        },
        published: false,
        pageMode: 1,
        settigMode: -1,
        isDropEnabled: true,
        analyticsID: "",
        dropIndex: 0,
        fonts: [{
            "font": "Poppins",
            "weights": [
                "300",
                "regular",
                "700"
            ]
        }],
        elements: []
    }

    // const navigate = useNavigate();

    const UserDetailsState = useContext(userDetailsContext);


    const dropPosition = useRef(0)
    const nodeLevel = useRef(null)

    const activeElemLayer = useRef(null);


    const [design, setDesign] = useState(InitialDeisgnState);
    const [actElLayer, setELLayer] = useState("0,");
    const [webDesignState, setWebDesignState] = useState({});

    const user = useUser();
    const [token,] = useToken();


    const [tokenTracker, setTokenTracker] = useState(token);

    useEffect(() => {
        if (user) {
            let { id } = user;
            if (id) UserDetailsState.setUserDeatils({ ...UserDetailsState.user, _id: id, id: id })
        }

    }, [user])

    useEffect(() => {

        setTokenTracker(token);
    }, [token])


    const saveWebPage = async (status, ImgUri, type) => {



        if (status === 200 && design.elements.length > 0) {
            setWebDesignState({ ...webDesignState, prevImgUri: ImgUri });
            //update the website setting
            await axios.post('/api/save-webprev/', {
                id: UserDetailsState.user.id,
                websiteId: UserDetailsState.editorState.websiteId,
                imageUri: "" + ImgUri
            }, {
                headers: { Authorization: `Bearer ${tokenTracker}` }
            })
        }

        //go for regular saving of page

        try {
            let __design_data = { ...design };
            if (type === "publish") {
                __design_data.published = !design.published;
                setDesign({ ...design, published: !design.published })
            }
            delete __design_data['_id'];
            __design_data.settigMode = -1;


            await axios.post('/api/save-webpage/', {
                id: UserDetailsState.user.id,
                pageId: UserDetailsState.editorState.pageId,
                pageJso: __design_data
            }, {
                headers: { Authorization: `Bearer ${tokenTracker}` }
            }).then(response => {
                // 
                alert("Saved.")

            }).catch(err => {
                alert("Can not save the webpage")
            })

        } catch (e) {

            alert("Unable to save the webpage try again!");
        }
    }

    const removeWebPage = async () => {
        try {

            await axios.post('/api/remove-webpage/', {
                id: UserDetailsState.user.id,
                pageId: UserDetailsState.editorState.pageId,
                webId: UserDetailsState.editorState.websiteId
            }, {
                headers: { Authorization: `Bearer ${tokenTracker}` }
            }).then(response => {
                // 
                alert("Deleted.")

                UserDetailsState.setEditorState({ ...UserDetailsState.editorState, pageId: response.data.pageId });
                // navigate(`/designer/${UserDetailsState.editorState.websiteId}/${response.data.pageID}/`)

            }).catch(err => {
                alert("Can not delete the webpage")
            })

        } catch (e) {

            alert("Unable to delete the webpage try again!");
        }
    }

    const getWebPageImageAndSavePage = async (type = "save") => {

        try {
            let sizes = document.querySelector('[data-prevpanel]').getBoundingClientRect();

            await htmlToImage.toJpeg(document.querySelector('[data-prevpanel]'), { quality: 0.95, width: sizes.width, height: (205 / 280) * sizes.width, canvasWidth: 280, canvasHeight: 205, backgroundColor: '#ffffff' })
                .then(function (dataUrl) {
                    //
                    saveWebPage(200, dataUrl, type)
                }).catch(err => {
                    saveWebPage(500, "")
                })
        } catch (e) {

            alert("Unable to save the webpage! Try again!");
        }
    }


    const publishWebPage = async () => {

        if (design.elements.length < 1) {
            alert("Can not publish blank page. Add elements to publish.");
            return;
        }
        getWebPageImageAndSavePage("publish");

    }
    // useEffect(() => {
    //     
    // }, [design])

    return (
        <pageDesignContext.Provider value={{ design, setDesign, tokenTracker, setTokenTracker, dropPosition, publishWebPage, nodeLevel, activeElemLayer, actElLayer, setELLayer, webDesignState, setWebDesignState, getWebPageImageAndSavePage, removeWebPage }}>
            {props.children}
        </pageDesignContext.Provider>
    )
}


export default PageDesignState;
