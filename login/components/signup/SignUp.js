import React, { PropTypes } from 'react';

import SignUpStore from '../../stores/SignUpStore';

class SignUp extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        SignUpStore.addChangeListener(this._onChange());
    }

    componentWillUnmount() {
        SignUpStore.removeChangeListener(this._onChange());
    }

    render() {
        return (
            <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <form className="from">
                    <h2 className="form-signin-heading">Sign Up</h2>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus></input>
                    </div>
                    <div className="form-group">
                    <label htmlFor="inputPassword" className="">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="accept-terms"/> Accept Terms & Conditions
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                </form>
            </div>
            </div>
        );
    }

    _onChange() {
        this.props.history.pushState(null, '')
    }
}



export default SignUp;
