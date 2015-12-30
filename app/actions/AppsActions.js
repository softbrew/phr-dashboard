/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * AppsActions
 */

"use strict";

import axios from 'axios';

import PHRDispacher from '../dispatcher/PHRDispatcher';
import AppsConstants from '../constants/AppsConstants';

class AppsActions {
    constructor() {}

    /**
     * Get Session
     */
    static changeActiveApp(app) {
        console.log('AppsActions appChange');

        PHRDispacher.dispatch({
            actionType: AppsConstants.CHANGE_ACTIVE_APP,
            app: app
        });
    }
}

export default AppsActions;
