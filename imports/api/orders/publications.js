import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Orders } from './orders';


Meteor.publish('orders.byEventId', function ordersByEventId(eventId) {
	check(eventId, String);
    if (!this.userId) {
        return this.ready();
    }

    return Orders.find({eventId: eventId});
});

Meteor.publish('orders.currentUserByEventId', function ordersCurrentUserByEventId(eventId) {
	check(eventId, String);

    if (!this.userId) {
        return this.ready();
    }

    return Orders.find({ eventId: eventId, owner: this.userId });
});

