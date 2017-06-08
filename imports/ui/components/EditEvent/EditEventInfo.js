import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-flexbox-grid/lib/components/Col';
import TextField from 'react-md/lib/TextFields/TextField';

import RemoveIcon from '../RemoveIcon';
import LinkButton from '../LinkButton';


const EditEventInfo = ({ event, onEventUpdate, onEventRemove }) => (
    <TextField
        id="event-title"
        label="Event Name"
        placeholder="My event"
        customSize="title"
        size={10}
        value={event.title}
        onChange={onEventUpdate('title')}
        rightIcon={<RemoveIcon onRemove={onEventRemove} />}
    />
);

EditEventInfo.propTypes = {
    event: PropTypes.object.isRequired,
    onEventUpdate: PropTypes.func.isRequired,
    onEventRemove: PropTypes.func.isRequired,
};

export default EditEventInfo;