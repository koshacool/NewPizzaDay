import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FontIcon from 'react-md/lib/FontIcons';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';


const GroupItem = ({ group, onAvailableToggle, checked }) => {

    const GroupIcon = () => <FontIcon>people</FontIcon>;
    const evailableToggle = (isChecked) => onAvailableToggle(group, isChecked);

    return (
        <div>
            <ListItem
                leftIcon={<GroupIcon />}
                primaryText={group.name}
                threeLines
                key={group._id}
            >

                <Checkbox
                    checked={false}
                    id={group._id}
                    name='activeUser'
                    onChange={evailableToggle}
                    checked={checked}
                />
            </ListItem>
            <Divider />
        </div>
    );

};

GroupItem.propTypes = {
    group: PropTypes.object.isRequired,
    onAvailableToggle: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default GroupItem;