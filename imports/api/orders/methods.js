import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Orders } from './orders';
import { OrderSchema } from './OrderSchema';

export const createOrder = new ValidatedMethod({
  name: 'Order.create',
  validate: new SimpleSchema({
    order: { type: OrderSchema },
  }).validator(),

  run({ order }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t create a new order');
    }

    const defaultOrder = {
      eventId: null,
      owner: userId,  
      food: [],
      quantity: {},
      status: false,    
    };

    const orderToAdd = { ...defaultOrder, ...order };
    // Person.update( { name : 'Ted' }, { name : 'Ted', age : 50 }, { upsert : true }, callback );
    return Orders.insert(orderToAdd);
  },
});

export const removeOrder = new ValidatedMethod({
  name: 'Orders.remove',
  validate: new SimpleSchema({
    eventId: { type: String },
  }).validator(),

  run({ eventId }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t create a new order');
    }

    return Orders.remove({ eventId: eventId });
  },
});


export const updateOrder = new ValidatedMethod({
  name: 'Orders.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: OrderSchema.pick([
      'eventId', 
      'food', 
      'food.$', 
      'quantity',
      'status'
      ]) },
  }).validator(),

  run({ _id, partToUpdate }) {
     const order = Orders.findOne({ _id, owner: this.userId });

    if (!order) {
      throw new Meteor.Error('You can\'t edit this order');
    }

    return Orders.update({ _id }, { $set: partToUpdate });
  },
});