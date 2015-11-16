/*
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* LanguageSelector React Component
 */

"use strict";

import React, { PropTypes } from 'react';

class LanguageSelector extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default  btn-xs">English</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default  btn-xs">Spanish</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default  btn-xs">French</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LanguageSelector;
