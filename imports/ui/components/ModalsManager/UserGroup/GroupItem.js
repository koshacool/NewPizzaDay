import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'react-md/lib/Lists/ListItem';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';

import IconButton from '../../IconButton';

/**
 *
 * @param {object} group
 * @param {function} onAvailableToggle
 * @param {boolean} checked
 * @param {function} editGroup
 *
 * @returns {XML}
 * @constructor
 */
const GroupItem = ({ group, onAvailableToggle, checked, editGroup }) => {

    const edit = groupId => () => editGroup(groupId);

    return (
        <div>
            <ListItem
                leftIcon={<IconButton name="people" />}
                primaryText={group.name}
                threeLines
                key={group._id}
            >

                <IconButton
                    className="md-tile-content--left-icon"
                    onClick={edit(group._id)}
                    name="edit"
                />

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