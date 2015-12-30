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
        this.CHANGE_EVENT = 'apps_store_change';
        this.apps = SampleApps.AppList;
        this.activeApp = {};
    }

    _setApps(apps) {
        this.apps = apps;
    }
    _setActiveApp(app) {
        this.activeApp = app;
    }

    getAll() {
        return this.apps;
    }
    getActiveApp() {
        return this.activeApp;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        // TODO: Error in Event Emitter
        this.removeAllListeners(this.CHANGE_EVENT, callback);
    }
}

let appsStore = new AppsStore();

// Register callback to handle dashboard updates
PHRDispacher.register(action => {
    switch (action.actionType) {
        case AppsConstants.APPS_SHOW:
            console.log('AppsStore APPS_SHOW');
            appsStore._setApps(action.apps);
            appsStore.emitChange();
            break;
        case AppsConstants.CHANGE_ACTIVE_APP:
            console.log('AppsStore CHANGE_ACTIVE_APP');
            appsStore._setActiveApp(action.app);
            appsStore.emitChange();
            break;
    }
    return true;
});

export default appsStore;
