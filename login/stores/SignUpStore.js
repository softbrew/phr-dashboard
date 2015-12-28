/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * SignUpStore
 */

"use strict";

import PHRDispacher from '../dispatcher/LoginDispatcher';
import EventEmitter from 'events';
import SignUpConstants from '../constants/SignUpConstants';
import SignInConstants from '../constants/SignInConstants';

class SignUpStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'change';
        this.FAIL_EVENT = 'fail';
        this.patient = null;
        this.isImported = false;
        this.token = null;
        this.error = null;
    }

    // Private Methods (NOTE: Components should not update store's data)
    _setPatient(patient) {
        this.patient = patient;
        this.isImported = true;
    }
    _setToken(token) {
        this.token = token;
        if(typeof(Storage) !== "undefined") {
            window.localStorage.setItem('token', token);
        } else {
            console.log('No Web Storage support..');
        }
    }
    _setUser(user) {
        this.user = user;
        if(typeof(Storage) !== "undefined") {
            window.localStorage.setItem('user', JSON.stringify(user));
        } else {
            console.log('No Web Storage support..');
        }
    }
    _setError(type, error) {
        this.error = {
            type,
            error
        };
    }

    // Public Methods
    isPatientImported() {
        return this.isImported;
    }
    getAll() {
        return {
            patient : this.patient,
            isPatientImported : this.isImported,
            token: this.token
        };
    }
    getToken() {
        return this.token;
    }
    getUser() {
        return this.user;
    }
    getPatient() {
        return this.patient;
    }
    getError() {
        let error = {
            type: this.error.type,
            error: this.error.error
        };
        this.error = null;
        return error;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }
    emitFail() {
        this.emit(this.FAIL_EVENT);
    }

    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }
    addFailListener(callback) {
        this.on(this.FAIL_EVENT, callback);
    }

    removeChangeListener(callback) {
        // NOTE: this.removeListener(event); isn't working properly
        this.removeAllListeners(this.CHANGE_EVENT);
    }
    removeFailListener(callback) {
        this.removeListener(this.FAIL_EVENT, callback);
    }
}

let signUpStore = new SignUpStore();

// Register callback to handle dashboard updates
PHRDispacher.register(action => {
    switch (action.actionType) {
        case SignUpConstants.SIGNUP_IMPORT:
            console.log('SIGNUP_IMPORT :', action.patient);
            signUpStore._setPatient(action.patient);
            signUpStore.emitChange();
            break;
        case SignUpConstants.SIGNUP_IMPORT_FAIL:
            console.log('SIGNUP_IMPORT_FAIL :', action.error);
            signUpStore._setError(action.actionType, action.error);
            signUpStore.emitFail();
            break;
        case SignUpConstants.SIGNUP_SUCCESS:
            console.log('SIGNUP_SUCCESS :', action.token);
            signUpStore._setToken(action.token);
            signUpStore._setUser(action.user);
            signUpStore.emitChange();
            break;
        case SignUpConstants.SIGNUP_FAIL:
            console.log('SIGNUP_FAIL :', action.error);
            signUpStore._setError(action.actionType, action.error);
            signUpStore.emitFail();
            break;
        case SignInConstants.SIGNIN_SUCCESS:
            console.log('SIGNIN_SUCCESS :', action.token);
            signUpStore._setToken(action.token);
            signUpStore._setUser(action.user);
            signUpStore.emitChange();
            break;
        case SignInConstants.SIGNIN_FAIL:
            console.log('SIGNIN_FAIL :', action.error);
            signUpStore._setError(action.actionType, action.error);
            signUpStore.emitFail();
            break;
        default:
            console.error(new Error('No operation found.'));
            break;
    }
});

export default signUpStore;
