
import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { FoodGroups } from './foodGroups';
import { GroupSchema } from './GroupSchema';


export const createFoodGroup = new ValidatedMethod({
  name: 'FoodGroups.create',
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
      food: [],
      events: [],
    };

    const groupToAdd = { ...defaultGroup, ...group };

    return FoodGroups.insert(groupToAdd);
  },
});


 export const updateGroup = new ValidatedMethod({
   name: 'FoodGroups.update',
   validate: new SimpleSchema({
     _id: { type: String },
     partToUpdate: { type: GroupSchema.pick(['name', 'events', 'events.$', 'food', 'food.$']) },
   }).validator(),

   run({ _id, partToUpdate }) {
     const group = FoodGroups.findOne({ _id, createdBy: this.userId });

     if (!group) {
       throw new Meteor.Error('You can\'t edit this group');
     }

     return FoodGroups.update({ _id }, { $set: partToUpdate });
   },
 });


 export const removeGroup = new ValidatedMethod({
   name: 'FoodGroups.remove',
   validate: new SimpleSchema({
     _id: { type: String },
   }).validator(),

   run({ _id }) {
     const group = FoodGroups.findOne({ _id, createdBy: this.userId });

     if (!group) {
       throw new Meteor.Error('You can\'t remove this group');
     }

     return FoodGroups.remove({ _id });
   },
 });


export const findByIdGroup = new ValidatedMethod({
  name: 'FoodGroups.findById',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const group = FoodGroups.findOne({ _id, createdBy: this.userId });

    if (!group) {
      throw new Meteor.Error('You can\'t remove this group');
    }

    return group;
  },
});

