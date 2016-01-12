/*
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* Patient React Component
 */

"use strict";

import React, { PropTypes } from 'react';

import DashboardStore from '../../stores/DashboardStore';
import DashboardActions from '../../actions/DashboardActions';

class Patient extends React.Component {
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
        let age = (new Date()).getYear() - (new Date(this.state.birthDate)).getYear();

        return (
            <div className="row">
                <div className="col-sm-10 col-sm-offset-2">
                    <div className="row">
                        <div className="col-xs-6 col-sm-4 text-muted">
                            <samp>{this.state.name.given + this.state.name.family}</samp>
                        </div>
                        <div className="col-xs-4 col-sm-4 text-muted">
                            <samp>ID: {this.state.id}</samp>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-4 text-muted">
                            <samp>{age} years ({this.state.birthDate})</samp>
                        </div>
                        <div className="col-xs-4 col-sm-4 text-muted">
                            <samp>Last Update: {(new Date(this.state.modifiedAt)).toLocaleDateString()}</samp>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _onChange() {
        console.log('Patient _onChange : ', DashboardStore.getAll());
        this.setState(DashboardStore.getAll());
    }
}

export default Patient;
