/**
 * Login: routes
 */
'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

// import COMPONENTS
import SignIn from '../components/signin/SignIn';
import SignUp from '../components/signup/SignUp';

export default (
    <Route path='/'>
        <IndexRoute component={SignIn}></IndexRoute>
        <Route path='/new' component={SignUp}>
        </Route>
    </Route>
);
