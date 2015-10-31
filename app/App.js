var React = require('react');
var ReactDOM = require('react-dom');
import Router from 'react-router';
var routes = require('./config/routes');

ReactDOM.render(<Router >{routes}</Router>, document.getElementById('app'));
