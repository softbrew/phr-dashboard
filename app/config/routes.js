var React = require('react');
var Main = require('../components/Main');
var Login = require('../components/Login');
var Profile = require('../components/Profile');
import { Router, IndexRoute, Route, Link } from 'react-router';

module.exports = (
  <Route path="/" component={Main}>
    //   <Route path="profile/:username" component={Profile}/>
      <IndexRoute component={Login}/>
    </Route>
);
