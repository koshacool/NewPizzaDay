import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';

import { updateEvent, removeEvent } from '../../../api/events/methods';
import { removeOrder } from '../../../api/orders/methods';
import { handleResult, ucFirst } from '../../../utils/client-utils';

import EditEventInfo from './EditEventInfo';
import AddFoodContainer from '../Food/AddFoodContainer';
import AddUsersContainer from '../Users/AddUsersContainer';
import ModalsManagerContainer from '../ModalsManager/Containers/ModalsManagerContainer';
import Spinner from '../Spinner';


/**
 * Class for add/remove available food and users in the event
 */
class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalParams: null,
            renderData: false,
        };

        this.onEventUpdate = this.onEventUpdate.bind(this);
        this.onEventRemove = this.onEventRemove.bind(this);
        this.onRenderFood = this.onRenderFood.bind(this);
        this.onRenderUsers = this.onRenderUsers.bind(this);
        this.renderFood = this.renderFood.bind(this);
        this.renderUsers = this.renderUsers.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    /**
     * Change status for display modal(hide modal window)
     * @returns {void}
     */
    hideModal() {
        this.setState({
            modal: false,
        });
    }

    /**
     * Show modal window by name
     * @param {string} name Modal window name
     * @returns {Function}
     */
    showModal(name) {
        return (modalParams = null) =>  this.setState({
            modal: ucFirst(name),
            modalParams,
        });
    }

    /**
     * Display modal window to confirm remove this event
     * @returns {XML}
     */
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

    /**
     * Change state to show food list
     * @return {void}
     */
    onRenderFood() {
        this.setState({
            renderData: 'renderFood',
        });
    }

    /**
     * Change state to show users list
     * @return {void}
     */
    onRenderUsers() {
        this.setState({
            renderData: 'renderUsers',
        });
    }

    /**
     * Return component with food list
     * @return {JSX}
     */
    renderFood() {
        return (<AddFoodContainer event={this.props.event} />);
    }

    /**
     * Return component with users list
     * @return {JSX}
     */
    renderUsers() {
        return (<AddUsersContainer event={this.props.event} />);
    }

    /**
     * Update event by field and value in this field
     *
     * @param {string} field
     * @returns {Function}
     */
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