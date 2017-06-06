import React from 'react';
import { browserHistory,
          Router,
          Route,
          IndexRoute,
          Redirect,
        } from 'react-router';

import AppLayout from '../../ui/layouts/AppLayout';
import NotFoundPage from '../../ui/pages/NotFoundPage';

import SignInPage from '../../ui/pages/SignInPage';
import SignUpPage from '../../ui/pages/SignUpPage';

import MyEventsPage from '../../ui/pages/MyEventsPage';
import EditEventPage from '../../ui/pages/EditEventPage';

const publicRoutes = ['/', '/sign-in', 'sign-up'];
const commonRoutes = ['/not-found'];


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout} publicRoutes={publicRoutes} commonRoutes={commonRoutes}>
      <IndexRoute component={SignInPage} />

      <Route path="sign-in" component={SignInPage} />
      <Route path="sign-up" component={SignUpPage} />

      <Route path="my-events" component={MyEventsPage} />
      <Route path="event/:_id" component={EditEventPage} />

      <Route path="not-found" component={NotFoundPage} />
      <Redirect path="*" to="not-found" />
    </Route>
  </Router>
);