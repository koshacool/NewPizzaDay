import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';

import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FontIcon from 'react-md/lib/FontIcons';
import Subheader from 'react-md/lib/Subheaders';
import Divider from 'react-md/lib/Dividers';
import Button from 'react-md/lib/Buttons';
import TextField from 'react-md/lib/TextFields';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';


const OrderFoodItem = ({ foodItem, onAvailableToggle, checked, onQuantity, quantity, discount }) => {
    const FoodIcon = () => <FontIcon>restaurant</FontIcon>;
    const evailableToggle = (isChecked) => onAvailableToggle(foodItem._id, isChecked);
    const getPrice = () =>  `₴ ${(foodItem.price - discount).toFixed(2)} `;        
    
    return (
        <div>
            <ListItem
                key={foodItem._id}
                leftIcon={<FoodIcon />}
                primaryText={foodItem.name}
                secondaryText={getPrice()}
                threeLines
            >

                <TextField
                    id="discount"
                    placeholder="Quantity"
                    label="quantity"
                    paddedBlock
                    step={1}
                    min={0}
                    value={quantity}
                    pattern="^\d+"
                    type="number"
                    className="md-cell--2"
                    onChange={onQuantity(foodItem._id)}
                />

                <Checkbox
                    checked={checked}
                    id={foodItem._id}
                    name='orderedFood'
                    onChange={evailableToggle}
                />
            </ListItem>
            <Divider />
        </div>
    );
};

OrderFoodItem.propTypes = {
    foodItem: PropTypes.object.isRequired,
    onAvailableToggle: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,    
    quantity: PropTypes.number.isRequired,
    onQuantity: PropTypes.func.isRequired,
    discount: PropTypes.number.isRequired,
};

export default OrderFoodItem;