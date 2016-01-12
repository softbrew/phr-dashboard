/*
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Main React Component
 */

"use strict";

import React, { PropTypes } from 'react';

import DashboardStore from '../../stores/DashboardStore';
import DashboardActions from '../../actions/DashboardActions';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = DashboardStore.getAll();
    }

    componentDidMount() {
        DashboardStore.addChangeListener(this._onChange.bind(this));
    }
    componentWillUnmount() {
        DashboardStore.removeChangeListener(this._onChange.bind(this));
    }

    render () {
        let serverList = this.state.fhirServerList.map((server, index) => {
            return (
                <li key={index}>{server.url} {server.patientId}</li>
            );
        });

        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-1">
                    <h2 className="text-center">Settings</h2><br/>
                    <div className="row">
                        <h4>Change Password</h4>
                        <form>
                          <div className="form-group">
                            <label htmlFor="inputCurrentPassword">Password</label>
                            <input type="password" className="form-control" id="inputCurrentPassword" placeholder="Current Password" ref={c => {this.currentPassword = c;}}/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="inputNewPassword">New Password</label>
                            <input type="password" className="form-control" id="inputNewPassword" placeholder="New Password" ref={c => {this.newPassword = c;}}/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="inputConfirmPassword">Confirm New Password</label>
                            <input type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password" ref={c => {this.confirmPassword = c;}}/>
                          </div>
                          <button type="submit" className="btn btn-default" onClick={this._onChangePassword.bind(this)}>Change Password</button>
                        </form>
                        <hr/>
                    </div>

                    <div className="row">
                        <h4>Manage FHIR Accounts</h4>
                        <hr/>
                        <div className="row">
                            <ul>
                                {serverList}
                            </ul>
                        </div>
                        <form>
                          <div className="form-group">
                            <label className="" htmlFor="inputFHIRAccount">New FHIR Server URL</label>
                            <input type="url" className="form-control" id="inputFHIRAccount" placeholder="http://fhirtest.uhn.ca/baseDstu2" ref={c => {this.newFHIRAccount = c;}}/>
                          </div>
                          <div className="form-group">
                            <label className="" htmlFor="inputPatientId">Patient ID</label>
                            <input type="text" className="form-control" id="inputPatientId" placeholder="Patient Id" ref={c => {this.newPatientId = c;}}/>
                          </div>
                          <button type="submit" className="btn btn-default" onClick={this._onAddFHIRServer.bind(this)}>Add FHIR</button>
                      </form>
                    </div>
                </div>
            </div>
        );
    }

    _onChangePassword(e) {
        e.preventDefault();
    }

    _onAddFHIRServer(e) {
        e.preventDefault();
    }

    _onChange() {
        console.log('Settings _onChange : ', DashboardStore.getAll());
        this.setState(DashboardStore.getAll());
    }
}

export default Settings;
