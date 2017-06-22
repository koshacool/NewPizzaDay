import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'react-md/lib/TextFields/TextField';
import IconButton from '../IconButton';

const EditEventInfo = ({ event, onEventUpdate, onEventRemove }) => (
    <TextField
        id="event-title"
        label="Event Name"
        placeholder="My event"
        customSize="title"
        size={10}
        value={event.title}
        onChange={onEventUpdate('title')}
        rightIcon={<IconButton onClick={onEventRemove} name="delete" />}
    />
);

EditEventInfo.propTypes = {
    event: PropTypes.object.isRequired,
    onEventUpdate: PropTypes.func.isRequired,
    onEventRemove: PropTypes.func.isRequired,
};

export default EditEventInfo;