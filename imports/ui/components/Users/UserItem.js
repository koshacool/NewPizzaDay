import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FontIcon from 'react-md/lib/FontIcons';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';



const UserItem = ({ user, onAvailableToggle, checked}) => {
    const UserIcon = () => <FontIcon>people</FontIcon>;
    const evailableToggle = (isChecked) => onAvailableToggle(user._id, isChecked);
    

    return (
        <div>
            <ListItem
                leftIcon={<UserIcon />}
                primaryText={user.username}
                threeLines
                key={user._id}
            >
                
                <Checkbox
                    checked={checked}
                    id={user._id}
                    name='activeUser'
                    onChange={evailableToggle}
                />
            </ListItem>
            <Divider />
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    onAvailableToggle: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default UserItem;