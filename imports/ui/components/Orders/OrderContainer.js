import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { handleResult } from '../../../utils/client-utils';
import { createOrder } from '../../../api/orders/methods';
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
    let users = [];
    let food = [];
    let currentUserOrder = {};

    //Get logged user order, if such not exist - create it
    if (subsHandler2.ready()) {
        currentUserOrder = Orders.findOne({eventId: eventId, owner: Meteor.userId()});
        if (!currentUserOrder) {
            createOrder.call({order: {eventId: eventId}}, handleResult());
        }
    }


    const event = Events.findOne({_id: eventId});

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
        currentUserOrder,
        orders: Orders.find({eventId: eventId}).fetch(),
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