import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.current', function usersCurrent() {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(
  	{ _id: this.userId }, 
  	{ fields: { emails: 1, username: 1 } }
  );
});

Meteor.publish('users.list', function usersList() {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(
  	{ }, 
  	{ fields: { emails: 1, username: 1 } }
  );
});

Meteor.publish('users.byArrayId', function usersByArrayId(arrayId) {
  check(arrayId, Array);

  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(
      { _id: { $in: arrayId } },
      { fields: { emails: 1, username: 1 } }
  );
});
