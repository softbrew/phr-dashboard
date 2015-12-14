import React, { PropTypes } from 'react';

import SignUpActions from '../../actions/SignUpActions';
import PatientDetail from './PatientDetail';
import SignUpStore from '../../stores/SignUpStore';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            isPatientImported : SignUpStore.isPatientImported(),
            patient : SignUpStore.getAll()
        };
    }

    componentDidMount() {
        SignUpStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        SignUpStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return (
            <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <form className="from">
                    <h2 className="form-signin-heading">Sign Up</h2>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="">Email address</label>
                        <input type="email" id="inputEmail" ref={(email) => {this.email = email;}} className="form-control" placeholder="Email address" required autofocus></input>
                    </div>
                    <div className="form-group">
                    <label htmlFor="inputPassword" className="">Password</label>
                    <input type="password" id="inputPassword" ref={(pass) => {this.password = pass;}} className="form-control" placeholder="Password" required></input>
                    </div>
                    <div className="row">
                        <PatientDetail patient={this.state.patient} isPatientImported={this.state.isPatientImported}></PatientDetail>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="accept-terms"/> Accept Terms & Conditions
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this._onSubmit.bind(this)}>Sign Up</button>
                </form>
            </div>
            </div>
        );
    }

    _onSubmit(e) {
        e.preventDefault();
        SignUpActions.signUp({
            email: this.email.value,
            password: this.password.value
        });
    }
}



export default SignUp;
