import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, LOGGED_IN, LOGIN_FAILURE, ERROR } from '../../actions/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import Wrapper from './index.css.js';


function Login() {
    const appThemeColor = process.env.REACT_APP_THEME_COLOR;
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorElement = useRef(null);

    useEffect(() => {
        if (auth.isLogged) {
            navigate('/');
        }
    });

    useEffect(() => {
        errorElement.current.textContent = '';
    }, [mail, password]);

    const validateEmail = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }

    const validatePassword = () => {
        return password.trim().length;
    }

    const validateLoginFields = () => {
        let all_valid = true;

        if (!validateEmail()) {
            all_valid = false;
        }

        if (!validatePassword()) {
            all_valid = false;
        }

        errorElement.current.textContent = all_valid ? '' : 'EMAIL OR PASSWORD IS NOT VALID';

        return all_valid;
    }

    const performLogin = async () => {
        if (validateLoginFields()) {
            try {
                console.log('Start login');
                dispatch({ type: LOGIN });

                // HERE WE CALL LOGIN API AND UPDATE STATE ACCORDING TO RESPONSE.
                const response = await axios.post(process.env.REACT_APP_API_SERVER_END_POINT + '/login', {
                    mail: mail,
                    password: password
                }, { withCredentials: true });

                if (response.data.status) {
                    console.log('login success');
                    const user = await axios.get(process.env.REACT_APP_API_SERVER_END_POINT + '/api/user', { withCredentials: true });
                    dispatch({ type: LOGGED_IN, payload: user.data });
                    navigate('/');
                }
                else {
                    // Login failed in server due to incorrect inputs
                    errorElement.current.textContent = response.data.message.toUpperCase();
                    throw (response.data.message);
                }
            }
            catch (err) {
                console.log('error occurred during login. error:\n' + err || '');
                dispatch({ type: LOGIN_FAILURE, payload: err || '' });
                if (!errorElement.current.textContent) {
                    errorElement.current.textContent = 'UNEXPECTED ERROR';
                }
            }
        }
    }

    const forgotPassword = async () => {
        try {
            const { value: email } = await Swal.fire({
                allowOutsideClick: false,
                showCancelButton: true,
                title: 'Input user email address',
                input: 'email',
                inputPlaceholder: 'Enter email address'
            })

            if (email) {
                const response = await axios.post(process.env.REACT_APP_API_SERVER_END_POINT + '/forgot-password', {
                    mail: email
                });

                if (response.data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Email with password reset link sent',
                        text: 'Please check your mail box including spam',
                        allowOutsideClick: false
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: response.data.message,
                        allowOutsideClick: false
                    });
                }
            }
        }
        catch (err) {
            console.log('error occurred. error:\n' + err || '');
            dispatch({ type: ERROR, payload: err || '' });
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong! Please try again in a few minutes',
                allowOutsideClick: false
            });
        }
    }

    return (
        <Wrapper style={{ backgroundColor: appThemeColor }}>
            <div className="wrapper">
                <div id="formContent">
                    <h1>SIGN IN</h1>
                    <div>
                        <input type="email" name="mail" id="mail" placeholder="Enter Email" value={mail} onChange={(e) => setMail(e.target.value)}></input>
                        <input type="password" name="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <input type="button" id="loginBtn" value="log in" onClick={performLogin} style={{ backgroundColor: appThemeColor }}></input>

                        <div ref={errorElement} className="errorMessage"></div>
                        <div className="formFooter">
                            <div>

                                <Link to='/register'>
                                    <span className="underlineHover footer"> Sign Up </span>
                                </Link>

                            </div>
                            <div className="underlineHover footer" onClick={forgotPassword}>Forgot Password?</div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Login
