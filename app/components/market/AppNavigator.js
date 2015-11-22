/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * AppNavigator React Component
 */

"use strict";

import React, { PropTypes } from 'react';

class AppNavigator extends React.Component {
    render () {
        return (
            <div className="row">
                <ol className="breadcrumb">
                    <li><a className="glyphicon glyphicon-home" href="#"></a></li>
                    <li><a href="#">Apps</a></li>
                    <li className="active">Appointments</li>
                </ol>
                {this.props.children}
            </div>
        );
    }
}

AppNavigator.propTypes = {
};

export default AppNavigator;
