import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AppRouter from '../AppRouter';
import { useDispatch } from 'react-redux';
import { LOGGED_IN, LOGGED_OUT, LOGIN_FAILURE } from '../../actions/auth';
import Loading from '../Loading';

function App() {
    const extraLoadingTime = 500;
    const [fetchingData, setFetchingData] = useState(true);
    const dispatch = useDispatch();
    const fetchUserData = useCallback(
        async () => {
            // HERE WE TRY TO FETCH USER DATA WHEN APP IS STARTED.
            // IF USER IS ALREADY LOGGED IN - DATA WILL RETURN AND WE UPDATE STATE ACCORDINGLY.
            // OTHERWISE - STATE STARTS AS LOGGED OUT AND WE WILL BE REDIRECTED TO LOGIN PAGE.
            try {
                const response = await axios.get(process.env.REACT_APP_API_SERVER_END_POINT + '/api/user', { withCredentials: true });

                if (response.status === 200) {
                    dispatch({ type: LOGGED_IN, payload: response.data });
                }
                else {
                    dispatch({ type: LOGGED_OUT });
                }
            }
            catch (error) {
                console.log('error occurred during fetching user data. error:\n' + error);
                dispatch({ type: LOGIN_FAILURE, payload: error.message || '' });
            }
        }, [dispatch]);

    useEffect(() => {
        fetchUserData();
        setTimeout(() => (setFetchingData((prevState) => { return false })), extraLoadingTime);
    }, [fetchUserData]);

    return (
        <div>
            {fetchingData ? (<Loading />) : (<AppRouter />)}
        </div>
    )
}

export default App
