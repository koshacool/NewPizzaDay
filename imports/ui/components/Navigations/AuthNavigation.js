import React from 'react';
import { Meteor } from 'meteor/meteor';

import Toolbar from 'react-md/lib/Toolbars';

import LinkButton from '../LinkButton';


const navButton = (
  <LinkButton floating  mini to="/">home</LinkButton>
);


const logout = () => Meteor.logout();

const actionsButtons = [
  <LinkButton flat to="/events" label="Events" />,
  <LinkButton flat label="Logout" onClick={logout} />,
];


const AuthNavigation = () => (
  <Toolbar
    colored
    title="Vote App"
    nav={navButton}
    actions={actionsButtons}
  />
);


export default AuthNavigation;
