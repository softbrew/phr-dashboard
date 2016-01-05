/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Appointments React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Stores
import AppointmentsStore from '../stores/AppointmentsStore';
// import Components
import NewAppointment from './NewAppointment.jsx';
import AppointmentList from './AppointmentList.jsx';
// import Actions
import AppointmentsActions from '../actions/AppointmentsActions';

class Appointments extends React.Component {
    constructor() {
        super();
        this.state = {
            appointments: AppointmentsStore.getAppointments()
        };
    }

    componentDidMount() {
        AppointmentsStore.addChangeListener(this._onChange.bind(this));
        AppointmentsActions.getAppointments();
    }
    componentWillUnmount() {
        AppointmentsStore.removeChangeListener(this._onChange.bind(this));
    }

    render () {
        return (
            <div>
                {this.props.children}
                <a className="btn btn-info pull-right glyphicon glyphicon-bullhorn" href="#/apps/appointments/new" role="button">
                    <span> </span>NewAppointment
                </a>
                <AppointmentList appointmentList={this.state.appointments}></AppointmentList>
            </div>
        );
    }

    _onChange() {
        console.log('Appointments _onChange : ', AppointmentsStore.getAppointments());
        this.setState({
            appointments: AppointmentsStore.getAppointments()
        });
    }
}

Appointments.propTypes = {
};

export default Appointments;
