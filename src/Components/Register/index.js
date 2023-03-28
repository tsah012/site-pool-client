import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { REGISTRATION_FAILURE } from '../../actions/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import Wrapper from './index.css.js';


function Register() {
    const appThemeColor = process.env.REACT_APP_THEME_COLOR;
    const [name, setName] = useState('');
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
    }, [name, mail, password]);

    const validateName = () => {
        return name.trim().length;
    }

    const validateEmail = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }

    const validatePassword = () => {
        return password.trim().length;
    }

    const validateFields = () => {
        let all_valid = true;

        if (!validateName()) {
            all_valid = false;
        }

        if (!validateEmail()) {
            all_valid = false;
        }

        if (!validatePassword()) {
            all_valid = false;
        }

        errorElement.current.textContent = all_valid ? '' : 'NAME, EMAIL OR PASSWORD IS NOT VALID';

        return all_valid;
    }

    const performRegister = async () => {
        if (validateFields()) {
            try {
                console.log('Start registration');

                // TODO: fix process.env.API_SERVER_END_POINT 
                const response = await axios.post(process.env.REACT_APP_API_SERVER_END_POINT + '/api/user/add', {
                    name: name,
                    mail: mail,
                    password: password
                });

                if (response.data.status) {
                    console.log('registration success');

                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Completed. Move to Sign in page?',
                        allowOutsideClick: false,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'YES',
                        cancelButtonText: 'I WANT TO STAY'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/login');
                        } else {
                            setName('');
                            setMail('');
                            setPassword('');
                        }
                    })
                }
                else {
                    // Registration failed in server due to incorrect inputs
                    errorElement.current.textContent = response.data.message.toUpperCase();
                    throw (response.data.message);
                }
            }
            catch (err) {
                console.log('error occurred during registration. error:\n' + err || '');
                dispatch({ type: REGISTRATION_FAILURE, payload: err || '' });
                if (!errorElement.current.textContent) {
                    errorElement.current.textContent = 'UNEXPECTED ERROR';
                }
            }
        }
    }

    return (
        <Wrapper style={{ backgroundColor: appThemeColor }}>
            <div className="wrapper">
                <div id="formContent">
                    <h1>CREATE ACCOUNT</h1>
                    <div>
                        <input type="text" name="name" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input type="email" name="mail" id="mail" placeholder="Enter Email" value={mail} onChange={(e) => setMail(e.target.value)}></input>
                        <input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <input type="button" id="registerBtn" value="Register" onClick={performRegister} style={{ backgroundColor: appThemeColor }}></input>

                        <div ref={errorElement} className="errorMessage"></div>
                        <div className="formFooter">
                            <div>
                                <Link to='/login'>
                                    <span className="underlineHover footer"> Sign In </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Register
