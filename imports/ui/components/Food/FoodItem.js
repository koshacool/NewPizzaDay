import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';

import IconButton from '../IconButton';


const FoodItem = ({ foodItem, onAvailableToggle, checked, onDiscount, discount, onEdit }) => {

    const evailableToggle = isChecked => onAvailableToggle(foodItem._id, isChecked);
    const edit = foodId => () => onEdit(foodId);

    //Count food item price with discount and
    //return string with price info
    const getPrice = () => {
        if (discount > 0) {
            return `₴ ${(foodItem.price - discount).toFixed(2)} (${foodItem.price})`;
        }
        return `₴ ${foodItem.price}`;
    };

    return (
        <div>
            <ListItem
                key={foodItem._id}
                leftIcon={<IconButton name="restaurant" />}
                primaryText={foodItem.name}
                secondaryText={getPrice()}
                threeLines
            >

              {onDiscount && <TextField
                    id="discount"
                    placeholder="Discount"
                    label="discount"
                    paddedBlock
                    step={1}
                    min={0}
                    max={foodItem.price}
                    value={discount}
                    disabled={!checked}
                    pattern="^\d+(\.|\,)\d{2}"
                    type="number"
                    className="md-cell--2"
                    onChange={onDiscount('discount', foodItem._id)}
                /> }  

                {onEdit && <IconButton
                    className="md-tile-content--left-icon"
                    onClick={edit(foodItem)}
                    name="edit"
                />}

                <Checkbox
                    checked={checked}
                    id={foodItem._id}
                    name='activeFood'
                    onChange={evailableToggle}
                />
            </ListItem>
            <Divider />
        </div>
    );
};

FoodItem.propTypes = {
    foodItem: PropTypes.object.isRequired,
    onAvailableToggle: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    onDiscount: PropTypes.func,
    discount: PropTypes.number,
    onEdit: PropTypes.func,
};

export default FoodItem;