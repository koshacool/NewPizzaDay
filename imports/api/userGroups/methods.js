
import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UserGroups } from './userGroups';
import { GroupSchema } from './GroupSchema';


export const createUserGroup = new ValidatedMethod({
  name: 'UserGroups.create',
  validate: new SimpleSchema({
    group: { type: GroupSchema },
  }).validator(),

  run({ group }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t create a new group');
    }

    const defaultGroup = {
      name: 'No nema',
      createdBy: userId,
      users: [],
      event: [],
    };

    const groupToAdd = { ...defaultGroup, ...group };
    
    return UserGroups.insert(groupToAdd);
  },
});


// export const updateEvent = new ValidatedMethod({
//   name: 'Events.update',
//   validate: new SimpleSchema({
//     _id: { type: String },
//     partToUpdate: { type: EventsSchema.pick(['title', 'status']) },
//   }).validator(),

//   run({ _id, partToUpdate }) {
//     const event = Events.findOne({ _id, createdBy: this.userId });

//     if (!event) {
//       throw new Meteor.Error('You can\'t edit this event');
//     }

//     return Events.update({ _id }, { $set: partToUpdate });
//   },
// });


// export const removeEvent = new ValidatedMethod({
//   name: 'Events.remove',
//   validate: new SimpleSchema({
//     _id: { type: String },
//   }).validator(),

//   run({ _id }) {
//     const event = Events.findOne({ _id, createdBy: this.userId });

//     if (!event) {
//       throw new Meteor.Error('You can\'t remove this event');
//     }

//     //Orders.find({ eventId: _id }).forEach((order) => {
//     //  Meteor.call('Orders.remove', { _id: order._id });
//     //});

//     return Events.remove({ _id });
//   },
// });


