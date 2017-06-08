import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UserGroups } from './userGroups';


Meteor.publish('userGroups.currentUser', function eventsCurrentUser() {
    if (!this.userId) {
        return this.ready();
    }

    return UserGroups.find({createdBy: this.userId});
});

