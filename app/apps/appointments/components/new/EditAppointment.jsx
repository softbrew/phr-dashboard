/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * EditAppointment React Component
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

class EditAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.appointment;
        this.state.participant = props.appointment.participant;
    }
    componentDidMount() {
        // HACK: Show changes after modal close
        $(`#${this.props.index}`).on('hidden.bs.modal', (e) => {
            window.location.reload();
        });
    }

    componentWillUnmount() {
    }

    render() {
        let practiceCodeList = PracticeCodes.map((code, index) => {
            return <option key={'practiceCode' + index} value={code.code}>
                {code.display}</option>;
        });

        return(
            <div id={this.props.index} className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">

                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="selectStatus" className="col-md-2 control-label">Status</label>
                                    <div className="col-md-10">
                                        <select id="selectStatus" className="form-control" ref={(status) => {this.appointmentStatus = status;}} value={this.state.status}  data-field="status" onChange={this._onChange.bind(this)}>
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
                                        <select id="selectType" className="form-control" ref={(type) => {this.appointmentType = type;}} value={this.state.type}  data-field="type" onChange={this._onChange.bind(this)}>
                                            {practiceCodeList}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputPriority" className="col-md-2 control-label">Priority</label>
                                    <div className="col-md-10">
                                        <input type="number" id="inputPriority" className="form-control" min="0" max="9" ref={(priority) => {this.appointmentPriority = priority;}} value={this.state.priority}  data-field="priority" onChange={this._onChange.bind(this)}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputDescription" className="col-md-2 control-label">Description</label>
                                    <div className="col-md-10">
                                        <input type="text" id="inputDescription" className="form-control" placeholder="The brief description of the appointment as would be shown on a subject line in a meeting request, or appointment list." ref={(text) => {this.appointmentDescription = text;}} value={this.state.description} data-field="description" onChange={this._onChange.bind(this)}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputStart" className="col-md-2 control-label">Start</label>
                                    <div className="col-md-10">
                                        <input type="datetime-local" id="inputStart" className="form-control" ref={(date) => {this.appointmentStart = date;}} value={this.state.start.substr(0,19)} data-field="start" onChange={this._onChange.bind(this)}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputEnd" className="col-md-2 control-label">End</label>
                                    <div className="col-md-10">
                                        <input type="datetime-local" id="inputEnd" className="form-control" ref={(date) => {this.appointmentEnd = date;}} value={this.state.end.substr(0,19)} data-field="end" onChange={this._onChange.bind(this)}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputMinutesDuration" className="col-md-2 control-label">Duration</label>
                                    <div className="col-md-10">
                                        <div className="input-group">
                                            <input type="number" min="0" max="1440" className="form-control" id="inputMinutesDuration" ref={(minutes) => {this.appointmentMinutesDuration = minutes;}} value={this.state.minutesDuration} data-field="minutesDuration" onChange={this._onChange.bind(this)}/>
                                            <span className="input-group-addon">minutes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputComment" className="col-md-2 control-label">Comment</label>
                                    <div className="col-md-10">
                                        <input type="text" id="inputComment" className="form-control" placeholder="Additional comments about the appointment." ref={(comment) => {this.appointmentComment = comment;}} value={this.state.comment} data-field="comment" onChange={this._onChange.bind(this)}/>
                                    </div>
                                </div>
                            </form>

                            <hr/>
                            <h4>Participant List</h4>
                            <NewParticipant addParticipant={this.addParticipant.bind(this)}></NewParticipant>
                            <ParticipantList participantList={this.state.participant}></ParticipantList>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this._onEditAppointment.bind(this)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _onChange(e) {
        // console.log(e.target);
        let state = this.state;
        state[e.target.dataset.field] = e.target.value;
        this.setState(state);
    }

    _onEditAppointment(e) {
        console.log('EditAppointment _onEditAppointment');
        // `status` is Required
        if(!this.appointmentStatus.value) {
            alert("Should select Appointment 'Status'.");
        }
        // `participant` is Required
        if(this.state.participant.length < 1) {
            alert("Should have atleast one 'Participant'.");
            return;
        }
        let selectedCode = PracticeCodes.find((code) => {
          return code.code === this.appointmentType.value;
        });

        let appointment = {
            "_id": this.props.appointment._id,
            "_rev": this.props.appointment._rev,
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
            "start": this.appointmentStart.value + '.000Z',
            "end": this.appointmentEnd.value + '.000Z',
            "minutesDuration": this.appointmentMinutesDuration.value,
            "comment": this.appointmentComment.value,
            "participant": this.state.participant
        };
        AppointmentsActions.editAppointment(appointment);
    }

    addParticipant(participant) {
        console.log('addParticipant : ', participant);
        let state = this.state;
        state.participant.push(participant);
        this.setState(state);
    }
}

EditAppointment.PropTypes = {
    appointment: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired
};

export default EditAppointment;
