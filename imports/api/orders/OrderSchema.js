import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const OrderSchema = new SimpleSchema({
  _id:      { type: String, optional: true, },
  eventId:  { type: String, optional: true, },
  owner:   { type: String, optional: true, },
  food:   { type: [String], optional: true, },
  quantity: { type: Object, optional: true, blackbox: true },
  status:   { type: Boolean, optional: true, },
});