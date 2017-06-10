import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Orders } from './orders';


Meteor.publish('orders.byEventId', function eventsCurrentUser(eventId) {
	check(eventId, String);
    if (!this.userId) {
        return this.ready();
    }

    return Orders.find({eventId: eventId});
});

