/*
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Login: Main React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import COMPONENTS
// import  STORES
import SignUpStore from '../stores/SignUpStore';

class Main extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.children}
                <footer id="info" className="navbar-fixed-bottom">
                    <p className="text-center text-muted small">Personal Health Record System
                        Copyrights at <em><a href="http://www.softbrew.tech/">Softbrew Inc.</a></em></p>
                </footer>
            </div>
        );
    }
}

export default Main;
