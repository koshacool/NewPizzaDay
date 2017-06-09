
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
      name: 'No name',
      createdBy: userId,
      users: [],
      events: [],
    };

    const groupToAdd = { ...defaultGroup, ...group };

    return UserGroups.insert(groupToAdd);
  },
});


 export const updateGroup = new ValidatedMethod({
   name: 'UserGroups.update',
   validate: new SimpleSchema({
     _id: { type: String },
     partToUpdate: { type: GroupSchema.pick(['name', 'events', 'events.$', 'users', 'users.$']) },
   }).validator(),

   run({ _id, partToUpdate }) {
     const group = UserGroups.findOne({ _id, createdBy: this.userId });

     if (!group) {
       throw new Meteor.Error('You can\'t edit this group');
     }

     return UserGroups.update({ _id }, { $set: partToUpdate });
   },
 });


 export const removeGroup = new ValidatedMethod({
   name: 'UserGroups.remove',
   validate: new SimpleSchema({
     _id: { type: String },
   }).validator(),

   run({ _id }) {
     const group = UserGroups.findOne({ _id, createdBy: this.userId });

     if (!group) {
       throw new Meteor.Error('You can\'t remove this group');
     }

     return UserGroups.remove({ _id });
   },
 });


export const findByIdGroup = new ValidatedMethod({
  name: 'UserGroups.findById',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const group = UserGroups.findOne({ _id, createdBy: this.userId });

    if (!group) {
      throw new Meteor.Error('You can\'t remove this group');
    }

    return group;
  },
});

