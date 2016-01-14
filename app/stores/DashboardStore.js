/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * DashboardStore
 */

"use strict";

import PHRDispacher from '../dispatcher/PHRDispatcher';
import EventEmitter from 'events';
import DashboardConstants from '../constants/DashboardConstants';

class DashboardStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'change';
        this.store = {
            id: 0,
            rev: 0,
            username: "username",
            email: "email",
            name: "name",
            address: "address",
            birthDate: "birthDate",
            gender: "gender",
            telecom: "telecom",
            fhirServerList: []
        };
    }

    _setPatient(patient) {
        this.store = patient;
    }

    getAll() {
        return this.store;
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

let dashboardStore = new DashboardStore();

// Register callback to handle dashboard updates
PHRDispacher.register(action => {
    switch(action.actionType) {
        case DashboardConstants.DASHBOARD_GET_PATIENT:
            dashboardStore._setPatient(action.patient);
            dashboardStore.emitChange();
            break;
        case DashboardConstants.USER_UPDATED:
            dashboardStore._setPatient(action.user);
            dashboardStore.emitChange();
            break;
    }
    return true;
});

export default dashboardStore;
