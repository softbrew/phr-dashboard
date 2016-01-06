/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Journal NewAppointment React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import Actions
import AppointmentsActions from '../../actions/AppointmentsActions';
// import Components
import NewParticipant from './NewParticipant.jsx';
import ParticipantList from './ParticipantList.jsx';

import PracticeCodes from './PracticeCodes.js';

class NewAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            participantList: []
        };
    }

    render() {
        let practiceCodeList = PracticeCodes.map((code, index) => {
            return <option key={'practiceCode' + index} value={code.code}>{code.display}</option>;
        });

        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="selectStatus" className="col-md-2 control-label">Status</label>
                            <div className="col-md-10">
                                <select id="selectStatus" className="form-control">
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
                                <select id="selectType" className="form-control">
                                    {practiceCodeList}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputPriority" className="col-md-2 control-label">Priority</label>
                            <div className="col-md-10">
                                <input type="number" id="inputPriority" className="form-control" min="0" max="9"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputDescription" className="col-md-2 control-label">Description</label>
                            <div className="col-md-10">
                                <input type="text" id="inputDescription" className="form-control" placeholder="The brief description of the appointment as would be shown on a subject line in a meeting request, or appointment list."/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputStartDate" className="col-md-2 control-label">Start</label>
                            <div className="col-md-5">
                                <input type="date" id="inputStartDate" className="form-control"/>
                            </div>
                            <div className="col-md-5">
                                <input type="time" id="inputStartTime" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputEndDate" className="col-md-2 control-label">End</label>
                            <div className="col-md-5">
                                <input type="date" id="inputEndDate" className="form-control"/>
                            </div>
                            <div className="col-md-5">
                                <input type="time" id="inputEndTime" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputMinutesDuration" className="col-md-2 control-label">Duration</label>
                            <div className="col-md-10">
                                <div className="input-group">
                                    <input type="number" min="0" max="1440" className="form-control" id="inputMinutesDuration"/>
                                    <span className="input-group-addon">minutes</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputComment" className="col-md-2 control-label">Comment</label>
                            <div className="col-md-10">
                                <input type="text" id="inputComment" className="form-control" placeholder="Additional comments about the appointment."/>
                            </div>
                        </div>
                    </form>

                    <hr/>
                    <h4>Participant List</h4>
                    <NewParticipant addParticipant={this.addParticipant.bind(this)}></NewParticipant>
                    <ParticipantList participantList={this.state.participantList}></ParticipantList>

                    <div className="col-md-offset-2 col-md-10">
                        <button type="submit" className="btn btn-primary pull-right glyphicon glyphicon-bullhorn" onSubmit={this._onNewAppointment.bind(this)}>
                            <span> </span>Make Appointment</button>
                    </div>

                </div>
            </div>
        );
    }

    _onNewAppointment(e) {
        console.log('NewAppointment _onNewAppointment');
        e.preventDefault();
        console.log();
    }

    addParticipant(participant) {
        console.log('addParticipant : ', participant);
        let state = this.state;
        state.participantList.push(participant);
        this.setState(state);
    }
}

NewAppointment.PropTypes = {
    appointment: PropTypes.object.isRequired
};

export default NewAppointment;
