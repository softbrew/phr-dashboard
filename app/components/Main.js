/*
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* Main React Component
 */

"use strict";

import React, { PropTypes } from 'react';
// import COMPONENTS
import Settings from './dashboard/Settings';
import Patient from './dashboard/Patient';
import LanguageSelector from './dashboard/LanguageSelector';
// import  STORES
import DashboardStore from '../stores/DashboardStore';

const Main = React.createClass({
    render () {
        return (
            <div className="container-fluid">
                <Settings></Settings>
                <Patient></Patient>
                <footer id="info" className="navbar-fixed-bottom">
                    <LanguageSelector></LanguageSelector>
                    <p className="text-center text-muted small">Personal Health Record System
                        Copyrights at <em><a href="http://www.softbrew.tech/">Softbrew Inc.</a></em></p>
                </footer>
            </div>
        );
    }
});

export default Main;
