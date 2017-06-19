import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import EventItem from './EventItem';
import { Food } from '../../../api/food/food';
import { Orders } from '../../../api/orders/orders';

export default createContainer(({ event }) => {
    const subsHandler1 = Meteor.subscribe('orders.byEventId', event._id);
    const subsHandler2 = Meteor.subscribe('users.byArrayId', event.users);
    const subsHandler3 = Meteor.subscribe('food.byArrayId', event.food);

    return {
        event,
        users: Meteor.users.find({ _id: { $in: event.users } }).fetch(),//Added users in this event
        orders: Orders.find({eventId: event._id}).fetch(),//Users orders in this event
        food: Food.find({ _id: { $in: event.food } }).fetch(),//Food which are availabled in this event
        onUnmount:() => {
            subsHandler1.stop();
            subsHandler2.stop();
            subsHandler3.stop();
        },
    };
}, EventItem);
