import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';

import LinkButton from '../LinkButton';


const navButton = (
  <LinkButton floating  mini to="/">home</LinkButton>
);

const actionsButtons = [
  <LinkButton flat to="/sign-in" label="Sign In" />,
  <LinkButton flat to="/sign-up" label="Sign Up" />,
];


const PublicNavigation = () => (
  <Toolbar
    colored
    
    nav={navButton}
    actions={actionsButtons}
  />
);


export default PublicNavigation;
