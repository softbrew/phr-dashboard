/**
 * Login: routes
 */
'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

// import COMPONENTS
import Main from '../components/Main';
import SignIn from '../components/signin/SignIn';
import SetUp from '../components/signup/SetUp';
import SignUp from '../components/signup/SignUp';

export default (
    <Route path='/' component={Main}>
        <IndexRoute component={SignIn}></IndexRoute>
        <Route path='/setup' component={SetUp}></Route>
        <Route path='/new' component={SignUp}></Route>
    </Route>
);
