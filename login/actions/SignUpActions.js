/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * SignUpActions
 */

"use strict";

import LoginDispatcher from '../dispatcher/LoginDispatcher';
import SignUpConstants from '../constants/SignUpConstants';

class SignUpActions {
    constructor() {

    }

    /**
     * Create dashboard
     * @param  {object} bio FHIR Patient object
     * @return {null}     Nothing
     */
    static abc(baseURL, patientId) {
        console.log('ImportPatient: ', baseURL, patientId);
        LoginDispatcher.dispatch({
            actionType: SignUpConstants.SIGNUP_IMPORT,
            patient: {}
        });
    }
}

export default SignUpActions;
