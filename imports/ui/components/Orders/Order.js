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

import OrderFoodContainer from '../Food/OrderFoodContainer';


class Order extends React.Component {
    constructor(props) {
        super(props);        

        this.onConfirmOrder = this.onConfirmOrder.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    componentWillReceiveProps(nextProps) {
        //Create empty user order if such collection doesn't exist
        if (!nextProps.currentUserOrder) {
            this.createUserOrder();
        }
    }

    createUserOrder() {
        const { eventId } = this.props;
        createOrder.call({ order: { eventId: eventId } }, handleResult());       
    }

    

    renderFood() {
        const {event, currentUserOrder} = this.props;
        return (<OrderFoodContainer event={event} order={currentUserOrder} onSubmit={this.onConfirmOrder} />);
    }

    onConfirmOrder() {        
        const {event, orders} = this.props;

        const allOrdered = (this.checkAllSubmittedOrder(
            this.getOrderedUsers(orders),
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
        } else {
            browserHistory.push('/');
        }
    }

    getOrderedUsers(orders) {
        return orders.filter((order) => order.status);
    }
    

    checkAllSubmittedOrder(orderedUsersArr, availableUsersArr) {
        return orderedUsersArr.length === availableUsersArr.length;
    }

    render() {
        const { loading, currentUserOrder, orders } = this.props;
        // console.log(currentUserOrder, orders, loading)
        
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
    currentUserOrder: PropTypes.object,
    event: PropTypes.object,
    eventId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
};


export default Order;
