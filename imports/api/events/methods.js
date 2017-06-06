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

      users:[],
      food: [],
      discount: {},
    };

    const eventToAdd = { ...defaultEvent, ...event };

    return Events.insert(eventToAdd);
  },
});


/*export const updatePoll = new ValidatedMethod({
  name: 'Polls.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: PollsSchema.pick(['title', 'isPublic']) },
  }).validator(),

  run({ _id, partToUpdate }) {
    const poll = Polls.findOne({ _id, createdBy: this.userId });

    if (!poll) {
      throw new Meteor.Error('You can\'t edit this poll');
    }

    return Polls.update({ _id }, { $set: partToUpdate });
  },
});*/

