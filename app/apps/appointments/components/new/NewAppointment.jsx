/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * NewAppointment React Component
 */

"use strict";

import React, {
    PropTypes
}
from 'react';
// import Actions
import AppointmentsActions from '../../actions/AppointmentsActions';
// import Stores
import AppointmentsStore from '../../stores/AppointmentsStore.js';
// import Components
import NewParticipant from './NewParticipant.jsx';
import ParticipantList from './ParticipantList.jsx';

import PracticeCodes from './PracticeCodes.js';

class NewAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            start: (new Date()).toISOString().substr(0,19),
            end: (new Date(Date.now() + 60*60*1000)).toISOString().substr(0,19),
            participantList: []
        };
    }
    componentDidMount() {
        AppointmentsStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        AppointmentsStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        let practiceCodeList = PracticeCodes.map((code, index) => {
            return <option key={'practiceCode' + index} value={code.code}>
                {code.display}</option>;
        });

        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="selectStatus" className="col-md-2 control-label">Status</label>
                            <div className="col-md-10">
                                <select id="selectStatus" className="form-control" ref={(status) => {this.appointmentStatus = status;}}>
                                    <option value="proposed">Proposed</option>
                                    <option value="pending">Pending</option>
                                    <option value="booked">Booked</option>
                                    <option value="arrived">Arrived</option>
                                    <option value="fulfilled">Fulfilled</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="noshow">No Show</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="selectType" className="col-md-2 control-label">Type</label>
                            <div className="col-md-10">
                                <select id="selectType" className="form-control" ref={(type) => {this.appointmentType = type;}}>
                                    {practiceCodeList}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputPriority" className="col-md-2 control-label">Priority</label>
                            <div className="col-md-10">
                                <input type="number" id="inputPriority" className="form-control" min="0" max="9" ref={(number) => {this.appointmentPriority = number;}} defaultValue="0"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputDescription" className="col-md-2 control-label">Description</label>
                            <div className="col-md-10">
                                <input type="text" id="inputDescription" className="form-control" placeholder="The brief description of the appointment as would be shown on a subject line in a meeting request, or appointment list." ref={(text) => {this.appointmentDescription = text;}}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputStart" className="col-md-2 control-label">Start</label>
                            <div className="col-md-10">
                                <input type="datetime-local" id="inputStart" className="form-control" ref={(date) => {this.appointmentStart = date;}} value={this.state.start.substr(0,19)} data-field="start" onChange={this._onDateChange.bind(this)}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputEnd" className="col-md-2 control-label">End</label>
                            <div className="col-md-10">
                                <input type="datetime-local" id="inputEnd" className="form-control" ref={(date) => {this.appointmentEnd = date;}} value={this.state.end.substr(0,19)} data-field="end" onChange={this._onDateChange.bind(this)}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputMinutesDuration" className="col-md-2 control-label">Duration</label>
                            <div className="col-md-10">
                                <div className="input-group">
                                    <input type="number" min="0" max="1440" className="form-control" id="inputMinutesDuration" ref={(minutes) => {this.appointmentMinutesDuration = minutes;}} defaultValue="1"/>
                                    <span className="input-group-addon">minutes</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputComment" className="col-md-2 control-label">Comment</label>
                            <div className="col-md-10">
                                <input type="text" id="inputComment" className="form-control" placeholder="Additional comments about the appointment." ref={(comment) => {this.appointmentComment = comment;}}/>
                            </div>
                        </div>
                    </form>

                    <hr/>
                    <h4>Participant List</h4>
                    <NewParticipant addParticipant={this.addParticipant.bind(this)}></NewParticipant>
                    <ParticipantList participantList={this.state.participantList}></ParticipantList>

                </div>

                <div className="col-md-offset-2 col-md-6">
                    <button type="submit" className="btn btn-success pull-right glyphicon glyphicon-bullhorn" onClick={this._onNewAppointment.bind(this)}>
                        <span> </span>Make Appointment</button>
                        <br/><br/>
                </div>

            </div>
        );
    }

    _onNewAppointment(e) {
        console.log('NewAppointment _onNewAppointment');
        e.preventDefault();
        // `status` is Required
        if(!this.appointmentStatus.value) {
            alert("Should select Appointment 'Status'.");
        }
        // `participant` is Required
        if(this.state.participantList.length < 1) {
            alert("Should have atleast one 'Participant'.");
            return;
        }
        let selectedCode = PracticeCodes.find((code) => {
          return code.code === this.appointmentType.value;
        });

        let appointment = {
            "resourceType": "Appointment",
            "meta": {
                "versionId": "3",
                "lastUpdated": (new Date()).toISOString()
            },
            "status": this.appointmentStatus.value,
            "type": {
                "coding": [{
                    "system": "http://snomed.info/sct",
                    "code": selectedCode.code,
                    "display": selectedCode.display
                }]
            },
            "priority": this.appointmentPriority.value,
            "description": this.appointmentDescription.value,
            "start": this.state.start + '.000Z',
            "end": this.state.end + '.000Z',
            "minutesDuration": this.appointmentMinutesDuration.value,
            "comment": this.appointmentComment.value,
            "participant": this.state.participantList
        };
        AppointmentsActions.newAppointment(appointment);
    }

    _onDateChange(e) {
        let state = this.state;
        state[e.target.dataset.field] = e.target.value;
        this.setState(state);
    }

    _onChange() {
        console.log('NewAppointment _onChange');
        this.props.history.replaceState(null, '/apps/appointments');
    }

    addParticipant(participant) {
        console.log('addParticipant : ', participant);
        let state = this.state;
        state.participantList.push(participant);
        this.setState(state);
    }
}

NewAppointment.PropTypes = {
};

export default NewAppointment;
