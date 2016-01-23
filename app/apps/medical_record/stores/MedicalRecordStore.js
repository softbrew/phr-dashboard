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
        this.observations = [];
    }

    _addMedicalRecord(medicalRecord) {
        this.medicalRecords.push(medicalRecord);
    }
    _setMedicalRecords(medicalRecords) {
        this.medicalRecords = medicalRecords;
    }
    _editMedicalReport(medicalRecord) {
        for(let i in this.medicalRecords) {
            if(medicalRecord._id === this.medicalRecords[i]._id) {
                this.medicalRecords[i] = medicalRecord;
                return this.medicalRecords;
            }
        }
    }
    _deleteMedicalRecord(medicalRecord) {
        for(let i in this.medicalRecords) {
            if(medicalRecord._id === this.medicalRecords[i]._id) {
                this.medicalRecords.splice(i, 1);
                return this.medicalRecords;
            }
        }
    }

    _addObservation(observation) {
        this.observations.push(observation);
    }
    _setObservations(observations) {
        this.observations = observations;
    }
    _editObservation(observation) {
        for(let i in this.observations) {
            if(observation._id === this.observations[i]._id) {
                this.observations[i] = observation;
                return this.observations;
            }
        }
    }
    _deleteObservation(observation) {
        for(let i in this.observations) {
            if(observation._id === this.observations[i]._id) {
                this.observations.splice(i, 1);
                return this.observations;
            }
        }
    }

    getMedicalRecords() {
        return this.medicalRecords;
    }
    getObservations() {
        return this.observations;
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
            medicalRecordsStore._setMedicalRecords(action.medicalRecords);
            medicalRecordsStore.emitChange();
            break;
        case MedicalRecordConstants.ADD_OBSERVATION:
            medicalRecordsStore._addObservation(action.observation);
            medicalRecordsStore.emitChange();
            break;
        default:
            console.log('medicalRecordsStore: no action found.');
    }
    return true;
});

export default medicalRecordsStore;
