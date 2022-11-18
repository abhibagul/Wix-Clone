import { useState, useRef, useContext } from "react";
import { pageDesignContext } from "../contexts"
import { useUser } from "../../Component/auth/useUser";
import { useToken } from "../../Component/auth/useToken";
import axios from 'axios'
import { userDetailsContext } from "../contexts";
import * as htmlToImage from 'html-to-image';

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
        elements: [{
            "previmg": "/assets/images/elements/layouts/1col.jpg",
            "elid": "layout_12_col_header",
            "desc": "Header Layout",
            "classList": "wd-row",
            "elementType": "Header Layout",
            "attributes": {},
            "elemType": "header",
            "styles": {
                "maxWidth": "calc(100% - 0px)",
                "margin": "0px 0px",
                "padding": "5px",
                "position": "absolute",
                "top": "nullpx"
            },
            "enableDropping": false,
            "elemEditable": false,
            "elements": [
                {
                    "classList": [
                        "wd wd-12"
                    ],
                    "elemType": "div",
                    "styles": {
                        "padding": "5px",
                        "minHeight": "58.2569465637207px"
                    },
                    "elemEditable": false,
                    "enableDropping": true,
                    "elementType": "Column",
                    "elements": [
                        {
                            "previmg": "/assets/images/elements/layouts/2col.jpg",
                            "elid": "layout_6_6_col",
                            "desc": "2 Column Layout [6,6]",
                            "elementType": "Row Layout",
                            "classList": "wd-row",
                            "elemType": "div",
                            "styles": {
                                "maxWidth": "1100px",
                                "margin": "0 auto",
                                "padding": "5px",
                                "minHeight": "62.265625px"
                            },
                            "elemEditable": false,
                            "attributes": {},
                            "enableDropping": false,
                            "elements": [
                                {
                                    "classList": [
                                        "wd wd-3"
                                    ],
                                    "elemType": "div",
                                    "styles": {
                                        "padding": "5px",
                                        "minHeight": "24.274307250976562px",
                                        "alignItems": "center",
                                        "justifyContent": "center"
                                    },
                                    "elemEditable": false,
                                    "enableDropping": true,
                                    "elementType": "Column",
                                    "elements": [
                                        {
                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                            "elid": "headers",
                                            "inHTML": "My%20Company",
                                            "desc": "headers",
                                            "attributes": {},
                                            "elementType": "Headings",
                                            "classList": "",
                                            "styles": {
                                                "color": "#ffffff",
                                                "fontFamily": "Poppins",
                                                "fontSize": "1.2em",
                                                "fontWeight": 800,
                                                "textAlign": "left",
                                                "textTransform": "uppercase",
                                                "letterSpacing": "1px",
                                                "lineHeight": "1.2em"
                                            },
                                            "elemType": "h1",
                                            "elemEditable": true,
                                            "enableDropping": false,
                                            "elements": []
                                        }
                                    ]
                                },
                                {
                                    "classList": [
                                        "wd wd-9"
                                    ],
                                    "elemType": "div",
                                    "styles": {
                                        "padding": "5px",
                                        "minHeight": "12.274307250976562px",
                                        "alignItems": "flex-end",
                                        "justifyContent": "center"
                                    },
                                    "elemEditable": false,
                                    "enableDropping": true,
                                    "elementType": "Column",
                                    "elements": [
                                        {
                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                            "elid": "navMenu",
                                            "inHTML": "",
                                            "desc": "Navigation Menu",
                                            "attributes": {
                                                "data-navigation-menu": "true"
                                            },
                                            "elementType": "Navigation",
                                            "classList": "",
                                            "styles": {
                                                "position": "relative"
                                            },
                                            "elemType": "nav",
                                            "elemEditable": false,
                                            "enableDropping": false,
                                            "elements": [
                                                {
                                                    "previmg": "/assets/images/elements/layouts/2col.png",
                                                    "elid": "navListedItem",
                                                    "inHTML": "",
                                                    "desc": "navListedItem",
                                                    "attributes": {},
                                                    "elementType": "navListedItem",
                                                    "classList": "",
                                                    "styles": {
                                                        "padding": "5px"
                                                    },
                                                    "elemType": "ul",
                                                    "elemEditable": false,
                                                    "enableDropping": true,
                                                    "elements": [
                                                        {
                                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                                            "elid": "NavLinkItem",
                                                            "inHTML": "",
                                                            "desc": "NavLinkItem",
                                                            "attributes": {},
                                                            "elementType": "NavLinkItem",
                                                            "classList": "",
                                                            "styles": {
                                                                "padding": "5px"
                                                            },
                                                            "elemType": "li",
                                                            "elemEditable": false,
                                                            "enableDropping": false,
                                                            "elements": [
                                                                {
                                                                    "previmg": "/assets/images/elements/layouts/2col.png",
                                                                    "elid": "NavInerLinkItem",
                                                                    "inHTML": "Home",
                                                                    "desc": "NavInnerLinkItem",
                                                                    "attributes": {
                                                                        "href": "#",
                                                                        "target": "_blank"
                                                                    },
                                                                    "elementType": "NavInnerLinkItem",
                                                                    "classList": "",
                                                                    "linktype": "url",
                                                                    "styles": {
                                                                        "color": "#ffffff",
                                                                        "padding": "5px",
                                                                        "textDecoration": "none",
                                                                        "fontFamily": "Poppins",
                                                                        "fontSize": "1em",
                                                                        "fontWeight": 500,
                                                                        "textAlign": "left",
                                                                        "textTransform": "uppercase",
                                                                        "letterSpacing": "1px",
                                                                        "lineHeight": "1.2em",
                                                                        "borderTop": "2px none #000000",
                                                                        "borderLeft": "2px none #000000",
                                                                        "borderRight": "2px none #000000",
                                                                        "borderBottom": "2px solid #ffffff"
                                                                    },
                                                                    "elemType": "a",
                                                                    "elemEditable": false,
                                                                    "enableDropping": false,
                                                                    "elements": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                                            "elid": "NavLinkItem",
                                                            "inHTML": "",
                                                            "desc": "NavLinkItem",
                                                            "attributes": {},
                                                            "elementType": "NavLinkItem",
                                                            "classList": "",
                                                            "styles": {
                                                                "padding": "5px"
                                                            },
                                                            "elemType": "li",
                                                            "elemEditable": false,
                                                            "enableDropping": false,
                                                            "elements": [
                                                                {
                                                                    "previmg": "/assets/images/elements/layouts/2col.png",
                                                                    "elid": "NavInerLinkItem",
                                                                    "inHTML": "Products",
                                                                    "desc": "NavInnerLinkItem",
                                                                    "attributes": {
                                                                        "href": "#",
                                                                        "target": "_blank"
                                                                    },
                                                                    "elementType": "NavInnerLinkItem",
                                                                    "classList": "",
                                                                    "linktype": "url",
                                                                    "styles": {
                                                                        "color": "#ffffff",
                                                                        "padding": "5px",
                                                                        "textDecoration": "none",
                                                                        "fontFamily": "Poppins",
                                                                        "fontSize": "1em",
                                                                        "fontWeight": 500,
                                                                        "textAlign": "left",
                                                                        "textTransform": "uppercase",
                                                                        "letterSpacing": "1px",
                                                                        "lineHeight": "1.2em"
                                                                    },
                                                                    "elemType": "a",
                                                                    "elemEditable": false,
                                                                    "enableDropping": false,
                                                                    "elements": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                                            "elid": "NavLinkItem",
                                                            "inHTML": "",
                                                            "desc": "NavLinkItem",
                                                            "attributes": {},
                                                            "elementType": "NavLinkItem",
                                                            "classList": "",
                                                            "styles": {
                                                                "padding": "5px"
                                                            },
                                                            "elemType": "li",
                                                            "elemEditable": false,
                                                            "enableDropping": false,
                                                            "elements": [
                                                                {
                                                                    "previmg": "/assets/images/elements/layouts/2col.png",
                                                                    "elid": "NavInerLinkItem",
                                                                    "inHTML": "About",
                                                                    "desc": "NavInnerLinkItem",
                                                                    "attributes": {
                                                                        "href": "#",
                                                                        "target": "_blank"
                                                                    },
                                                                    "elementType": "NavInnerLinkItem",
                                                                    "classList": "",
                                                                    "linktype": "url",
                                                                    "styles": {
                                                                        "color": "#ffffff",
                                                                        "padding": "5px",
                                                                        "textDecoration": "none",
                                                                        "fontFamily": "Poppins",
                                                                        "fontSize": "1em",
                                                                        "fontWeight": 500,
                                                                        "textAlign": "left",
                                                                        "textTransform": "uppercase",
                                                                        "letterSpacing": "1px",
                                                                        "lineHeight": "1.2em"
                                                                    },
                                                                    "elemType": "a",
                                                                    "elemEditable": false,
                                                                    "enableDropping": false,
                                                                    "elements": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                                            "elid": "NavLinkItem",
                                                            "inHTML": "",
                                                            "desc": "NavLinkItem",
                                                            "attributes": {},
                                                            "elementType": "NavLinkItem",
                                                            "classList": "",
                                                            "styles": {
                                                                "padding": "5px"
                                                            },
                                                            "elemType": "li",
                                                            "elemEditable": false,
                                                            "enableDropping": false,
                                                            "elements": [
                                                                {
                                                                    "previmg": "/assets/images/elements/layouts/2col.png",
                                                                    "elid": "NavInerLinkItem",
                                                                    "inHTML": "Contact",
                                                                    "desc": "NavInnerLinkItem",
                                                                    "attributes": {
                                                                        "href": "#",
                                                                        "target": "_blank"
                                                                    },
                                                                    "elementType": "NavInnerLinkItem",
                                                                    "classList": "",
                                                                    "linktype": "url",
                                                                    "styles": {
                                                                        "color": "#ffffff",
                                                                        "padding": "5px",
                                                                        "textDecoration": "none",
                                                                        "fontFamily": "Poppins",
                                                                        "fontSize": "1em",
                                                                        "fontWeight": 500,
                                                                        "textAlign": "left",
                                                                        "textTransform": "uppercase",
                                                                        "letterSpacing": "1px",
                                                                        "lineHeight": "1.2em"
                                                                    },
                                                                    "elemType": "a",
                                                                    "elemEditable": false,
                                                                    "enableDropping": false,
                                                                    "elements": []
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "previmg": "/assets/images/elements/layouts/1col.jpg",
            "elid": "layout_12_col",
            "desc": "1 Column Layout [12]",
            "classList": "wd-row",
            "elementType": "Row Layout",
            "attributes": {},
            "elemType": "div",
            "styles": {
                "maxWidth": "calc(100% - 0px)",
                "margin": "0px 0px",
                "padding": "5px",
                "backgroundImage": "url(\"https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940\")",
                "backgroundSize": "cover",
                "backgroundPosition": "left 8%",
                "backgroundRepeat": "repeat",
                "backgroundAttachment": "fixed",
                "paddingTop": "120px",
                "paddingLeft": "0px",
                "paddingBottom": "50px",
                "paddingRight": "0px"
            },
            "enableDropping": false,
            "elemEditable": false,
            "elements": [
                {
                    "classList": [
                        "wd wd-12"
                    ],
                    "elemType": "div",
                    "styles": {
                        "padding": "5px",
                        "minHeight": "426.4091491699219px"
                    },
                    "elemEditable": false,
                    "enableDropping": true,
                    "elementType": "Column",
                    "elements": [
                        {
                            "previmg": "/assets/images/elements/layouts/2col.jpg",
                            "elid": "layout_6_6_col",
                            "desc": "2 Column Layout [6,6]",
                            "elementType": "Row Layout",
                            "classList": "wd-row",
                            "elemType": "div",
                            "styles": {
                                "maxWidth": "1100px",
                                "margin": "0 auto",
                                "padding": "5px"
                            },
                            "elemEditable": false,
                            "attributes": {},
                            "enableDropping": false,
                            "elements": [
                                {
                                    "classList": [
                                        "wd wd-6"
                                    ],
                                    "elemType": "div",
                                    "styles": {
                                        "padding": "5px"
                                    },
                                    "elemEditable": false,
                                    "enableDropping": true,
                                    "elementType": "Column",
                                    "elements": []
                                },
                                {
                                    "classList": [
                                        "wd wd-6"
                                    ],
                                    "elemType": "div",
                                    "styles": {
                                        "padding": "5px",
                                        "minHeight": "482.426513671875px"
                                    },
                                    "elemEditable": false,
                                    "enableDropping": true,
                                    "elementType": "Column",
                                    "elements": [
                                        {
                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                            "elid": "headers",
                                            "inHTML": "Header element",
                                            "desc": "headers",
                                            "attributes": {},
                                            "elementType": "Headings",
                                            "classList": "",
                                            "styles": {
                                                "color": "#ffffff",
                                                "fontSize": "4.1em",
                                                "fontWeight": 500,
                                                "textAlign": "center",
                                                "textTransform": "uppercase",
                                                "letterSpacing": "6.8px",
                                                "lineHeight": "1.6em",
                                                "borderTop": "2px none #000000",
                                                "borderLeft": "2px none #000000",
                                                "borderRight": "2px none #000000",
                                                "borderBottom": "2px solid #ffffff"
                                            },
                                            "elemType": "h1",
                                            "elemEditable": true,
                                            "enableDropping": false,
                                            "elements": []
                                        },
                                        {
                                            "previmg": "/assets/images/elements/layouts/2col.png",
                                            "elid": "paragraph",
                                            "inHTML": "Explore%20the%20unseen",
                                            "desc": "Paragraph",
                                            "elementType": "paragraph",
                                            "classList": "",
                                            "attributes": {},
                                            "elemType": "p",
                                            "styles": {
                                                "color": "#ffffff",
                                                "fontFamily": "Poppins",
                                                "fontSize": "0.9em",
                                                "fontWeight": 500,
                                                "textAlign": "center",
                                                "textTransform": "uppercase",
                                                "letterSpacing": "6.9px",
                                                "lineHeight": "1.4em"
                                            },
                                            "elemEditable": true,
                                            "enableDropping": false,
                                            "elements": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
    }

    // const navigate = useNavigate();

    const UserDetailsState = useContext(userDetailsContext);


    const dropPosition = useRef(0)
    const nodeLevel = useRef(null)

    const activeElemLayer = useRef(null);

    const [design, setDesign] = useState(InitialDeisgnState);
    const [actElLayer, setELLayer] = useState("0,");
    const [webDesignState, setWebDesignState] = useState({});

    // const user = useUser();
    const [token,] = useToken();

    // const { id } = user;


    const saveWebPage = async (status, ImgUri, type) => {
        if (status === 200 && design.elements.length > 0) {
            setWebDesignState({ ...webDesignState, prevImgUri: ImgUri });
            //update the website setting
            await axios.post('/api/save-webprev/', {
                id: UserDetailsState.user._id,
                websiteId: UserDetailsState.editorState.websiteId,
                imageUri: "" + ImgUri
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
        }

        //go for regular saving of page
        console.log(UserDetailsState);
        try {
            let __design_data = { ...design };
            if (type === "publish") {
                __design_data.published = !design.published;
                setDesign({ ...design, published: !design.published })
            }
            delete __design_data['_id'];
            __design_data.settigMode = -1;
            console.log(__design_data)

            await axios.post('/api/save-webpage/', {
                id: UserDetailsState.user._id,
                pageId: UserDetailsState.editorState.pageId,
                pageJso: __design_data
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                // console.log('got data', response);
                alert("Saved.")

            }).catch(err => {
                alert("Can not save the webpage")
            })

        } catch (e) {
            console.log(e);
            alert("Unable to save the webpage try again!");
        }
    }

    const removeWebPage = async () => {
        try {

            await axios.post('/api/remove-webpage/', {
                id: UserDetailsState.user._id,
                pageId: UserDetailsState.editorState.pageId,
                webId: UserDetailsState.editorState.websiteId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                // console.log('got data', response);
                alert("Deleted.")
                console.log(response);
                UserDetailsState.setEditorState({ ...UserDetailsState.editorState, pageId: response.data.pageId });
                // navigate(`/designer/${UserDetailsState.editorState.websiteId}/${response.data.pageID}/`)

            }).catch(err => {
                alert("Can not delete the webpage")
            })

        } catch (e) {
            console.log(e);
            alert("Unable to delete the webpage try again!");
        }
    }

    const getWebPageImageAndSavePage = async (type = "save") => {

        try {
            let sizes = document.querySelector('[data-prevpanel]').getBoundingClientRect();

            await htmlToImage.toJpeg(document.querySelector('[data-prevpanel]'), { quality: 0.95, width: sizes.width, height: (205 / 280) * sizes.width, canvasWidth: 280, canvasHeight: 205, backgroundColor: '#ffffff' })
                .then(function (dataUrl) {
                    //console.log(dataUrl);
                    saveWebPage(200, dataUrl, type)
                }).catch(err => {
                    saveWebPage(500, "")
                })
        } catch (e) {
            console.log(e);
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
    //     console.log(design, 'from state update');
    // }, [design])

    return (
        <pageDesignContext.Provider value={{ design, setDesign, dropPosition, publishWebPage, nodeLevel, activeElemLayer, actElLayer, setELLayer, webDesignState, setWebDesignState, getWebPageImageAndSavePage, removeWebPage }}>
            {props.children}
        </pageDesignContext.Provider>
    )
}


export default PageDesignState;
