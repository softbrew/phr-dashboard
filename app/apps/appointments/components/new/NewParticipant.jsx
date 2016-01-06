/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * NewParticipant React Component
 */

"use strict";

import React, {
    PropTypes
}
from 'react';
import {
    Router, Route, Link, IndexRoute
}
from 'react-router';

import ParticipantTypes from './ParticipantTypes.js';

class NewParticipant extends React.Component {
    constructor() {
        super();
    }

    render() {
        let participantList = ParticipantTypes.map((type, index) => {
            return <option key={'participantType' + index} value={type}>
                {type}</option>;
        });

        return(
            <div className="well">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="selectParticipantType" className="col-md-2 control-label">Type</label>
                        <div className="col-md-10">
                            <select id="selectParticipantType" className="form-control" ref={(type) => {this.participantType = type;}}>
                                {participantList}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectParticipantActor" className="col-md-2 control-label">Description</label>
                        <div className="col-md-5">
                            <select id="selectParticipantActor" className="form-control" ref={(actor) => {this.participantActor = actor;}}>
                                <option value="Patient">Patient</option>
                                <option value="Practitioner">Practitioner</option>
                                <option value="RelatedPerson">RelatedPerson</option>
                                <option value="Device">Device</option>
                                <option value="HealthcareService">HealthcareService</option>
                                <option value="Location">Location</option>
                            </select>
                        </div>
                        <div className="col-md-5">
                            <input type="text" id="inputParticipantActorId" className="form-control" placeholder="Actor's ID" ref={(id) => {this.participantActorId = id;}}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectParticipantRequired" className="col-md-2 control-label">Required</label>
                        <div className="col-md-10">
                            <select id="selectParticipantRequired" className="form-control" ref={(required) => {this.participantRequired = required;}}>
                                <option value="required">Required</option>
                                <option value="optional">Optional</option>
                                <option value="information-only">Information Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectParticipantStatus" className="col-md-2 control-label">Status</label>
                        <div className="col-md-10">
                            <select id="selectParticipantStatus" className="form-control" ref={(status) => {this.participantStatus = status;}}>
                                <option value="accepted">Accepted</option>
                                <option value="declined">Declined</option>
                                <option value="tentative">Tentative</option>
                                <option value="needs-action">Needs Action</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-info glyphicon glyphicon-plus" onClick={this._onNewParticipant.bind(this)}>
                                <span> </span>Add Participant
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    _onNewParticipant(e) {
        console.log('_onNewParticipant');
        e.preventDefault();
        if(this.participantActorId.value) {
            let newParticipant = {
                "type": [{
                    "coding": [{
                        "system": "http://hl7.org/fhir/participant-type",
                        "code": this.participantType
                            .value
                    }]
                }],
                "actor": {
                    "reference": this.participantActor.value + this
                        .participantActorId.value
                },
                "required": this.participantRequired.value,
                "status": this.participantStatus.value
            };
            this.props.addParticipant(newParticipant);
        } else {
            alert('Participant Id is required.');
        }
    }

}

NewParticipant.PropTypes = {
    addParticipant: PropTypes.func.isRequired
};


export default NewParticipant;
