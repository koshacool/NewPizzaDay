import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-flexbox-grid/lib/components/Col';
import TextField from 'react-md/lib/TextFields/TextField';

import IconButton from '../../IconButton';
import LinkButton from '../../LinkButton';


const EditGroupInfo = ({ group, onGroupUpdate, onGroupRemove }) => (
    <TextField
        id="group-name"
        label="Group Name"
        placeholder="group name"
        customSize="title"
        value={group.name}
        onChange={onGroupUpdate('name')}
        rightIcon={<IconButton onClick={onGroupRemove} name="delete" />}
    />
);

EditGroupInfo.propTypes = {
    group: PropTypes.object.isRequired,
    onGroupUpdate: PropTypes.func.isRequired,
    onGroupRemove: PropTypes.func.isRequired,
};

export default EditGroupInfo;