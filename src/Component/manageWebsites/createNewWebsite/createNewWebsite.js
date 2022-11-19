import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import { useNavigate } from 'react-router-dom';
import './newWebsiteModal.css';
import { userDetailsContext } from '../../../Context/contexts';

export default function CreateNewWebsite(props) {

    let navigate = useNavigate();
    const user = useUser();
    const [token,] = useToken();
    let UserDetailsState = useContext(userDetailsContext);

    const { id } = user;

    let [newWebSetting, setNewWebSetting] = useState({
        webName: "My Website"
    })


    const createNewWebsite = async () => {
        try {
            if (newWebSetting.webName.length < 1) {
                alert("Website name can not be blank")
                return;
            }
            let __webName = newWebSetting.webName;

            //remove special chars
            __webName = __webName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");

            await axios.put(`/api/create-website/${id}`, {
                websiteName: __webName,
                pages: []
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {

                UserDetailsState.setEditorState({ ...UserDetailsState.editorState, websiteId: response.data.webId, pageId: response.data.pageId })

                props.closeModal();

                //in future directly take the user to the editor
                navigate(`/designer/${response.data.webId}/${response.data.pageId}/`)

            }).catch(err => {

                alert("Unable to create a website");
            })


        } catch (err) {

        }
    }

    return (
        <div className='createNewWebsiteModal'>
            <div className='modal_container'>

                <div className='modal_title'>
                    <span>Create New Website</span>
                    <button onClick={() => props.closeModal()}><i className="las la-times"></i></button>
                </div>
                <div className='modal_cont'>
                    <div className='moal-inputs'>
                        <h5>Website Name:</h5>
                        <input type="text" onChange={(e) => setNewWebSetting({ ...newWebSetting, webName: e.target.value })} value={newWebSetting.webName} />
                    </div>
                    <div className='createNewWebsiteOptions'>
                        <button onClick={() => createNewWebsite()}> Create new website</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
