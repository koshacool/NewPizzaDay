import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';

import { handleResult, valueInArray } from '../../../utils/client-utils';
import { updateOrder } from '../../../api/orders/methods';

import OrderFoodItem from './OrderFoodItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';

import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';


class OrderFoodList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };

        this.onAvailableToggle = this.onAvailableToggle.bind(this);
        this.getDiscount = this.getDiscount.bind(this);
        this.getQuantity = this.getQuantity.bind(this);
        this.onQuantity = this.onQuantity.bind(this);
        this.onSubmitOrder = this.onSubmitOrder.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    onAvailableToggle(foodId) {
        return (isChecked) => {
            const food = this.getCurrentUserOrder().food;

            if (isChecked) {
                food.push(foodId);
            } else {
                food.splice(food.indexOf(foodId), 1);
            }

            this.updateUserOrder('food', food);
        }
    }

    onQuantity(foodId) {
        return (value) => {
            const quantity = this.getCurrentUserOrder().quantity;
            quantity[foodId] = value;

            this.updateUserOrder('quantity', quantity);
        };
    }

    onSubmitOrder() {
        this.updateUserOrder('status', true);
        this.props.onSubmit();
    }

    updateUserOrder(field, value) {
        const { order } = this.props;
        let usersOrder = order.usersOrder;
        const currentUserOrder = this.getCurrentUserOrder();

        currentUserOrder[field] = value;
        usersOrder[Meteor.userId()] = currentUserOrder;

        const updatedOrder = {
            _id: order._id,
            partToUpdate: {usersOrder: usersOrder},
        };

        updateOrder.call(updatedOrder, handleResult());


    }

    getEvailableFood() {
        const { event, food } = this.props;
        evailableFoodId = event.food;

        return food.filter((foodItem) => evailableFoodId.indexOf(foodItem._id) !== -1);
    }

    getDiscount(foodId) {
        const { discount } = this.props.event;

        if (!discount[foodId]) {
            return 0;
        }

        return +discount[foodId];
    }

    getQuantity(userOrder, foodId) {
        let quantity = 1;
        if (userOrder.quantity[foodId]) {
            quantity = userOrder.quantity[foodId];
        }

        return +quantity;
    }

    getCurrentUserOrder() {
        const currentUserOrder = this.props.order.usersOrder[Meteor.userId()];

        if (currentUserOrder) {
            return currentUserOrder;
        }

        return {
            status: false,
            food: [],
            quantity: {},
        };
    }

    render() {
        const { loading, event, food, order } = this.props;
        const userOrder = this.getCurrentUserOrder();
        const evailableFood = this.getEvailableFood();

        return (
            <Spinner loading={loading}>

                <Col >
                    {!loading && evailableFood.length === 0 && <NoItems text="Any food is available"/>}

                    <List className="m-b-20">
                        { evailableFood.length > 0 && <Subheader primaryText="MENU" primary/> }
                        <Divider />
                        <Row>

                            {evailableFood.length > 0 && evailableFood.map(foodItem => (
                                <OrderFoodItem
                                    key={foodItem._id}
                                    foodItem={foodItem}
                                    onAvailableToggle={this.onAvailableToggle}
                                    checked={valueInArray(userOrder.food, foodItem._id)}
                                    quantity={this.getQuantity(userOrder, foodItem._id)}
                                    onQuantity={this.onQuantity}
                                    discount={this.getDiscount(foodItem._id)}
                                />
                            ))}

                        </Row>
                    </List>

                </Col>

                <Button floating fixed primary onClick={this.onSubmitOrder}> done </Button>
            </Spinner>
        );
    }
}

OrderFoodList.propTypes = {
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    food: PropTypes.array.isRequired,
    order: PropTypes.object.isRequired,
};

export default OrderFoodList;