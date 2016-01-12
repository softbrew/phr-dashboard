import React, { PropTypes } from 'react';

import SignUpActions from '../../actions/SignUpActions';
import PatientDetail from './PatientDetail';
import SignUpStore from '../../stores/SignUpStore';

class SetUp extends React.Component {
    constructor() {
        super();
        this.state = {
            patient : {},
            isPatientImported : false
        };
    }

    componentDidMount() {
        SignUpStore.addChangeListener(this._onImportPatient.bind(this));
    }

    componentWillUnmount() {
        SignUpStore.removeChangeListener(this._onImportPatient.bind(this));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <form className="from">
                            <h2 className="form-signin-heading">Import Patient Details</h2>
                            <h6>This set up wizard will import your FHIR Patient Resource from given server,
                            and create a new account in this system. After providing details click next.</h6>
                            <div className="form-group">
                                <label htmlFor="inputFHIRServer" className="">FHIR Server Base URL</label>
                                <input type="url" id="inputFHIRServer" ref={(url) => {this.fhirServer = url;}} className="form-control" placeholder="http://fhirtest.uhn.ca/baseDstu2" required autofocus></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPatientId" className="">Patient ID</label>
                                <input type="text" id="inputPatientId" ref={(id) => {this.patientId = id;}} className="form-control" placeholder="Patient ID" required></input>
                            </div>
                            <button id="buttonSubmit" className="btn btn-lg btn-block btn-info" type="submit" onClick={this._onSubmitImport.bind(this)}>Import</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    _onSubmitImport(e) {
        e.preventDefault();
        SignUpActions.importPatient(this.fhirServer.value, this.patientId.value);
    }

    _onImportPatient() {
        this.setState(SignUpStore.getAll());
        if(this.state.isPatientImported) {
            this.props.history.replaceState(null, '/new');
        }
    }
}

export default SetUp;
