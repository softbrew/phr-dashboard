/*
* Copyright (c) 2015, Softbrew, Inc.
* All rights reserved.
*
* Settings React Component
 */

"use strict";

import React, { PropTypes } from 'react';

class Settings extends React.Component {

    render () {
        return (
            <div className="row">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        {this.renderHeader()}
                        {this.renderLogout()}
                    </div>
                </nav>
            </div>
        );
    }

    renderHeader() {
        return (
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">PHR</a>
            </div>
        );
    }

    renderLogout() {
        return (
            <div className="collapse navbar-collapse"  id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a>Welcome Judy</a>
                    </li>
                    <li className="dropdown">
                        <a href="#"
                            className="dropdown-toggle" data-toggle="dropdown"
                            role="button" aria-haspopup="true" aria-expanded="false">
                            <img alt="@milankarunarathne" width="20" height="20"
                                src="https://avatars0.githubusercontent.com/u/11207066?v=3&s=40"/>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <a>Sign in as <br/>
                                    <strong>milankarunarathne</strong>
                                </a>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li>
                                <a href="#">Profile</a>
                            </li>
                            <li>
                                <a href="#">Applications</a>
                            </li>
                            <li>
                                <a href="#">Help</a>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li>
                                <a href="#">Settings</a>
                            </li>
                            <li>
                                <a href="#">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Settings;
