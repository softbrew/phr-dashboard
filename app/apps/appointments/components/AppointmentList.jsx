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
        var appointments = this.props.appointmentList.map((post, index) => {
            return <Appointment post={post} key={index}></Appointment>;
        });

        return(
            <div>
                {appointments}
            </div>
        );
    }
}

AppointmentList.PropTypes = {
    appointmentList: PropTypes.array.isRequired
};

export default AppointmentList;
