/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * SessionStore
 */

"use strict";

import PHRDispatcher from '../dispatcher/PHRDispatcher';
import EventEmitter from 'events';
import SessionConstants from '../constants/SessionConstants';

class SessionStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'change';
        if(typeof(Storage) !== "undefined") {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.token = localStorage.getItem('token') || '';
        } else {
            console.log('No Web Storage support..');
        }
    }

    _setSession(user, token) {
        if(typeof(Storage) !== "undefined") {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            if(token) {
                this.token = token;
                localStorage.setItem('token', token);
            }
        } else {
            console.log('No Web Storage support..');
        }
    }
    _removeSession() {
        this.user = {};
        this.token = '';

        if(typeof(Storage) !== "undefined") {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } else {
            console.log('No Web Storage support..');
        }
    }

    getAll() {
        return {
            token: this.token,
            user: this.user
        };
    }
    getUser() {
        return this.user;
    }
    getToken() {
        return this.token;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(callback);
    }
}

let sessionStore = new SessionStore();

PHRDispatcher.register(action => {
    switch(action.actionType) {
        case SessionConstants.NEW_SESSION:
            sessionStore._setSession(action.user, action.token);
            sessionStore.emitChange();
            break;
        case SessionConstants.INVALID_SESSION:
            sessionStore._removeSession();
            sessionStore.emitChange();
            break;
    }
    return true;
});

export default sessionStore;
