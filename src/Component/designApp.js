import { useEffect, useContext, useRef, useState } from 'react';
// import { pageDesignContext, userDetailsContext } from '../Context/contexts';
import AppStyles from './designApp.module.css';
import Navbar from './Navbar/navbar';
import Sidecolumn from './Sidecolumn/sidecolumn';
import PreviewPanel from './PreviewPanel/previewPanel';
import SettingPanel from './SettingPanel/settingPanel';

import { userDetailsContext } from '../Context/contexts';
import { pageDesignContext } from '../Context/contexts';

import { useUser } from './auth/useUser';
import { useToken } from './auth/useToken'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

function DesignApp() {

    const __webpageParams = useParams();

    const LocsParam = useLocation();


    const navigate = useNavigate();

    let pageDesignState = useContext(pageDesignContext);
    let UserDetailsState = useContext(userDetailsContext);

    const resizer = useRef({ currentWidth: "300px", isDragStarted: false });

    const [sideWid, setSideWid] = useState({ width: "300px" })
    const [prevWid, prevContWid] = useState({ width: "240px" });

    const updateSettingsWidth = (e) => {
        // resizePanel.current.style.width = e.pageX + "px";
        if (e.pageX > 239 && e.pageX < (window.innerWidth * 0.6)) {
            setSideWid({ width: e.pageX + "px" });
            prevContWid({ width: (e.pageX - 60) + "px" });
        }

        //update the position of element if visib;e
        //check if any element is active at the moment
        if (document.querySelectorAll(".temp_infocus").length > 0) {
            let dockl = document.querySelector("[data-operation]");
            if (dockl) {
                let parentPosition = document.querySelector("[data-panelmain]").getBoundingClientRect();
                let dockSize = document.querySelector(".temp_infocus").getBoundingClientRect();
                dockl.style.left = (dockSize.x - parentPosition.x - 26) + "px";
                dockl.style.top = (dockSize.y - parentPosition.y) + "px";
            }
        }
    }



    const user = useUser();
    const [token,] = useToken();

    const { id } = user;

    useEffect(() => {
        UserDetailsState.setEditorState({ ...UserDetailsState.editorState, ...__webpageParams });
    }, [])

    useEffect(() => {
        if (UserDetailsState.editorState.pageId !== __webpageParams.pageId || UserDetailsState.editorState.websiteId !== __webpageParams.websiteId) {
            UserDetailsState.setEditorState({ ...UserDetailsState.editorState, ...__webpageParams });
        }
    }, [__webpageParams])

    useEffect(() => {
        if (UserDetailsState.editorState.websiteId && UserDetailsState.editorState.pageId) setPageState(UserDetailsState.editorState.pageId, UserDetailsState.editorState.websiteId);
    }, [UserDetailsState.editorState.websiteId, UserDetailsState.editorState.pageId])

    const setPageState = async (pid, wid) => {
        let _pid = pid;
        let _wid = wid;
        try {
            // 
            await axios.post('/api/getWebPage/', {
                id,
                pageId: _pid,
                websiteId: _wid
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                // 
                if (response.data.result) {
                    pageDesignState.setDesign(response.data.result)
                    pageDesignState.setWebDesignState(response.data.webResult)

                } else {
                    navigate("/my-websites")
                }


            }).catch(err => {
                navigate("/my-websites")
            })

        } catch (err) {

            // navigate("/my-websites")
        }

    }



    return (
        <div className={AppStyles["app"]}>
            <div className={AppStyles["NavBar"]}>
                <Navbar />
            </div>
            <div className={AppStyles["container"]}>
                <aside style={sideWid} className={AppStyles["options_menu"]} >
                    <div className={AppStyles["options_menu_main"]}><Sidecolumn prevWid={prevWid} key={"sideCol"} /></div>
                    <div draggable ref={resizer} onDragStart={() => resizer.current.isDragStarted = true} onDrag={updateSettingsWidth} onDragEnd={() => resizer.current.isDragStarted = false} className={AppStyles["options_resizer"]}><i className="las la-grip-lines-vertical"></i></div>
                </aside>
                <main className={AppStyles["preview_panel"]}>
                    <PreviewPanel />
                </main>
                <SettingPanel />
            </div>
        </div>
    );
}

export default DesignApp;
