import React from 'react';
import { Meteor } from 'meteor/meteor';

import Toolbar from 'react-md/lib/Toolbars';

import LinkButton from '../LinkButton';


const navButton = (
  <LinkButton floating  mini to="/">home</LinkButton>
);


const logout = () => Meteor.logout();

const actionsButtons = [
  <LinkButton flat to="/my-events" label="My Events" />,
  <LinkButton flat to="/public-events" label="Open Events" />,
  <LinkButton flat label="Logout" onClick={logout} />,
];


const AuthNavigation = () => (
  <Toolbar
    colored
    
    nav={navButton}
    actions={actionsButtons}
  />
);


export default AuthNavigation;
