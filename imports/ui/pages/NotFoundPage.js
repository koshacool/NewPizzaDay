import React from 'react';
import LinkButton from '../components/LinkButton';


const NotFoundPage = () => (
  <div className="md-text-center">
    <h1>Page not found!</h1>

    <LinkButton 
    	to="/"
    	primary 
    	raised 
    	label="Go Home"
    />
  </div>
);

export default NotFoundPage;
