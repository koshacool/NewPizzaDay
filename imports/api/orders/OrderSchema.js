import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const OrderSchema = new SimpleSchema({
  _id: { type: String, optional: true,},
  eventId: { type: String, optional: true, },
  order: { type: Object, optional: true, blackbox: true },
});