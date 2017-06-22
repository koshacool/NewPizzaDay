import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'react-flexbox-grid';

import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';

import IconButton from '../IconButton';


const OrderFoodItem = ({ foodItem, onAvailableToggle, checked, onQuantity, quantity, discount }) => {
    const getPrice = () => `₴ ${(foodItem.price - discount).toFixed(2)}`;//Count food item price with discount

    return (
        <Col xs={12} md={12} sm={12}>
            <ListItem
                key={foodItem._id}
                leftIcon={<IconButton name="restaurant" />}
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
                    min={1}
                    value={quantity}
                    pattern="^\d+"
                    type="number"
                    className="md-cell--2"
                    disabled={!checked}
                    onChange={onQuantity(foodItem._id)}
                />

                <Checkbox
                    checked={checked}
                    id={foodItem._id}
                    name='orderedFood'
                    onChange={onAvailableToggle(foodItem._id)}
                />
            </ListItem>
            <Divider />
        </Col>
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