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
        this.patient = null;
        this.isImport = false;
    }

    // Private Methods (NOTE: Components should not update store's data)
    _setPatient(patient) {
        this.patient = patient;
        this.isImport = true;
    }

    // Public Methods
    getAll() {
        return this.patient;
    }

    isPatientImported() {
        return this.isImport;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
        // return this.listeners(this.CHANGE_EVENT);
    }

    removeChangeListener(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
        // return this.listeners(this.CHANGE_EVENT);
    }
}

let signUpStore = new SignUpStore();

// Register callback to handle dashboard updates
PHRDispacher.register(action => {
    switch (action.actionType) {
        case SignUpConstants.SIGNUP_IMPORT:
            signUpStore._setPatient(action.patient);
            signUpStore.emitChange();
            break;
        case SignUpConstants.SIGNUP_IMPORT_FAIL:
            console.log('SIGNUP_IMPORT_FAIL :', action.error);
            break;
        default:
            console.error(new Error('No operation found.'));
    }
});

export default signUpStore;
