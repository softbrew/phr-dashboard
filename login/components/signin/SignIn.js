import React, { PropTypes } from 'react';

import SignInActions from '../../actions/SignInActions';
import SignUpStore from '../../stores/SignUpStore';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = SignUpStore.getAll();
    }

    componentDidMount() {
        SignUpStore.addChangeListener(this._onSignInSuccess.bind(this));
        SignUpStore.addFailListener(this._onSignInFail.bind(this));
    }

    componentWillUnmount() {
        SignUpStore.removeChangeListener(this._onSignInSuccess.bind(this));
        SignUpStore.removeFailListener(this._onSignInFail.bind(this));
    }

    render () {
        return (
            <div className="row">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="inputUsername" className="sr-only">Email address</label>
                    <input type="text" id="inputUsername" ref={(username) => {this.username = username;}} className="form-control" placeholder="Username Or Email address" required autofocus></input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" ref={(pass) => {this.password = pass;}} className="form-control" placeholder="Password" required></input>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this._onSubmit.bind(this)}>Sign in</button>
                    <hr/>
                    <div className="text-center">
                        <a href="#setup" className="btn btn-info btn-active" role="button">Create New Account</a>
                    </div>
                </form>
            </div>
        );
    }

    _onSubmit(e) {
        console.log('_onSubmit');
        e.preventDefault();
        SignInActions.signIn({
            username: this.username.value,
            password: this.password.value,
        });
    }

    _onSignInSuccess() {
        console.log('_onSignInSuccess');
        this.setState(SignUpStore.getAll());
        if(this.state.token) {
            window.location = '/public/index.html';
        }
    }

    _onSignInFail() {
        let error = SignUpStore.getError();
        console.log('_onSignInFail: ', error);
        if(error.error.error === 'conflict') {
            alert('Given username or password is invalid. Please, check the username and password, then login again.');
        }
    }
}

export default SignIn;
