import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE, ERROR } from '../../actions/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import Wrapper from './index.css.js';


function PersonalInfo() {
    const auth = useSelector(state => state.auth);
    const [name, setName] = useState(auth.user.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isLogged) {
            navigate('/login');
        }
    });

    const validateName = () => {
        if (!(name.trim().length)) {
            Swal.fire({
                icon: 'error',
                title: 'Name can not be empty',
                allowOutsideClick: false
            });

            return false;
        }

        if (name === auth.user.name) {
            return false;
        }

        return true;
    }

    const resetPassword = async () => {
        Swal.fire({
            title: 'Email with reset password link will be sent upon confirmation. Are you sure?',
            allowOutsideClick: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'CONFIRM',
            cancelButtonText: 'CANCEL'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(process.env.REACT_APP_API_SERVER_END_POINT + '/forgot-password', {
                        mail: auth.user.mail
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
                        throw Error(response.data.message);
                    }
                }
                catch (err) {
                    dispatch({ type: ERROR, payload: err || 'error occured in server during updating info' });
                    Swal.fire({
                        icon: 'error',
                        title: err || 'Error occurred in server',
                        allowOutsideClick: false
                    });
                }
            }
        });
    }

    const updateInfo = async () => {
        if (validateName()) {
            Swal.fire({
                title: 'Are you sure?',
                allowOutsideClick: false,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'CONFIRM',
                cancelButtonText: 'CANCEL'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post(process.env.REACT_APP_API_SERVER_END_POINT + '/api/user',
                            { user: { ...auth.user, name: name } },
                            { withCredentials: true });

                        if (response.data.status) {
                            dispatch({ type: UPDATE, payload: response.data.user });
                            Swal.fire({
                                icon: 'success',
                                title: 'Changes were updated successfully',
                                allowOutsideClick: false
                            });
                        }
                        else {
                            throw Error(response.data.message);
                        }
                    }
                    catch (err) {
                        dispatch({ type: ERROR, payload: err || 'error occured in server during updating info' });
                        Swal.fire({
                            icon: 'error',
                            title: err || 'Error occurred in server',
                            allowOutsideClick: false
                        });
                    }
                }
            });


        }
    }

    return (
        <Wrapper>
            <div className='wrapper'>
                <h2 style={{ marginBottom: '45px' }}>Account Information</h2>
                <div className='row'>
                    <div className='infoItem'>
                        <label for='name'>name: </label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className='infoItem'>
                        <label for='mail'>mail: </label>
                        <input type="text" name="mail" id="mail" value={auth.user.mail} disabled />
                    </div>
                </div>
                <div style={{ marginTop: '10%' }}>
                    <input type='button' name='resetPasswordBtn' id='resetPasswordBtn' value='reset password' onClick={resetPassword} style={{ width: '150px' }} />
                    <input type='button' name='saveBtn' id='saveBtn' value='save' style={{ width: '150px' }} onClick={updateInfo} />
                </div>
            </div>
        </Wrapper>
    )
}


export default PersonalInfo
