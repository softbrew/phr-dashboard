/**
 * Copyright (c) 2015, Softbrew Inc.
 * All rights reserved.
 *
 * JournalActions
 */

"use strict";

import axios from 'axios';
import url from 'url';
import BaseActions from '../../util/BaseActions';

import Dispacher from '../../util/Dispatcher';
import AppointmentsConstants from '../constants/AppointmentsConstants';

class AppointmentsActions extends BaseActions {
    constructor() {
        super();
    }

    static newAppointment(appointment) {
        console.log('AppointmentsActions newAppointment : ', appointment);
        axios.post(`/apps/${AppointmentsConstants.APP_ID}/${this.getUser().username}`, appointment, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps newAppointment : ', res);
            Dispacher.dispatch({
                actionType: AppointmentsConstants.NEW_APPOINTMENT,
                appointment: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }

    static getAppointments() {
        console.log('JournalActions getAppointments');
        axios.get(`/apps/${AppointmentsConstants.APP_ID}/${this.getUser().username}`, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps getAppointments : ', res);
            Dispacher.dispatch({
                actionType: AppointmentsConstants.UPDATE_APPOINTMENTS,
                appointments: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }

    static editAppointment(appointment) {
        console.log('JournalActions editAppointment : ', appointment);
        appointment.createdAt = Date.now();
        axios.put(`/apps/${AppointmentsConstants.APP_ID}/${this.getUser().username}`, appointment, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps editAppointment : ', res);
            Dispacher.dispatch({
                actionType: AppointmentsConstants.EDIT_APPOINTMENT,
                appointment: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }

    static deleteAppointment(appointment) {
        console.log('JournalActions deleteAppointment : ', appointment);
        let deleteURL = url.format({
            pathname: `/apps/${AppointmentsConstants.APP_ID}/${this.getUser().username}`,
            query: {
                id: appointment._id,
                rev: appointment._rev
            }
        });
        console.log(deleteURL);
        axios.delete(deleteURL, {
            headers: this.getHeaders()
        }).then(res => {
            console.log('/apps deleteAppointment : ', res);
            Dispacher.dispatch({
                actionType: AppointmentsConstants.DELETE_APPOINTMENT,
                appointment: res.data
            });
        }).catch(err => {
            console.error(err);

        });
    }
}

export default AppointmentsActions;
