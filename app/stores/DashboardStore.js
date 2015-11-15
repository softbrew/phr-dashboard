/**
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* DashboardStore
 */

"use strict";

import PHRDispacher from '../dispatcher/PHRDispacher';
import EventEmitter from 'events';
import DashboardConstants from '../constants/DashboardConstants';


let _dashboard = {};

class DashboardStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'change';
        this.store = {};
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

// Register callback to handle dashboard updates
PHRDispacher.register(action => {
    switch (action.actionType) {
        case DashboardConstants.DASHBOARD_CREATE:
            DashboardStore.emitChange();
            break;
        default:
            console.error(new Error('No operation found.'));
    }
});

export default DashboardStore;
