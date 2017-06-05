import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Events } from './events';


Meteor.publish('events.currentUser', function pollsCurrentUser() {
  if (!this.userId) {
    return this.ready();
  }

  return Events.find({ createdBy: this.userId });
});


Meteor.publish('events.isPublic', function pollsPublic() {
  if (!this.userId) {
    return this.ready();
  }

  return Events.find({ users: { $all: [this.userId] } });
});