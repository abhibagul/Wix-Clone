import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useToken } from '../useToken';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { pageDesignContext } from '../../../Context/contexts';
export default function LoginPage() {

    const navigate = useNavigate();
    const pageDesignState = useContext(pageDesignContext);

    const [token, setToken] = useToken();

    const [LoginDet, setLoginDet] = useState({
        email: "",
        password: "",
        err: []
    })

    useEffect(() => {
        if (token) {
            navigate('/my-websites');
        }
    }, [])

    const onLoginClicked = async (e) => {
        e.preventDefault();

        let _errs = [];

        await axios.post('/api/login', {
            email: LoginDet.email,
            password: LoginDet.password
        }).then(response => {

            const { token } = response.data;
            setToken(token);
            pageDesignState.setTokenTracker(token);
            navigate('/designer');

        }).catch(error => {
            console.error(error);
            if (error.response.status == 401) _errs.push("Unauthorized");
            else _errs.push("Something went wrong. Try again.")
        })


        setLoginDet({ ...LoginDet, err: _errs })

    }

    return (
        <div className='create_account_page'>
            <form onSubmit={onLoginClicked} method="post">
                <div className="create_account_container">
                    <h1>Login</h1>
                    <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>

                    {(LoginDet.err.length > 0) && <div className='errorsPanel'>
                        <ul>
                            {
                                LoginDet.err.map((e) => {
                                    return <li key={e}>{e}</li>
                                })
                            }
                        </ul>
                    </div>}

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" onChange={(e) => setLoginDet({ ...LoginDet, email: e.target.value })} value={LoginDet.email} placeholder="Enter Email" name="email" required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" autoComplete="on" onChange={(e) => setLoginDet({ ...LoginDet, password: e.target.value })} value={LoginDet.password} placeholder="Enter Password" name="psw" required />

                    <div className="clearfix">
                        <button type="submit" className="signupbtn">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
