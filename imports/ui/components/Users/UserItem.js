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


const UserItem = ({ user, onAvailableToggle, checked}) => {
    const UserIcon = () => <FontIcon>people</FontIcon>;
    const evailableToggle = (isChecked) => onAvailableToggle(user._id);
    

    return (
        <div>
            <ListItem
                leftIcon={<UserIcon />}
                primaryText={user.username}
                threeLines
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