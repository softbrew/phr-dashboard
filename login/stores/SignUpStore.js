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
    }

    // Private Methods (NOTE: Components should not update store's data)
    _setPatient(patient) {
        this.patient = patient;
    }

    // Public Methods
    getAll() {
        return this.patient;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
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
        default:
            console.error(new Error('No operation found.'));
    }
});

export default signUpStore;
