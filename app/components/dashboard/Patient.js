/*
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* Patient React Component
 */

"use strict";

import React, { PropTypes } from 'react';

class Patient extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col-sm-10 col-sm-offset-2">
                    <div className="row">
                        <div className="col-xs-6 col-sm-4 text-muted">
                            <samp>Judy W. Gichoya</samp>
                        </div>
                        <div className="col-xs-4 col-sm-4 text-muted">
                            <samp>ID: 123456</samp>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-4 text-muted">
                            <samp>31 years (7/27/2017)</samp>
                        </div>
                        <div className="col-xs-4 col-sm-4 text-muted">
                            <samp>Last Update: 1/1/2015</samp>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Patient;
