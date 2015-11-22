
"use strict";

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
// import COMPONENTS
import Main from '../components/Main';
import CardList from '../components/market/CardList';
import AppNavigator from '../components/market/AppNavigator';

// import APPS
import Appointments from '../components/apps/appointments/Appointments';
import MedicalRecord from '../components/apps/medical_record/MedicalRecord';
import Journal from '../components/apps/journal/Journal';

export default (
    <Route path='/' component={Main}>
        <IndexRoute component={CardList}></IndexRoute>
        <Route path='apps' component={AppNavigator}>
            <Route path='appointments' component={Appointments}></Route>
            <Route path='medical_record' component={MedicalRecord}></Route>
            <Route path='journal' component={Journal}></Route>
        </Route>
    </Route>
);
