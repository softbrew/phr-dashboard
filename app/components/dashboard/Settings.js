/*
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* Settings React Component
 */

"use strict";

import React, { PropTypes } from 'react';

const Settings = React.createClass({
    render () {
        return (
            <div className="row">
                <div className="col-md-5 col-md-offset-7">
                    <div className="row">
                        <h6 className="col-md-6 bold">
                            Welcome Judy
                        </h6>
                        <button
                            type="button"
                            className="col-md-3 btn btn-primary-outline">Settings</button>
                        <button
                            type="button"
                            className="col-md-3 btn btn-danger-outline">Logout</button>
                    </div>
                </div>
            </div>
        );
    }
});

export default Settings;
