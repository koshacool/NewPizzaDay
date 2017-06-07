import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';


import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';


const FoodItem = ({ foodItem }) => {

    return (
        <Col xs={12} className="m-b-20">
            {foodItem.name}
        </Col>
    );
};





FoodItem.propTypes = {
    foodItem: PropTypes.object.isRequired,
};


export default FoodItem;
