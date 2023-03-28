import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ERROR } from '../../actions/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import Wrapper from './index.css.js';


function ResetPassword() {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { token } = useParams();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorElement = useRef(null);

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    });

    useEffect(() => {
        errorElement.current.textContent = '';
    }, [password]);

    const validatePassword = () => {
        if (!password.trim().length) {
            errorElement.current.textContent = 'PASSWORD IS NOT VALID';
            return false;
        }
        else {
            if (password !== passwordConfirmation) {
                errorElement.current.textContent = 'PASSWORD CONFIRMATION FIELD DOES NOT MATCH TO NEW PASSWORD';
                return false;
            }

            return true;
        }
    }

    const updatePassword = async () => {
        if (validatePassword()) {
            try {
                const response = await axios.post(process.env.REACT_APP_API_SERVER_END_POINT + '/reset-password', {
                    resetToken: token,
                    newPassword: password
                });

                if (response.data.status) {
                    console.log(response.data.message);

                    Swal.fire({
                        icon: 'success',
                        title: 'Password updated successfuly',
                        allowOutsideClick: false,
                        showConfirmButton: true,
                        showCancelButton: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/login');
                        }
                    });
                }
                else {
                    // password update failed in server due to incorrect inputs
                    errorElement.current.textContent = response.data.message.toUpperCase();
                    throw (response.data.message);
                }
            }
            catch (err) {
                console.log('error occurred during updating password. error:\n' + err || '');
                dispatch({ type: ERROR, payload: err || 'error occurred during updating password' });
                if (!errorElement.current.textContent) {
                    errorElement.current.textContent = 'UNEXPECTED ERROR';
                }
            }
        }
    }

    return (
        <Wrapper>
            <div className="wrapper">
                <div id="formContent">
                    <h1>Enter new password</h1>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="Enter password again" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                        <input type="button" id="updatePasswordBtn" value="Update Password" onClick={updatePassword}></input>

                        <div ref={errorElement} className="errorMessage"></div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default ResetPassword;
