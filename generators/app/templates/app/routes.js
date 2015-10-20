import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';

const routes = (
  <Route path="/" component={App}>
    <Route path="/:name" component={Home} />
  </Route>
);

export default routes;
