import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import routes from './config/routes';

/*Router.render(routes, (Root, state) => {
    React.render(<Root {...state}/>, document.getElementById('app'));
});*/
render(<Router>{routes}</Router>, document.getElementById('app'));
