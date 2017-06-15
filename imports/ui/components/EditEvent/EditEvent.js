import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';
import Spinner from '../Spinner';
import ModalsManager from '../ModalsManager/ModalsManager';

import { handleResult } from '../../../utils/client-utils';
import { updateEvent, removeEvent } from '../../../api/events/methods';
import { removeOrder } from '../../../api/orders/methods';

import EditEventInfo from './EditEventInfo';
import AddFoodContainer from '../Food/AddFoodContainer';
import AddUsersContainer from '../Users/AddUsersContainer';


class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            renderData: false,
        }

        this.onEventUpdate = this.onEventUpdate.bind(this);
        this.onEventRemove = this.onEventRemove.bind(this);
        this.onRenderFood = this.onRenderFood.bind(this);
        this.renderFood = this.renderFood.bind(this);
        this.onRenderUsers = this.onRenderUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    onEventRemove() {
        const { eventId } = this.props;
        removeEvent.call({_id: eventId}, handleResult(() => {
            removeOrder.call({eventId: eventId}, handleResult());
            this.context.router.push('/my-events');
        }));
    }

    onRenderFood() {
        this.setState({
            renderData: 'renderFood',
        });
    }

    onRenderUsers() {
        this.setState({
            renderData: 'renderUsers',
        });
    }

    renderFood() {
        return (<AddFoodContainer event={this.props.event} />);
    }

    renderUsers() {
        return (<AddUsersContainer event={this.props.event} />);
    }

    onEventUpdate(field) {
        return (value) => {
            const updatedEvent = {
                _id: this.props.eventId,
                partToUpdate: {[field]: value},
            };

            updateEvent.call(updatedEvent, handleResult());
        };
    }

    render() {
        const { loading, event, children } = this.props;
        const { renderData } = this.state;
       
        return (
            <Spinner loading={loading}>
                <Row className="m-b-20">
                    <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
                        <EditEventInfo
                            event={event}
                            onEventUpdate={this.onEventUpdate}
                            onEventRemove={this.onEventRemove}
                        />

                        <Button
                            raised
                            label="FOOD"
                            onClick={this.onRenderFood}
                        />

                        <Button
                            raised
                            label="PEOPLE"
                            onClick={this.onRenderUsers}    
                        />

                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
                        { renderData && this[renderData]() }
                    </Col>
                </Row>
            </Spinner>
        );
    }
}


EditEvent.defaultProps = {
    event: {}
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