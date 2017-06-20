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
    const subsHandler4 = Meteor.subscribe('food.userList');
    const subsHandler5 = Meteor.subscribe('users.list');

    const event = Events.findOne({_id: eventId});


    return {
        eventId,
        event,
        orders: Orders.find({eventId: eventId}).fetch(),
        currentUserOrder: Orders.findOne({eventId: eventId}),
        food: Food.find({}, {sort: {createdAt: -1}}).fetch(),
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