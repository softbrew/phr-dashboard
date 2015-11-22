/**
 * Copyright (c) 2015, Softbrew, Inc.
 * All rights reserved.
 *
 * App React Component
 */

"use strict";

import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import routes from './config/routes';

render(<Router>{routes}</Router>, document.getElementById('app'));
