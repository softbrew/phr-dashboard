/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * Login React Component
 */

'use strict';

import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import history from './config/history';
//let history = createHistory();
import routes from './config/routes';

let el = document.getElementById('login');
// render(<Router history={history}>{routes}</Router>, el);
render(<Router>{routes}</Router>, el);
