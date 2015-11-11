/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * PHRDispacher
 *
 * A singleton that operates as the central hub for application updates.
 */

"use strict";

import PHRDispacher from '../dispatcher/PHRDispacher';
import DashboardConstants from '../constants/DashboardConstants';

class DashboardActions {
    constructor() {

    }

    /**
     * Create dashboard
     * @param  {object} bio FHIR Patient object
     * @return {null}     Nothing
     */
    create(bio) {
        PHRDispacher.dispatch({
            actionType: DashboardConstants.DASHBOARD_CREATE,
            bio: bio
        });
    }
}
