import React, { PropTypes } from 'react';

import SignUpActions from '../../actions/SignUpActions';

class SetUp extends React.Component {
    render() {
        return (
            <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <form className="from">
                    <h2 className="form-signin-heading">Import Patient Details</h2>
                    <h6>This set up wizard will import your FHIR Patient Resource from given server,
                    and create a new account in this system. After providing details click next.</h6>
                    <div className="form-group">
                        <label htmlFor="inputFHIRServer" className="">FHIR Server Base URL</label>
                        <input type="text" id="inputFHIRServer" ref={(url) => {this.fhirServer = url;}} className="form-control" placeholder="http://fhirtest.uhn.ca/baseDstu2" required autofocus></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPatientId" className="">Patient ID</label>
                        <input type="text" id="inputPatientId" ref={(id) => {this.patientId = id;}} className="form-control" placeholder="Patient ID" required></input>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this._onSubmitImport.bind(this)}>Next</button>
                </form>
            </div>
            </div>
        );
    }

    _onSubmitImport(e) {
        console.log('>>> ', this.patientId.value);
        e.preventDefault();
        SignUpActions.abc(this.fhirServer.value, this.patientId.value);
    }
}

export default SetUp;
