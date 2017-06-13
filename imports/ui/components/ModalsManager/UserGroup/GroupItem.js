import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import FontIcon from 'react-md/lib/FontIcons';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';


const GroupItem = ({ group, onAvailableToggle, checked, editGroup }) => {

    const GroupIcon = () => <FontIcon>people</FontIcon>;
    //const evailableToggle = (isChecked) => onAvailableToggle(group, isChecked);
    const edit = (groupId) => () => editGroup(groupId);

    return (
        <div>
            <ListItem
                leftIcon={<GroupIcon />}
                primaryText={group.name}
                threeLines
                key={group._id}
            >

                <FontIcon
                    className="md-tile-content--left-icon"
                    onClick={edit(group._id)}
                >
                    edit
                </FontIcon>

                <Checkbox
                    checked={false}
                    id={group._id}
                    name='activeUser'
                    onChange={onAvailableToggle(group)}
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
    editGroup: PropTypes.func.isRequired
};

export default GroupItem;