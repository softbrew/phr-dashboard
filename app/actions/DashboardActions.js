/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * DashboardActions
 */

"use strict";

import axios from 'axios';
import url from 'url';

import BaseActions from '../apps/util/BaseActions';

import PHRDispacher from '../dispatcher/PHRDispatcher';
import DashboardConstants from '../constants/DashboardConstants';

class DashboardActions extends BaseActions {
    constructor() {
        super();
    }

    static changePassword(passowrd) {
        console.log('DashboardActions changePassword : ', passowrd);
        axios.put(`/user/pwChange/${this.getUser().username}`, passowrd, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/dashboard changePassword : ', res);
            PHRDispacher.dispatch({
                actionType: DashboardConstants.PASSWORD_CHANGED
            });
        }).catch(err => {
            console.error(err);

        });
    }

    static changeFHIRServerList(serverList) {
        console.log('DashboardActions changeFHIRServerList : ', serverList);
        axios.put(`/user/${this.getUser().username}`, { fhirServerList: serverList}, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/dashboard changeFHIRServerList : ', res);
            PHRDispacher.dispatch({
                actionType: DashboardConstants.USER_UPDATED,
                user: res.data.user
            });
        }).catch(err => {
            console.error(err);

        });
    }

}

export default DashboardActions;
