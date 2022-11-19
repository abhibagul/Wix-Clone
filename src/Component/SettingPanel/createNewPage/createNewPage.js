import React, { useState, useContext } from 'react'
import './createNewPage.css'

import axios from 'axios';
import { userDetailsContext } from '../../../Context/contexts';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../auth/useToken';
import { useEffect } from 'react';
import { pageDesignContext } from '../../../Context/contexts';

export default function CreateNewPage(props) {

    let UserDetailsState = useContext(userDetailsContext);
    let pageDesignState = useContext(pageDesignContext);

    const navigate = useNavigate();

    let [pageName, setPageName] = useState("About")
    let [pageUri, setNewPageUri] = useState("about")

    const [token,] = useToken();



    const createNewPage = async () => {


        //remove special chars from the uri
        let _pageUri = pageUri.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");

        if (pageName.length < 5) {
            alert("Page name has to be at least 5 characters");
            return;
        }

        if (_pageUri.length < 5) {
            alert("Page Uri has to be at least 5 characters")
            return;
        }


        try {
            let _pageUri = pageUri.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
            await axios.put('/api/new-webpage/', {
                id: UserDetailsState.user._id,
                webId: UserDetailsState.editorState.websiteId,
                pageName,
                pageUri: _pageUri
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {

                UserDetailsState.setEditorState({ ...UserDetailsState.editorState, pageId: response.data.pageId })

                navigate(`/designer/${UserDetailsState.editorState.websiteId}/${response.data.pageId}/`, {
                    state: {
                        websiteId: UserDetailsState.editorState.websiteId,
                        pageId: response.data.pageId
                    }
                });



                props.closeWin();

            }).catch(err => {

                alert("Can not create the webpage")
            })

        } catch (e) {

            alert("Something went wrong.")
        }
    }

    return (
        <div className='layoutCreator'>
            <div className="outerLayoutHeader">
                <div className='layoutCreatorHeader'>
                    <div className='layoutCreatorTitle'>
                        Create New Page
                    </div>
                    <div className='layoutCreatorAction'>
                        <button onClick={props.closeWin}><i className="las la-times"></i></button>
                    </div>
                </div>
            </div>
            <div className='googleAnalyticsContent cratenewpage'>

                <div className='googleAnalyticsInner'>
                    <h5>Page Name: </h5>
                    <input type="text" onChange={(e) => setPageName(e.target.value)} value={pageName} placeholder="Page Name" />
                </div>
                <div className='googleAnalyticsInner'>
                    <h5>Page Url: </h5>
                    <div className='url_prev'>
                        <span>yourwebsite.com/</span>
                        <input type="text" onChange={(e) => setNewPageUri(e.target.value)} value={pageUri} placeholder="Url for the webpage" />
                    </div>
                </div>
                <div className='footerStickyFontManager'>

                    <div className='applyFonts'>
                        <button onClick={createNewPage}>Create Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
