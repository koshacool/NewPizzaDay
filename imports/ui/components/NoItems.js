import React from 'react';
import PropTypes from 'prop-types';


const NoItems = ({ text }) => (
  <h3 className="md-block-centered">{text}</h3>
);

NoItems.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NoItems;