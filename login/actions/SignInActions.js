/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * SignInActions
 */

"use strict";

import axios from 'axios';

import LoginDispatcher from '../dispatcher/LoginDispatcher';
import SignInConstants from '../constants/SignInConstants';

class SignInActions {
    constructor() {
    }

    static signIn(data) {
        console.log('SignIn: ', data);
        axios.post('/user/signin', data).then(res => {
            console.log('SignIn res: ', res);
            LoginDispatcher.dispatch({
                actionType: SignInConstants.SIGNIN_SUCCESS,
                token: res.data.token,
                user: res.data.user
            });
        }).catch(err => {
            console.error(err, err.data);
            LoginDispatcher.dispatch({
                actionType: SignInConstants.SIGNIN_FAIL,
                error: err.data
            });
        });
    }
}

export default SignInActions;
