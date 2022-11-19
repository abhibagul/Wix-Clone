import React from 'react'
import { useToken } from '../useToken'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pageDesignContext } from '../../../Context/contexts';
import './signupPage.css'
export default function SignupPage() {

    const navigate = useNavigate();
    let pageDesignState = useContext(pageDesignContext)

    const [signupPageDet, setSignupPageDet] = useState({
        email: "",
        password: "",
        confPass: "",
        err: []
    })

    const [token, setToken] = useToken();

    useEffect(() => {
        if (token) {
            navigate('/designer');
        }
    }, [])

    const isValidEmailAddress = (emailAddress) => {
        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    };

    const onSignupClicked = async (e) => {

        e.preventDefault();


        let _errs = [];

        if (signupPageDet.password !== signupPageDet.confPass) {
            _errs.push("Password do not match");
        }

        if (!isValidEmailAddress(signupPageDet.email)) {
            _errs.push("Invalid email address")
        }

        if (signupPageDet.password.length < 8) {
            _errs.push("Password has to be at least 8 charcters");
        }

        if (_errs.length === 0) {
            let username = signupPageDet.email.split("@")[0];
            username = username.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");

            const response = await axios.post('/api/signup', {
                email: signupPageDet.email,
                password: signupPageDet.password,
                username
            }).then(response => {
                const { token } = response.data;
                setToken(token);
                pageDesignState.setTokenTracker(token);
                navigate('/my-websites');
            }).catch(error => {
                console.error(error);
                _errs.push("Something went wrong, Try recreating the account");

            })



        }
        setSignupPageDet({ ...signupPageDet, err: _errs })

    }

    return (
        <div className='create_account_page'>
            <form onSubmit={onSignupClicked}>
                <div className="create_account_container">
                    <h1>Sign Up</h1>
                    <p>Already have account? <Link to={"/login"}>Login</Link></p>

                    {(signupPageDet.err.length > 0) && <div className='errorsPanel'>
                        <ul>
                            {
                                signupPageDet.err.map((e) => {
                                    return <li key={e}>{e}</li>
                                })
                            }
                        </ul>
                    </div>}

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" onChange={(e) => setSignupPageDet({ ...signupPageDet, email: e.target.value })} value={signupPageDet.email} placeholder="Enter Email" name="email" required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e) => setSignupPageDet({ ...signupPageDet, password: e.target.value })} value={signupPageDet.password} placeholder=" Enter Password" name="psw" required />

                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={(e) => setSignupPageDet({ ...signupPageDet, confPass: e.target.value })} value={signupPageDet.confPass} placeholder=" Repeat Password" name="psw-repeat" required />

                    <p>By creating an account you agree to our <a href="#" >Terms & Privacy</a>.</p>

                    <div className="clearfix">
                        <button type="submit" className="signupbtn">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
