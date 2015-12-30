/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * AppsActions
 */

"use strict";

import axios from 'axios';

import PHRDispacher from '../dispatcher/PHRDispatcher';
import DashboardConstants from '../constants/DashboardConstants';
import SessionConstants from '../constants/SessionConstants';

class AppsActions {
    constructor() {}

    /**
     * Get Session
     */
    static getSession() {
        console.log('getSession');
        let token, user;
        if(typeof(Storage) !== "undefined") {
            token = localStorage.getItem('token') || '';
            user = JSON.parse(localStorage.getItem('user')) || {};
        } else {
            console.log('No Web Storage support..');
        }
        if(user.hasOwnProperty('username')) {
            axios.get('/user/' + user.username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                console.log('/user/{username} res: ', res.data);
                PHRDispacher.dispatch({
                    actionType: SessionConstants.NEW_SESSION,
                    user: res.data.user
                });
            }).catch(err => {
                console.error(err);
                PHRDispacher.dispatch({
                    actionType: SessionConstants.INVALID_SESSION,
                    error: err
                });
            });
        } else {
            PHRDispacher.dispatch({
                actionType: SessionConstants.INVALID_SESSION,
                error: {
                    type: 'not_found',
                    error: new Error('Username is not available in localStorage.'),
                    message: 'Username is not available in localStorage.'
                }
            });
        }
    }
}

export default AppsActions;
