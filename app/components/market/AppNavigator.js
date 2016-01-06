/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * AppNavigator React Component
 */

"use strict";

import React, { PropTypes } from 'react';

import AppsStore from '../../stores/AppsStore';

class AppNavigator extends React.Component {
    constructor() {
        super();
        this.state = {
            activeApp : AppsStore.getActiveApp()
        };
    }

    componentDidMount() {
        AppsStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        AppsStore.removeChangeListener(this._onChange.bind(this));
    }

    render () {
        return (
            <div>
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a className="glyphicon glyphicon-home" href="#"></a></li>
                        <li><a href="#">Apps</a></li>
                        <li className="active">{this.state.activeApp.title}</li>
                    </ol>
                </div>
                {this.props.children}
            </div>
        );
    }

    _onChange() {
        console.log('AppNavigator _onChange');
        this.setState({
            activeApp : AppsStore.getActiveApp()
        });
    }
}

AppNavigator.propTypes = {
};

export default AppNavigator;
