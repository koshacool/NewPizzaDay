import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { FoodGroups } from './foodGroups';


Meteor.publish('foodGroups.currentUser', function foodGroupsCurrentUser() {
    if (!this.userId) {
        return this.ready();
    }

    return FoodGroups.find({createdBy: this.userId});
});

Meteor.publish('foodGroups.byId', function foodGroupsById(groupId) {
    check(groupId, String);
    if (!this.userId) {
        return this.ready();
    }

    return FoodGroups.find({_id: groupId, createdBy: this.userId});
});



