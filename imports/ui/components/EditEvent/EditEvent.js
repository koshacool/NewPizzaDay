import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';
import Spinner from '../Spinner';

import { handleResult } from '../../../utils/client-utils';
import { updateEvent, removeEvent } from '../../../api/events/methods';
import { removeOrder } from '../../../api/orders/methods';

import EditEventInfo from './EditEventInfo';
import AddFoodContainer from '../Food/AddFoodContainer';
import AddUsersContainer from '../Users/AddUsersContainer';
import ModalsManagerContainer from '../ModalsManager/Containers/ModalsManagerContainer';


class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalParams: null,
            renderData: false,
        }

        this.onEventUpdate = this.onEventUpdate.bind(this);
        this.onEventRemove = this.onEventRemove.bind(this);
        this.onRenderFood = this.onRenderFood.bind(this);
        this.renderFood = this.renderFood.bind(this);
        this.onRenderUsers = this.onRenderUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    hideModal() {
        this.setState({
            modal: false,
        });
    }

    ucFirst(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    showModal(name) {
        return (modalParams = null) =>  this.setState({
            modal: this.ucFirst(name),
            modalParams,
        });
    }


    modalConfirm() {
        return (<ModalsManagerContainer
            modalName={this.state.modal}
            hideModal={this.hideModal}
            modalDescription="Are you sure?"
            onConfirm={this.onEventRemove}
            modal={true}
        />);
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
        const { renderData, modal, modalParams } = this.state;

        return (
            <Spinner loading={loading}>
                <Row className="m-b-20">
                    <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
                        <EditEventInfo
                            event={event}
                            onEventUpdate={this.onEventUpdate}
                            onEventRemove={this.showModal('confirm')}
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

                {modal && this[`modal${modal}`](modalParams)}
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