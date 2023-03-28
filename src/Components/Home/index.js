import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        // HERE WE CHECK AUTH STATE AND REDIRECT IN CASE WE ARE NOT LOGGED IN
        if (!auth.isLogged) {
            navigate('/login');
        }
    });

    if (auth.user) {
        return (
            <>
                <section style={{ margin: '8px' }}>
                    <h1>Hi {auth.user.name}</h1>
                    <h2> This is home page</h2>
                </section>
            </>
        )
    }
    else {
        return (<></>)
    }
}

export default Home
