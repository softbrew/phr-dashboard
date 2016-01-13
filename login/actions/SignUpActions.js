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

class SignUpActions {
    constructor() {    }

    /**
     * Create dashboard
     * @param  {object} bio FHIR Patient object
     * @return {null}     Nothing
     */
    static importPatient(baseURL, patientId) {
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
            let data = res.data;
            let patient = {
                id: data.id,
                name: {
                    given: data.name[0].given.toString().replace(/,/g,' '),
                    family: data.name[0].family.toString()
                },
                gender: data.gender,
                birthDate: data.birthDate,
                address: {
                    use: data.address[0].use.toUpperCase(),
                    line: data.address[0].line.toString(),
                    city:data.address[0].city,
                    state:data.address[0].state,
                    postalCode:data.address[0].postalCode
                },
                telecom: data.telecom[1].value,
                fhirServerList: [{
                    url: baseURL,
                    patientId: patientId
                }],
                createdAt: Date.now(),
                modifiedAt: Date.now()
            };
            console.log('Patient: ', patient);
            LoginDispatcher.dispatch({
                actionType: SignUpConstants.SIGNUP_IMPORT,
                patient: patient
            });
        }).catch(err => {
            console.error(err);
            LoginDispatcher.dispatch({
                actionType: SignUpConstants.SIGNUP_IMPORT_FAIL,
                error: err.data
            });
        });
    }

    static signUp(data) {
        console.log('SignUp: ', data);
        axios.post('/user/signup', data).then(res => {
            console.log('SignUp res: ', res);
            LoginDispatcher.dispatch({
                actionType: SignUpConstants.SIGNUP_SUCCESS,
                token: res.data.token,
                user: res.data.user
            });
        }).catch(err => {
            console.error(err, err.data);
            LoginDispatcher.dispatch({
                actionType: SignUpConstants.SIGNUP_FAIL,
                error: err.data
            });
        });
    }
}

export default SignUpActions;
