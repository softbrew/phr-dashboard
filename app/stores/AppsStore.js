/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * AppsStore
 */

"use strict";

import PHRDispacher from '../dispatcher/PHRDispatcher';
import EventEmitter from 'events';
import AppsConstants from '../constants/AppsConstants';
// Sample app data
import SampleApps from './SampleApps.js';

class AppsStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'change';
        this.apps = SampleApps.AppList;
    }

    getAll() {
        return this.apps;
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

let appsStore = new AppsStore();

// Register callback to handle dashboard updates
PHRDispacher.register(action => {
    switch (action.actionType) {
        case AppsConstants.APPS_SHOW:
            appsStore.emitChange();
            break;
        default:
            console.error(new Error('No operation found.'));
    }
});

export default appsStore;
