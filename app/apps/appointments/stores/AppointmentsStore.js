/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * AppointmentsStore
 */

"use strict";

import Dispatcher from '../../util/Dispatcher';
import EventEmitter from 'events';
import AppointmentsConstants from '../constants/AppointmentsConstants';

class AppointmentsStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'appointments_change';
        this.appointments = [];
    }

    _addAppointment(appointment) {
        this.appointments.push(appointment);
    }
    _setAppointments(appointments) {
        console.log('0000 ', appointments);
        this.appointments = appointments;
    }
    _editAppointment(appointment) {
        for(let i in this.appointments) {
            if(appointment._id === this.appointments[i]._id) {
                this.appointments[i] = appointment;
                return this.appointments;
            }
        }
    }
    _deleteAppointment(appointment) {
        for(let i in this.appointments) {
            if(appointment._id === this.appointments[i]._id) {
                this.appointments.splice(i, 1);
                return this.appointments;
            }
        }
    }

    getAppointments() {
        console.log('fdfdfd', this.appointments);
        this.appointments.sort(function(a, b) {
            // subtract to get a value that is either negative, positive, or zero.
            return b.createdAt - a.createdAt;
        });
        return this.appointments;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        //this.removeListener(this.CHANGE_EVENT, callback);
        // HACK to fixed above line is not working
        this.removeAllListeners(this.CHANGE_EVENT);
    }
}

const appointmentsStore = new AppointmentsStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case AppointmentsConstants.NEW_APPOINTMENT:
            appointmentsStore._addAppointment(action.appointment);
            appointmentsStore.emitChange();
            break;
        case AppointmentsConstants.UPDATE_APPOINTMENTS:
            appointmentsStore._setAppointments(action.appointments);
            appointmentsStore.emitChange();
            break;
        case AppointmentsConstants.EDIT_APPOINTMENT:
            appointmentsStore._editAppointment(action.appointment);
            appointmentsStore.emitChange();
            break;
        case AppointmentsConstants.DELETE_APPOINTMENT:
            appointmentsStore._deleteAppointment(action.appointment);
            appointmentsStore.emitChange();
            break;
        default:
            console.log('appointmentsStore: no action found.');
    }
    return true;
});

export default appointmentsStore;
