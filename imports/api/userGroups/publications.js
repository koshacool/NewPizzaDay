import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UserGroups } from './userGroups';


Meteor.publish('userGroups.currentUser', function userGroupsCurrentUser() {
    if (!this.userId) {
        return this.ready();
    }

    return UserGroups.find();
});

Meteor.publish('userGroups.byId', function userGroupsById(groupId) {
    check(groupId, String);
    if (!this.userId) {
        return this.ready();
    }

    return UserGroups.find({_id: groupId});
});



