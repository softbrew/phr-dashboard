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
                <div className="row" key={index}>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor={'fhirURL' + index}> Server :</label>
                            <input type="text" className="form-control" id={'fhirURL' + index} placeholder={server.url} readOnly value={server.url}/>
                        </div><span>  </span>
                    <div className="form-group">
                            <label htmlFor={'patientId' + index}> PatientId :</label>
                            <input type="text" className="form-control" id={'patientId' + index} placeholder={server.patientId} readOnly value={server.patientId}/>
                        </div><span> </span>
                    <button type="submit" className="btn btn-danger btn-sm" onClick={this._onRemoveFHIRServer.bind(this)} value={`${server.url}$${server.patientId}`}>
                            Remove
                        </button>
                    </form>
                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-1">
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
                            <input type="url" className="form-control" id="inputFHIRAccount" placeholder="http://fhirtest.uhn.ca/baseDstu2" ref={c => {this.newFHIRServer = c;}}/>
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
        if(this.newPassword.toString() !== this.confirmPassword.toString()) {
            alert('Confirmed Password should be same as new Password.');
            this.confirmPassword.value = '';
        } else {
            DashboardActions.changePassword({
                password: this.currentPassword.value,
                newPassword: this.newPassword.value
            });
        }
    }

    _onAddFHIRServer(e) {
        e.preventDefault();
        if(!(this.newFHIRServer && this.newPatientId)) {
            alert('FHIR Server Name and Patient ID should required.')
        } else {
            let fhirServerList = this.state.fhirServerList;
            let isExists = fhirServerList.filter(server => {
                return server.url === this.newFHIRServer.value;
            }, this);

            if(isExists.length) {
                alert('FHIR server is already existing.');
            } else {
                fhirServerList.push({
                    url: this.newFHIRServer.value,
                    patientId: this.newPatientId.value
                });
                DashboardActions.changeFHIRServerList(fhirServerList);
                this.newFHIRServer.value = '';
                this.newPatientId.value = '';
            }
        }
    }

    _onChange() {
        console.log('Settings _onChange : ', DashboardStore.getAll());
        this.setState(DashboardStore.getAll());
    }

    _onRemoveFHIRServer(e) {
        console.log('Settings _onRemoveFHIRServer : ', this.state);
        e.preventDefault();
        let str = e.target.value.split('$');
        let fhirServerList = this.state.fhirServerList;
        let removeServer = {
            url: str[0],
            patientId: str[1]
        };
        let newServerList = [];
        for(let i in fhirServerList) {
            if(!(fhirServerList[i].url === removeServer.url && fhirServerList[i].patientId === removeServer.patientId)) {
                newServerList.push(fhirServerList[i]);
            }
        }

        if(newServerList.length < 1) {
            alert('System should have atleast on FHIR server.');
        } else {
            DashboardActions.changeFHIRServerList(newServerList);
        }
    }
}

export default Settings;
