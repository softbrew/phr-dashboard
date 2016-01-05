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
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="input-group">
                        <textarea ref={(text) => {this.newAppointment = text;}} className="form-control" rows="1" placeholder="What's happening now"></textarea>
                        <span className="input-group-btn">
                            <button className="btn btn-info" type="button" onClick={this._onNewAppointment.bind(this)}>New Appointment</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    _onNewAppointment(e) {
        console.log('NewAppointment _onNewAppointment');
        e.preventDefault();
        AppointmentsActions.newAppointment(this.newAppointment.value);
        this.setState({
            previousAppointment: this.newAppointment.value
        });
        this.newAppointment.value = '';
    }
}

NewAppointment.PropTypes = {
};

export default NewAppointment;
