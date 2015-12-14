/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * SignUpActions
 */

"use strict";

import axios from 'axios';

import LoginDispatcher from '../dispatcher/LoginDispatcher';
import SignUpConstants from '../constants/SignUpConstants';
import history from '../config/history';

class SignUpActions {
    constructor() {    }

    /**
     * Create dashboard
     * @param  {object} bio FHIR Patient object
     * @return {null}     Nothing
     */
    static importPatient(baseURL, patientId) {
        baseURL = "http://fhirtest.uhn.ca/baseDstu2";
        patientId = 843791;
        console.log('ImportPatient: ', baseURL, patientId);
        var instance = axios.create({
            baseURL: 'http://localhost:8000',
            timeout: 1000,
            headers: {'Content-Type': 'application/json'}
        });
        axios.post('/user/import/patient', {
            baseURL: baseURL,
            patientId: patientId
        }).then(res => {
            console.log('patient: ', res.data);
            LoginDispatcher.dispatch({
                actionType: SignUpConstants.SIGNUP_IMPORT,
                patient: res.data
            });
        }).catch(err => {
            console.error(err);
            LoginDispatcher.dispatch({
                actionType: SignUpConstants.SIGNUP_IMPORT_FAIL,
                error: err.data
            });
        });
    }
}

export default SignUpActions;
