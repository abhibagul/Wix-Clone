import React, { useState } from 'react'
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './userProjects.css';

export default function UserProjects(props) {

    // let navigate = useNavigate();
    const user = useUser();
    const [token,] = useToken();

    const { id } = user;

    let [userProj, setUserProj] = useState({
        loadingProj: false,
        currentPage: 1,
        perPage: 10,
        loadFailed: false,
        userProject: []
    })

    useEffect(() => {
        loadUserProject();
    }, []);



    const loadUserProject = async () => {
        setUserProj({ ...userProj, loadingProj: true })

        try {

            await axios.post('/api/my-projects/', {
                id,
                pageNum: userProj.currentPage,
                perPage: userProj.perPage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {

                setUserProj({ ...userProj, loadingProj: false, loadFailed: false, userProject: response.data.result, currentPage: userProj.currentPage + 1 })
            }).catch(err => {

                setUserProj({ ...userProj, loadingProj: false, loadFailed: true })
            })


        } catch (err) {
            console.error(err);
            setUserProj({ ...userProj, loadingProj: false, loadFailed: true })
        }
    }


    return (
        <div>
            <div className="projects_case_container">

                {(userProj.loadingProj) && <div className='loading-wrap'>
                    Loading...
                </div>}
                {
                    (userProj.loadFailed) && <div className="loading-failed">
                        Loading failed try again
                    </div>
                }
                {(userProj.userProject.length > 0) ?
                    <div className="project-showcase">

                        {
                            userProj.userProject.map((e, i) => {
                                return (
                                    <div key={i} className="projectoption">
                                        <Link to={`/designer/${e._id}/${e.pages[0].pageId}/`}>
                                            <div className='projimgshowcase'>
                                                <img src={(e.prevImgUri) ? e.prevImgUri : "/assets/images/elements/html/dummyImage.jpg"} />
                                            </div>
                                            <div className='projectDetails'>
                                                <div className='projTitle'>{e.websiteName}</div>
                                                <div className='projDets'>{e.pages.length} page(s) &nbsp;&nbsp;| <div className='projStatus' >{(e.published) ? "Live" : "Unpublished"}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }

                    </div>
                    :
                    <>
                        <div className='createFirstProject'>
                            <h4>Let's get started with your first website</h4>
                            <button onClick={props.createNewWeb}>Create my first website!</button>
                        </div>
                    </>
                }

            </div>

        </div>
    )
}
