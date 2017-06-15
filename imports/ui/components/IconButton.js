import React from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'react-md/lib/FontIcons/FontIcon';


const IconButton = ({ name, onClick, className }) => (
  <FontIcon
    onClick={onClick}
    className={`pointer ${className}`}
  >
    { name }
  </FontIcon>
);


IconButton.defaultProps = {
  className: '',
};


IconButton.propTypes = {
	name: PropTypes.string.isRequired,
  	onClick: PropTypes.func.isRequired,
  	className: PropTypes.string,
};


export default IconButton;