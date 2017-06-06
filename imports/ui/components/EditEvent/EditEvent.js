import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';
import TextField from 'react-md/lib/TextFields/TextField';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';
import Spinner from '../Spinner';
import RemoveIcon from '../RemoveIcon';
import ModalsManager from '../ModalsManager/ModalsManager';

import { handleResult } from '../../../utils/client-utils';
import { updateEvent, removeEvent } from '../../../api/events/methods';


class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }

        this.onUpdateEvent = this.onUpdateEvent.bind(this);
        this.onEventRemove = this.onEventRemove.bind(this);
        this.modalConfirmRemove = this.modalConfirmRemove.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    onEventRemove() {
        removeEvent.call({_id: this.props.eventId}, handleResult(() => {
            this.context.router.push('my-events');
        }));
    }

    modalConfirmRemove() {
        this.setState({
            modal: true
        });
    }

    hideModal() {
        this.setState({
            modal: false
        });
    }

    onUpdateEvent(field) {
        return (value) => {
            const updatedEvent = {
                _id: this.props.eventId,
                partToUpdate: {[field]: value},
            };

            updateEvent.call(updatedEvent, handleResult());
        };
    }

    render() {
        const { loading, event } = this.props;

        return (
            <Spinner loading={loading}>
                <Col xs={12}>
                    <TextField
                        id="event-title"
                        label="Event Name"
                        placeholder="My event"
                        customSize="title"
                        size={10}
                        value={event.title}
                        onChange={this.onUpdateEvent('title')}
                        rightIcon={<RemoveIcon onRemove={this.modalConfirmRemove} />}
                    />
                </Col>
                { this.state.modal && <ModalsManager
                    modal={this.state.modal}
                    onConfirm={this.onEventRemove}
                    hideModal={this.hideModal}
                /> }
            </Spinner>
        );
    }
}


EditEvent.defaultProps = {
    event: {},
};


EditEvent.propTypes = {
    eventId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
    event: PropTypes.object,
};


EditEvent.contextTypes = {
    router: PropTypes.object.isRequired,
};


export default EditEvent;
