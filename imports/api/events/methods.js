import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Events } from './events';
import { EventsSchema } from './EventsSchema';


export const createEvent = new ValidatedMethod({
  name: 'Events.create',
  validate: new SimpleSchema({
    event: { type: EventsSchema },
  }).validator(),

  run({ event }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t create a new event');
    }

    const defaultEvent = {
      title: 'no name',
      status: 'ordering',
      createdBy: userId,
      createdAt: new Date(),
      endAT: new Date(),

      users:[Meteor.userId()],
      food: [],
      discount: {},
    };

    const eventToAdd = { ...defaultEvent, ...event };

    return Events.insert(eventToAdd);
  },
});


export const updateEvent = new ValidatedMethod({
  name: 'Events.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: EventsSchema.pick([
      'title', 
      'status', 
      'food', 
      'food.$', 
      'discount', 
      'discount.$',
      'users', 
      'users.$',
      ]) },
  }).validator(),

  run({ _id, partToUpdate }) {
    const event = Events.findOne({ _id, createdBy: this.userId });

    if (!event) {
      throw new Meteor.Error('You can\'t edit this event');
    }

    return Events.update({ _id }, { $set: partToUpdate });
  },
});


export const removeEvent = new ValidatedMethod({
  name: 'Events.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const event = Events.findOne({ _id, createdBy: this.userId });

    if (!event) {
      throw new Meteor.Error('You can\'t remove this event');
    }

    return Events.remove({ _id });
  },
});

export const updateEventRemoveUsers = new ValidatedMethod({
  name: 'Events.updateRemoveUsers',
  validate: new SimpleSchema({
    _id: { type: String },
    users: { type: [String] },
  }).validator(),

  run({ _id, users }) {
    const event = Events.findOne({ _id, createdBy: this.userId });

    if (!event) {
      throw new Meteor.Error('You can\'t edit this event');
    }
    
    return Events.update({ _id }, { $pullAll: { users: users } });
  },
});


export const updateEventAddUsers = new ValidatedMethod({
  name: 'Events.updateAddUsers',
  validate: new SimpleSchema({
    _id: { type: String },
    users: { type: [String] },
  }).validator(),

  run({ _id, users }) {
    const event = Events.findOne({ _id, createdBy: this.userId });

    if (!event) {
      throw new Meteor.Error('You can\'t edit this event');
    }
    
    return Events.update({ _id }, { $addToSet: { users: { $each: users }  }  });
  },
});

export const updateEventRemoveFood = new ValidatedMethod({
  name: 'Events.updateRemoveFood',
  validate: new SimpleSchema({
    _id: { type: String },
    food: { type: [String] },
  }).validator(),

  run({ _id, food }) {
    const event = Events.findOne({ _id, createdBy: this.userId });

    if (!event) {
      throw new Meteor.Error('You can\'t edit this event');
    }
    
    return Events.update({ _id }, { $pullAll: { food: food } });
  },
});


export const updateEventAddFood = new ValidatedMethod({
  name: 'Events.updateAddFood',
  validate: new SimpleSchema({
    _id: { type: String },
    food: { type: [String] },
  }).validator(),

  run({ _id, food }) {
    const event = Events.findOne({ _id, createdBy: this.userId });

    if (!event) {
      throw new Meteor.Error('You can\'t edit this event');
    }
    
    return Events.update({ _id }, { $addToSet: { food: { $each: food }  }  });
  },
});

export const changeEventStatus = new ValidatedMethod({
  name: 'Events.changeStatus',
  validate: new SimpleSchema({
    _id: { type: String },
    status: { type: String },
  }).validator(),

  run({ _id, status }) {
    const event = Events.findOne({ _id });

    if (!event || !this.userId) {
      throw new Meteor.Error('You can\'t edit this event');
    }

    return Events.update({ _id }, { $set: { status } });
  },
});