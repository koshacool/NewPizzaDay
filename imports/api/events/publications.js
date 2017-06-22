import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Events } from './events';


Meteor.publish('events.currentUser', function eventsCurrentUser() {
    if (!this.userId) {
        return this.ready();
    }

    return Events.find({createdBy: this.userId});
});


Meteor.publish('events.public', function eventsPublic() {
    if (!this.userId) {
        return this.ready();
    }

    //Get all available events, not created by logged user
    return Events.find({ users: { $all: [this.userId] }, createdBy: { $ne: this.userId } });
});

Meteor.publish('events.byId', function eventsById(eventId) {
    check(eventId, String);
    if (!this.userId) {
        return this.ready();
    }

    return Events.find({_id: eventId});
});