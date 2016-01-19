/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * MedicalRecord React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Stores
import MedicalRecordStore from '../stores/MedicalRecordStore';
// import Components
// import Actions
import MedicalRecordActions from '../actions/MedicalRecordActions';

class MedicalRecord extends React.Component {
    constructor() {
        super();
        this.state = {
            medicalRecords: MedicalRecordStore.getMedicalRecord()
        };
    }

    componentDidMount() {
        MedicalRecordStore.addChangeListener(this._onChange.bind(this));
        // MedicalRecordActions.getMedicalRecord();
    }
    componentWillUnmount() {
        MedicalRecordStore.removeChangeListener(this._onChange.bind(this));
    }

    render () {
        return (
            <div>
                Medical Record
            </div>
        );
    }

    _onChange() {
        console.log('MedicalRecord _onChange : ', MedicalRecordStore.getMedicalRecord());
        this.setState({
            appointments: MedicalRecordStore.getMedicalRecord()
        });
    }
}

MedicalRecord.propTypes = {
};

export default MedicalRecord;
