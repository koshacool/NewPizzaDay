import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { Row } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';

import { createOrder } from '../../../api/orders/methods';
import { updateEvent } from '../../../api/events/methods';
import { handleResult } from '../../../utils/client-utils';

import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';

import OrderFoodContainer from '../Containers/OrderFoodContainer';


class Order extends React.Component {
    constructor(props) {
        super(props);

        this.onConfirmOrder = this.onConfirmOrder.bind(this);

    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    renderFood() {
        const {event, order} = this.props;
        return (<OrderFoodContainer event={event} order={order} onSubmit={this.onConfirmOrder} />);
    }

    onConfirmOrder() {
        const {event} = this.props;
        const {usersOrder} = this.props.order;

        const allOrdered = (this.checkAllSubmittedOrder(
            this.getOrderedUsers(usersOrder),
            event.users)
        );

        if (allOrdered) {
            console.log('ordered');

            const updatedEvent = {
                _id: this.props.event._id,
                partToUpdate: {'status': 'ordered'},
            };

            updateEvent.call(
                updatedEvent,
                handleResult( () => browserHistory.push('/') )
            );


        }
    }

    getOrderedUsers(usersOrder) {
        return Object.keys(usersOrder).filter((userId) => usersOrder[userId].status);
    }

    checkAllSubmittedOrder(orderedUsersArr, availableUsersArr) {
        return orderedUsersArr.length === availableUsersArr.length;
    }

    render() {
        const { loading, order } = this.props;

        return (
            <Spinner loading={loading}>
                { order && (
                    <Row center="xs">
                        {this.renderFood()}
                    </Row>
                )}
            </Spinner>
        );
    }
}


Order.propTypes = {
    order: PropTypes.object,
    event: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
};


export default Order;
