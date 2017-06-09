import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-flexbox-grid/lib/components/Col';
import TextField from 'react-md/lib/TextFields/TextField';

import RemoveIcon from '../../RemoveIcon';
import LinkButton from '../../LinkButton';


const UserGroupInfo = ({ group, onGroupUpdate, onGroupRemove }) => (
    <TextField
        id="group-name"
        label="Group Name"
        placeholder="group name"
        customSize="title"
        value={group.name}
        onChange={onGroupUpdate('name')}
        rightIcon={<RemoveIcon onRemove={onGroupRemove} />}
    />
);

UserGroupInfo.propTypes = {
    group: PropTypes.object.isRequired,
    onGroupUpdate: PropTypes.func.isRequired,
    onGroupRemove: PropTypes.func.isRequired,
};

export default UserGroupInfo;