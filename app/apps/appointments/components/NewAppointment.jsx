/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal NewAppointment React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Actions
import AppointmentsActions from '../actions/AppointmentsActions';

class NewAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            previousAppointment: ''
        };
    }

    render() {
        return(
            <div>New Appointment</div>
        );
    }

    _onNewAppointment(e) {
        console.log('NewAppointment _onNewAppointment');
        e.preventDefault();

    }
}

NewAppointment.PropTypes = {
    appointment: PropTypes.object.isRequired
};

export default NewAppointment;
