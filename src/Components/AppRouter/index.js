import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import Error from '../Error';
import ResetPassword from '../ResetPassword';
import AppBar from '../AppBar';
import PersonalInfo from '../PersonalInfo';


function AppRouter() {
    return (
        <Router>
            <AppBar />
            <Routes>
                <Route exact path='/login' element={<Login />}></Route>
                <Route exact path='/register' element={<Register />}></Route>
                <Route exact path='/personalinfo' element={<PersonalInfo />}></Route>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/reset-password/:token' element={<ResetPassword />}></Route>
                <Route path='*' element={<Error />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter
