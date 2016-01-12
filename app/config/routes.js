
"use strict";

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
// import COMPONENTS
import Main from '../components/Main';
import CardList from '../components/market/CardList';
import AppNavigator from '../components/market/AppNavigator';
import Settings from '../components/dashboard/Settings';

// import APPS
import Appointments from '../apps/appointments/index.jsx';
import AppointmentsView from '../apps/appointments/components/Appointments.jsx';
import NewAppointment from '../apps/appointments/components/new/NewAppointment.jsx';
import EditAppointment from '../apps/appointments/components/new/EditAppointment.jsx';
import MedicalRecord from '../apps/medical_record/index';
import Journal from '../apps/journal/index';

export default (
    <Route path='/' component={Main}>
        <IndexRoute component={CardList}></IndexRoute>
        <Route path='apps' component={AppNavigator}>
            <Route path='appointments' component={Appointments}>
                <IndexRoute component={AppointmentsView}></IndexRoute>
                <Route path='new' component={NewAppointment}></Route>
                <Route path='edit' component={EditAppointment}></Route>
            </Route>
            <Route path='medical_record' component={MedicalRecord}></Route>
            <Route path='journal' component={Journal}></Route>
        </Route>
        <Route path='settings' component={Settings}></Route>
    </Route>
);
