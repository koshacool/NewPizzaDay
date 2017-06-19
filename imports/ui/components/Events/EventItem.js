import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import moment from 'moment';
import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import CardActions from 'react-md/lib/Cards/CardActions';
import Button from 'react-md/lib/Buttons/Button';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import ListItem from 'react-md/lib/Lists/ListItem';
import List from 'react-md/lib/Lists/List';

import { handleResult } from '../../../utils/client-utils';
import { updateEvent } from '../../../api/events/methods';
import OrdersTable   from '../Tables/OrdersTable';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';


const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;

const getObjFromArr = (arr, paramName, value) => arr.filter( obj => obj[paramName] === value )[0];

class EventItem extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    onChangeStatus(status, eventId) {
        return () => {
            let emailBody = `Status changed to '${status}'`;

            switch (status) {
                case 'ordered':
                    emailBody = <OrdersTable 
                            userName="koshacool" 
                            orders={this.detailedUsersPrice()} 
                            totalPrice={this.totalPrice()}
                    />;
                    break;

                case 'delivering':
                    emailBody = 'Delivering';
                    break;

                case 'delivered':
                    emailBody = 'Ordered';
                    break;                
            }

            const updatedEvent = {
                _id: eventId,
                partToUpdate: {'status': status},
            };           

            updateEvent.call(updatedEvent, handleResult( () => this.sendEmail(emailBody) ));
        };
    }

    sendEmail(emailBody) {     
        Meteor.call('sendEmail',
            'roman.kushytskyy@gmail.com',
            `Pizza DAY: ${this.props.event.title}`,
            ReactDOMServer.renderToStaticMarkup(emailBody)
        );
    }

    totalPrice() {
        const { orders, food, event } = this.props;
        const confirmedOrders = this.getConfirmedOrders(orders);

        return orders.map((order) => {
            const foodInfoArr = order.food.map( (foodId) => getObjFromArr(food, '_id', foodId) );//Get array of food objects

            //Get total price for each ordered food
            return foodInfoArr.reduce((sum, foodItem) => {
                 const { discount, quantity } = this.getDiscountAndQuantity(order, foodItem);

                const price = (foodItem.price - discount) * quantity;
                return sum + price;
            }, 0);            
        })
        .reduce((sum, current) => sum + current, 0);
    }

    
    detailedUsersPrice() {
        const { orders } = this.props;
        const confirmedOrders = this.getConfirmedOrders(orders);

        return this.getOrdersForMail(confirmedOrders);
    }


    getOrdersForMail(orders) {
        const { users, food, event } = this.props;
        

        return orders.map((order) => {        
            const userInfo = getObjFromArr(users, '_id', order.owner);//Get owner this order
            const foodInfoArr = order.food.map( (foodId) => getObjFromArr(food, '_id', foodId) );//Get array of food objects

            //Get array of objects with detailed order for each food item
            const OrderInfo = foodInfoArr.map((foodItem) => {
                const { discount, quantity } = this.getDiscountAndQuantity(order, foodItem);

                return {
                    name: foodItem.name,
                    price: foodItem.price - discount,
                    quantity: quantity,
                }
            });


            return {
                userName: userInfo.username,
                order: OrderInfo
            };
        });
    }

    getDiscountAndQuantity(order, foodItem) {
        const { event } = this.props;

        let quantity = order.quantity[foodItem._id];
        let discount = event.discount[foodItem._id];
        discount = discount ? discount : 0;//If discount not exist set it to 0
        quantity = quantity ? quantity : 1;//If quantity not exist set it to 1

        return {discount, quantity};
    }

    getConfirmedOrders(orders) {
        return orders.filter(order => order.status);
    }

    render() {
        const {event} = this.props
        const canEdit = event.createdBy === Meteor.userId();
        //console.log(event.title, this.props)
        return (
            <Col xs={12} className="m-b-20">
                <Card>
                    <CardTitle
                        title={event.title}
                        subtitle={getTimeAgo(event.createdAt)}
                    />

                    <CardText>
                        testatat
                    </CardText>

                    <CardActions>
                        <LinkButton
                            flat
                            to={`/order/${event._id}`}
                            label="Order"
                        />

                        {canEdit && (
                            <LinkButton
                                flat
                                to={`/event/${event._id}`}
                                label="Edit"
                            />
                        )}
                        <List className="md-cell--right">
                            <ListItem
                                primaryText={`Status: ${event.status}`}
                                active
                                threeLines
                            >
                                {canEdit && (<MenuButtonStatus onSelect={this.onChangeStatus} eventId={event._id}/>)}
                            </ListItem>
                        </List>

                    </CardActions>
                </Card>
            </Col>
        );

    }


}


EventItem.propTypes = {
    event: PropTypes.object.isRequired,
    onUnmount: PropTypes.func.isRequired,
    users: PropTypes.array,
    order: PropTypes.array,
    food: PropTypes.array,
};


export default EventItem;
