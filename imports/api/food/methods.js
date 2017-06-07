
import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Food } from './food';
import { FoodSchema } from './FoodSchema';


export const createFood = new ValidatedMethod({
  name: 'Food.create',
  validate: new SimpleSchema({
    foodItem: { type: FoodSchema },
  }).validator(),

  run({ foodItem }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t create a new menu item');
    }

    const defaultEvent = {
      description: 'No discription',
      name: 'No nema',
      price: 0,
      createdBy: userId,
    };

    const foodToAdd = { ...defaultEvent, ...foodItem };
    
    return Food.insert(foodToAdd);
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


