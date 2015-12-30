/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * BaseActions
 */

"use strict";

import axios from 'axios';

import Dispacher from './Dispatcher';

class BaseActions {
    constructor() {}

    static getSession() {
        let token, user;
        if(typeof(Storage) !== "undefined") {
            token = localStorage.getItem('token') || '';
            user = JSON.parse(localStorage.getItem('user')) || {};
        } else {
            console.log('No Web Storage support..');
        }

        return {
            token,
            user
        };
    }

    static getHeaders() {
        let token;
        if(typeof(Storage) !== "undefined") {
            token = localStorage.token || '';
        } else {
            console.log('No Web Storage support..');
        }

        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
    }

    static getUser() {
        let user;
        if(typeof(Storage) !== "undefined") {
            user = JSON.parse(localStorage.getItem('user')) || {};
        } else {
            console.log('No Web Storage support..');
        }

        return user;
    }
}

export default BaseActions;
