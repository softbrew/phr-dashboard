/*
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Main React Component
 */

"use strict";

import React, {
    PropTypes
}
from 'react';
// import COMPONENTS
import Settings from './dashboard/Settings';
import Patient from './dashboard/Patient';
import LanguageSelector from './dashboard/LanguageSelector';
// import ACTIONS
import SessionActions from '../actions/SessionActions';
// import  STORES
import DashboardStore from '../stores/DashboardStore';
import SessionStore from '../stores/SessionStore';

class Main extends React.Component {
    constructor() {
        super();
        this.state = SessionStore.getAll();
    }

    componentDidMount() {
        SessionStore.addChangeListener(this._onChange.bind(this));
        SessionActions.getSession();
    }

    componentWillUnmount() {
        SessionStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return(
            <div className="container-fluid">
                <Settings></Settings>
                <Patient></Patient>
                {this.props.children}
                <footer id="info" className="navbar-fixed-bottom">
                    <LanguageSelector></LanguageSelector>
                    <p className="text-center text-muted small">Personal Health Record System
                        Copyrights at <em><a href="http://www.softbrew.tech/">Softbrew Inc.</a></em></p>
                </footer>
            </div>
        );
    }

    _onChange() {
        console.log('_onChange: ', SessionStore.getAll());
        this.setState(SessionStore.getAll());
        if(this.state.token.length < 1) {
            alert('Your session expired. Please, login again.');
            window.location = '/public/login.html';
        }
    }

}

export default Main;
