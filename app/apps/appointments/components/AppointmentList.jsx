/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Appointments AppointmentList React Component
 */

"use strict";

import React, {PropTypes} from 'react';
// import Component
import Appointment from './Appointment.jsx';

class AppointmentList extends React.Component {
    constructor() {
        super();
    }

    render() {
        var appointments = this.props.appointmentList.map((appointment, index) => {
            return <Appointment appointment={appointment} key={index} index={index}></Appointment>;
        });

        return(
            <div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <br/>
                        <div className="row">
                            <div className="col-md-10">
                                <div className="col-md-1">
                                    <strong>Priority</strong></div>
                                <div className="col-md-2">
                                    <strong>Start</strong></div>
                                <div className="col-md-2">
                                    <strong>End</strong></div>
                                <div className="col-md-7">
                                    <strong>Participants</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                {appointments}
            </div>
        );
    }
}

AppointmentList.PropTypes = {
    appointmentList: PropTypes.array.isRequired
};

export default AppointmentList;
