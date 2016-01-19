/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * MedicalRecord React Component
 */

"use strict";

import React, { PropTypes } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

class MedicalRecord extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default MedicalRecord;
