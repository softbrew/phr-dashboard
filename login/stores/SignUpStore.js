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

class SignUpStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'change';
        this.FAIL_EVENT = 'fail';
        this.patient = null;
        this.isImported = false;
        this.token = null;
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
    _setError(type, error) {
        this.error = {
            type,
            error
        };
    }

    // Public Methods
    getAll() {
        return {
            patient : this.patient,
            isPatientImported : this.isImported,
            token: this.token
        };
    }
    isPatientImported() {
        return this.isImported;
    }
    getToken() {
        return this.token;
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
        // return this.listeners(this.CHANGE_EVENT);
    }
    addFailListener(callback) {
        this.on(this.FAIL_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
        // return this.listeners(this.CHANGE_EVENT);
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
            signUpStore.emitChange();
            break;
        case SignUpConstants.SIGNUP_FAIL:
            console.log('SIGNUP_FAIL :', action.error);
            signUpStore._setError(action.actionType, action.error);
            signUpStore.emitFail();
            break;
        default:
            console.error(new Error('No operation found.'));
            break;
    }
});

export default signUpStore;
