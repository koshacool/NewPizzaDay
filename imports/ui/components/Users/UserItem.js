import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FontIcon from 'react-md/lib/FontIcons';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import Avatar from 'react-md/lib/Avatars';


/**
 *
 * @param {object} user
 * @param {function} onAvailableToggle
 * @param {boolean} checked
 *
 * @returns {XML}
 * @constructor
 */
const UserItem = ({ user, onAvailableToggle, checked}) => {

    const evailableToggle = (isChecked) => onAvailableToggle(user._id, isChecked);

    return (
        <div>
            <ListItem
                key={user._id}
                leftAvatar={<Avatar alt={user.username} src={user.avatar} iconSized />}
                primaryText={user.username}
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