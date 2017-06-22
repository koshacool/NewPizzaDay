import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
 * Fields name to get from user collection
 *
 * @type {{fields: {emails: number, username: number, avatar: number}}}
 */
const fieldsToGet = {
    fields: {
        emails: 1,
        username: 1,
        avatar: 1,
    }
};


Meteor.publish('users.current', function usersCurrent() {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find(
        {_id: this.userId},
        fieldsToGet
    );
});

Meteor.publish('users.list', function usersList() {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find(
        {},
        fieldsToGet
    );
});

Meteor.publish('users.byArrayId', function usersByArrayId(arrayId) {
    check(arrayId, Array);

    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find(
        {_id: {$in: arrayId}},
        fieldsToGet
    );
});
