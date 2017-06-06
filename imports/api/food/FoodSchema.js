import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const EventsSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  title: { type: String, optional: true },
  price: { type: Number, optional: true },

  createdBy: { type: String, optional: true },
});