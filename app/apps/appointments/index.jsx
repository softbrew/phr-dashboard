/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Appointments React Component
 */

"use strict";

import React, { PropTypes } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

class Appointments extends React.Component {
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

export default Appointments;
