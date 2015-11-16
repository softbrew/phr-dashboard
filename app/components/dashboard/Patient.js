/*
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* Patient React Component
 */

"use strict";

import React, { PropTypes } from 'react';

const Patient = React.createClass({
    render () {
        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="col-md-6">
                        <h6>Judy W. Gichoya</h6>
                        <h6>31 years (07/27/2018)</h6>
                    </div>
                    <div className="col-md-6">
                        <h6>ID: 123456</h6>
                        <h6>Last Updated: 1/1/2015</h6>
                    </div>
                </div>
            </div>
        );
    }
});

export default Patient;
