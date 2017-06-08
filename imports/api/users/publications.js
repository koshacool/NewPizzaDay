import { Meteor } from 'meteor/meteor';


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
  	{ fields: { username: 1 } }
  );
});
