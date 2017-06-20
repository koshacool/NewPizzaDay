import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events/events';
import { Orders } from '../../../api/orders/orders';
import { Food } from '../../../api/food/food';
import Order from './Order';


export default createContainer(({ eventId }) => {
    const subsHandler1 = Meteor.subscribe('orders.byEventId', eventId);
    const subsHandler2 = Meteor.subscribe('orders.currentUserByEventId', eventId);
    const subsHandler3 = Meteor.subscribe('events.byId', eventId);

    let subsHandler4 = {ready: () => false};
    let subsHandler5 = {ready: () => false};

    const event = Events.findOne({_id: eventId});
    let users = [];
    let food = [];

    if (event) {
        subsHandler4 = Meteor.subscribe('food.byArrayId', event.food);
        food = Food.find({}).fetch();

        subsHandler5 = Meteor.subscribe('users.byArrayId', event.users);
        users = Meteor.users.find({}).fetch();
    }

    return {
        eventId,
        event,
        users,
        food,
        orders: Orders.find({eventId: eventId}).fetch(),
        currentUserOrder: Orders.findOne({eventId: eventId}),

        loading: !subsHandler1.ready() ||
            !subsHandler2.ready() ||
            !subsHandler3.ready() ||
            !subsHandler4.ready() ||
            !subsHandler5.ready(),

        onUnmount: () => {
            subsHandler1.stop();
            subsHandler2.stop();
            subsHandler3.stop();
            subsHandler4.stop();
            subsHandler5.stop();
        },
    };
}, Order);