import React, { useContext, useState } from 'react'
import axios from 'axios'
import { userDetailsContext } from '../../Context/contexts'
import CreateNewWebsite from './createNewWebsite/createNewWebsite'
import UserProjects from './userProjects/userProjects'
import { useEffect } from 'react'
import './manageWebsite.css'
import Navbar from '../Navbar/navbar'
export default function ManageWebsites() {

    let [mPr, setMPr] = useState({
        showNewWebsite: false
    });



    let userDets = useContext(userDetailsContext);

    return (
        <>
            <Navbar />
            <div className='manage-web-container' >

                <main className='manager_main'>
                    {(mPr.showNewWebsite) && <CreateNewWebsite closeModal={() => setMPr({ ...mPr, showNewWebsite: false })} />}

                    <div div className='main_webpage' >
                        <div className='welcome-back-msg'>
                            <div className="row-container flex-row-welcome">

                                <div className='welcomeLeft'>
                                    <h1>Welcome back, {userDets.user.user}!</h1>
                                    <p>Select one of your site, you want to edit</p>
                                </div>
                                <button className='newWebsiteBtn' onClick={() => setMPr({ ...mPr, showNewWebsite: true })}>
                                    Create new website
                                </button>
                            </div>
                        </div>
                        <div className='projects_showcase'>
                            <div className="row-container">
                                <div className='light-title-user-project'>My sites</div>
                                <UserProjects createNewWeb={() => setMPr({ ...mPr, showNewWebsite: true })} />
                            </div>
                        </div>
                    </div >
                </main>
            </div >
        </>
    )
}
