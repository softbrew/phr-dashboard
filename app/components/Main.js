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
            <div>
                <Settings></Settings>
                <Patient></Patient>
                <LanguageSelector></LanguageSelector>
            </div>
        );
    }
});

export default Main;
