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
import IconButton from '../IconButton';


const FoodItem = ({ foodItem, onAvailableToggle, checked, onDiscount, discount, onEdit }) => {
    const FoodIcon = () => <FontIcon>restaurant</FontIcon>;
    const evailableToggle = isChecked => onAvailableToggle(foodItem._id, isChecked);
    const edit = foodId => () => onEdit(foodId);
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
                leftIcon={<FoodIcon />}
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