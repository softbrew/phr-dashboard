import React, { PropTypes } from 'react';

import SignUpActions from '../../actions/SignUpActions';
import PatientDetail from './PatientDetail';
import SignUpStore from '../../stores/SignUpStore';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = SignUpStore.getAll();
    }

    componentDidMount() {
        // If patient details unavailable, redirect to SetUp page
        if(!this.state.isPatientImported){
            this.props.history.replaceState(null, '/setup');
        }
        SignUpStore.addChangeListener(this._onSignUpSuccess.bind(this));
        SignUpStore.addFailListener(this._onSignUpFail.bind(this));
    }

    componentWillUnmount() {
        SignUpStore.removeChangeListener(this._onSignUpSuccess.bind(this));
        SignUpStore.removeFailListener(this._onSignUpFail.bind(this));
    }

    render() {
        return (
            <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <form className="from">
                    <h2 className="form-signin-heading">Sign Up</h2>
                    <div className="form-group">
                        <label htmlFor="inputUsername" className="">Username</label>
                        <input type="text" id="inputUsername" ref={(username) => {this.username = username;}} className="form-control" placeholder="Ex. johnsmith" required autofocus></input>
                    </div>
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
        console.log('_onSubmit');
        e.preventDefault();
        SignUpActions.signUp({
            username: this.username.value,
            email: this.email.value,
            password: this.password.value,
            patient: this.state.patient,
        });
    }

    _onSignUpSuccess() {
        console.log('_onSignUpSuccess');
        this.setState(SignUpStore.getAll());
        if(this.state.token) {
            window.location = '/public/index.html';
        }
    }

    _onSignUpFail() {
        let error = SignUpStore.getError();
        console.log('_onSignUpFail: ', error);
        if(error.error.error === 'conflict') {
            alert('Given username already exists. Please, login with username after redirect to login page.');
            setTimeout(() => {
                this.props.history.replaceState(null, '/');
            }, 1000);
        }
    }
}



export default SignUp;
