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
// import Components
import EditAppointment from './new/EditAppointment.jsx';

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.appointment;
    }

    render () {
        let key = `collapse${this.props.index}`;
        let modalKey = `editAppointmentModal${this.props.index}`;

        // `start` date
        let startDate = new Date(this.state.start);
        startDate = startDate.toLocaleString();
        // `end` date
        let endDate = 'Not given';
        if(this.props.appointment.hasOwnProperty('end')) {
            endDate = new Date(this.state.end);
            endDate = endDate.toLocaleString();
        } else if(this.state.minutesDuration) {
            endDate = this.state.minutesDuration.toString();
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
                            <button type="button" className="btn btn-primary btn-xs" data-toggle="modal" data-target={'#' + modalKey}>
                              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
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

                    <EditAppointment key={modalKey} index={modalKey} appointment={this.state}></EditAppointment>
                </div>
            </div>
        );
    }

    _onDelete(e) {
        console.log('Appointment _onDelete ', this.props.appointment);
        AppointmentsActions.deleteAppointment(this.props.appointment);
    }
}

Appointment.PropTypes = {
    appointment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Appointment;
