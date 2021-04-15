import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedTaskDetail } from './TaskDetail'
import { ConnectedDashboard } from './Dashboard'
import { ConnectedNavigation } from './Navigation'
import { ConnectedLogin } from './Login'
import { ConnectedSignup } from './Signup'
import { store } from '../store/store';
import { history } from '../store/history';
import { Redirect } from 'react-router';

const RouteGuard = Component => ({ match }) => //method takes component as arg, takes "match" as arg
  !store.getState().session.authenticated ?
    <Redirect to="/" /> : //if not logged in redirect to /
    <Component match={match} />;

export const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <div className="container mt-3">
        <ConnectedNavigation />
        <Route //component = display component when route(path) is chose, render= must be a function
          exact 
          path="/"
          component={ConnectedLogin} />
        <Route
          exact
          path="/signup"
          component={ConnectedSignup} />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)} />

        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetail)} />
      </div>
    </Provider>
  </Router>
);