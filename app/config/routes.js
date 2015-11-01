import React from 'react';
import Main from '../components/Main';
import Login from '../components/Login';
import Profile from '../components/Profile';
import { Router, IndexRoute, Route, Link } from 'react-router';

export default (
    <Route path="/" component={Main}>
        <Route
            path="profile/:username"
            component={Profile}/>
        <IndexRoute component={Login}/>
    </Route>
);
