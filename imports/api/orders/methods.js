
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
      order: {},      
    };

    const orderToAdd = { ...defaultOrder, ...order };
    
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