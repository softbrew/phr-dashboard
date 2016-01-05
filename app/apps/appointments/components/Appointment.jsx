/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Appointments Appointment React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Actions
import AppointmentsActions from '../actions/AppointmentsActions';

class Appointment extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            text: ''
        };
    }

    render () {
        let key = `collapse${this.props.key}`;
        // `start` date
        let startDate = new Date(this.props.appointment.start);
        startDate = startDate.toLocaleString();
        // `end` date
        let endDate = 'Not given';
        if(this.props.appointment.end) {
            endDate = new Date(this.props.appointment.end);
            endDate = endDate.toLocaleString();
        } else if(this.props.appointment.minutesDuration) {
            endDate = this.props.appointment.minutesDuration.toString();
        }
        let participants = this.props.appointment.participant.
        map((participant, index) => {
            if(participant.hasOwnProperty('actor')) {
                let actorName = "Unknown";
                if(participant.actor.hasOwnProperty('display')) {
                    actorName = participant.actor.display;
                } else {
                    actorName = participant.actor.reference;
                }
                return <li key={index}> {actorName + ' '} (<mark>{participant.status}</mark>) </li>;
            }
        });

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <hr/>
                    <div className="row">
                        <div className="col-md-10">
                            <div className="col-md-1">
                                <h4>{this.props.appointment.priority || 5}</h4>
                            </div>
                            <div className="col-md-2">
                                <h5>{startDate}</h5>
                            </div>
                            <div className="col-md-2">
                                <h5>{endDate}</h5>
                            </div>
                            <div className="col-md-7">
                                <ul className="list-unstyled">{participants}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            {!this.state.isEditing && <button type="button" className="btn btn-primary btn-xs" aria-label="Left Align" onClick={this._onEdit.bind(this)}>
                              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>}
                            {this.state.isEditing && <button type="button" className="btn btn-success btn-xs" aria-label="Left Align" onClick={this._onSave.bind(this)}>
                              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </button>}
                            <button type="button" className="btn btn-danger btn-xs" aria-label="Left Align" onClick={this._onDelete.bind(this)}>
                              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                            <button className="btn btn-warning btn-xs" type="button" data-toggle="collapse" data-target={'#' + key} aria-expanded="false" aria-controls={key}>
                                <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="collapse" id={key}>
                          <div className="well">
                            ...
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _onChange() {
        console.log('Appointment _onChange');
    }

    _onEdit(e) {
        console.log('Appointment _onEdit');
        this.setState({
            isEditing: true,
            text: this.props.appointment.text
        });
    }

    _onEditing(e) {
        console.log('Appointment _onEditing');
        this.setState({
            isEditing: true,
            text: this.editAppointment.value
        });
    }

    _onSave(e) {
        console.log('Appointment _onSave');
        let appointment = this.props.appointment;
        appointment.text = this.editAppointment.value;
        AppointmentsActions.editAppointment(appointment);
        // Change state
        this.setState({
            isEditing: false,
            text: this.editAppointment.value
        });
    }

    _onDelete(e) {
        console.log('Appointment _onDelete');
        AppointmentsActions.deleteAppointment(this.props.appointment);
    }
}

Appointment.PropTypes = {
    appointment: PropTypes.object.isRequired,
    key: PropTypes.number.isRequired
};

export default Appointment;
