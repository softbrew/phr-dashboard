/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * MedicalRecordStore
 */

"use strict";

import Dispatcher from '../../util/Dispatcher';
import EventEmitter from 'events';
import MedicalRecordConstants from '../constants/MedicalRecordConstants';

class MedicalRecordStore extends EventEmitter {
    constructor() {
        super();
        this.CHANGE_EVENT = 'medicalRecords_change';
        this.medicalRecords = [];
    }

    _addAppointment(medicalRecord) {
        this.medicalRecords.push(medicalRecord);
    }
    _setMedicalRecord(medicalRecords) {
        this.medicalRecords = medicalRecords;
    }
    _editAppointment(medicalRecord) {
        for(let i in this.medicalRecords) {
            if(medicalRecord._id === this.medicalRecords[i]._id) {
                this.medicalRecords[i] = medicalRecord;
                return this.medicalRecords;
            }
        }
    }
    _deleteAppointment(medicalRecord) {
        for(let i in this.medicalRecords) {
            if(medicalRecord._id === this.medicalRecords[i]._id) {
                this.medicalRecords.splice(i, 1);
                return this.medicalRecords;
            }
        }
    }

    getMedicalRecord() {
        this.medicalRecords.sort(function(a, b) {
            // subtract to get a value that is either negative, positive, or zero.
            return b.createdAt - a.createdAt;
        });
        return this.medicalRecords;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        // this.removeListener(this.CHANGE_EVENT, callback);
        // HACK to fixed above line is not working
        this.removeAllListeners(this.CHANGE_EVENT);
    }
}

const medicalRecordsStore = new MedicalRecordStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case MedicalRecordConstants.GET_MEDICAL_RECORDS:
            medicalRecordsStore._setMedicalRecord(action.medicalRecords);
            medicalRecordsStore.emitChange();
            break;
        default:
            console.log('medicalRecordsStore: no action found.');
    }
    return true;
});

export default medicalRecordsStore;
