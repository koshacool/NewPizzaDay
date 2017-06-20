import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import ReactDOMServer from 'react-dom/server';

import { Row } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';

import { createOrder } from '../../../api/orders/methods';
import { updateEvent, changeEventStatus } from '../../../api/events/methods';
import { handleResult } from '../../../utils/client-utils';
import { detailedUsersPrice, totalPrice } from '../../../utils/order-result';

import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';

import OrderFoodContainer from '../Food/OrderFoodContainer';
import OrdersTable   from '../Tables/OrdersTable';


class Order extends React.Component {
    constructor(props) {
        super(props);

        this.onConfirmOrder = this.onConfirmOrder.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    createUserOrder() {
        const { eventId } = this.props;
        createOrder.call({order: {eventId: eventId}}, handleResult());
    }

    renderFood() {
        const {event, currentUserOrder, food} = this.props;
        return (<OrderFoodContainer
            event={event}
            order={currentUserOrder}
            onSubmit={this.onConfirmOrder}
            food={food}
        />);
    }

    onConfirmOrder() {
        const {event, orders} = this.props;
        const allOrdered = (this.checkAllSubmittedOrder(
                this.getConfirmedOrders(orders),
                event.users)
        );

        if (allOrdered) {
            const updatedEvent = {
                _id: this.props.event._id,
                status: 'ordered',
            };

            changeEventStatus.call(
                updatedEvent,
                handleResult(() => {
                    console.log('ordered');
                    this.prepareOrdersResultAndSendEmail();
                    browserHistory.push('/');
                })
            );
        } else {
            browserHistory.push('/');
        }
    }


    getConfirmedOrders(orders) {
        return orders.filter((order) => order.status);
    }

    checkAllSubmittedOrder(confirmedOrdersArr, availableUsersArr) {
        return confirmedOrdersArr.length === availableUsersArr.length;
    }

    prepareOrdersResultAndSendEmail() {
        const userEmail = Meteor.user().emails[0].address;
        const { orders, food, users, event } = this.props;

        let emailBody = <OrdersTable
            orders={detailedUsersPrice(orders, users, food, event)}
            totalPrice={+totalPrice(orders, food, event)}
        />;

        this.sendEmail(userEmail, event.title, 'ordered', emailBody);
    }

    sendEmail(from, eventName, status, emailBody) {
        Meteor.call('sendEmail',
            from,
            `Pizza DAY "${eventName}": ${status}`,
            ReactDOMServer.renderToStaticMarkup(emailBody)
        );
    };

    render() {
        const { loading, currentUserOrder } = this.props;

        return (
            <Spinner loading={loading}>
                {currentUserOrder && <Row center="xs">
                    {this.renderFood()}
                </Row>}
            </Spinner>
        );
    }
}


Order.propTypes = {
    orders: PropTypes.array,
    food: PropTypes.array,
    users: PropTypes.array,
    currentUserOrder: PropTypes.object,
    event: PropTypes.object,
    eventId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
};


export default Order;
