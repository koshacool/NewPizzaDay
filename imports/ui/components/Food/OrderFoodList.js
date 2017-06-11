import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';

import { handleResult } from '../../../utils/client-utils';
import { updateOrder } from '../../../api/orders/methods';

import OrderFoodItem from './OrderFoodItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';

import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';

const existValueInArray = (arr, value) => arr.indexOf(value) !== -1;


class OrderFoodList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };

       
        this.onAvailableToggle = this.onAvailableToggle.bind(this);
        this.getDiscount = this.getDiscount.bind(this);
        this.getQuantity = this.getQuantity.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }
    

    onAvailableToggle(foodId, isChecked) {
        const { order } = this.props;
        const currentUserOrder = this.getCurrentUserOrder();

        if (isChecked) {
            currentUserOrder.food.push(foodId);
        } else {
            currentUserOrder.food.splice(currentUserOrder.food.indexOf(foodId), 1);
        }

        let usersOrder = order.usersOrder;
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
        if (userOrder.quantity[foodId]) {
            return 0;
        }

        return +userOrder.quantity[foodId];
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
           
                <Row center="xs">
                    <Col xs={12} md={12} sm={12}>
                        {!loading && evailableFood.length === 0 && <NoItems text="Any food is available"/>}

                        <List className="m-b-20">
                            { evailableFood.length > 0 &&  <Subheader primaryText="MENU" primary/> }
                            <Divider />
                            {evailableFood.length > 0 && evailableFood.map(foodItem => (
                                <OrderFoodItem 
                                    key={foodItem._id}
                                    foodItem={foodItem} 
                                    onAvailableToggle={this.onAvailableToggle}                                    
                                    checked={existValueInArray(userOrder.food, foodItem._id)}
                                    quantity={this.getQuantity(userOrder, foodItem._id)}
                                    onQuantity={() => console.log('count')}
                                    discount={this.getDiscount(foodItem._id)}
                                />

                            ))}
                        </List>

                    </Col>
                </Row>
            </Spinner>
        );
    }
}

OrderFoodList.propTypes = {
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    food: PropTypes.array.isRequired,    
    order: PropTypes.object.isRequired,
};

export default OrderFoodList;