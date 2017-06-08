import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const EventsSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  title: { type: String, optional: true },
  status: { type: String, optional: true },

  createdAt: { type: Date, optional: true },
  endAt: { type: Date, optional: true },

  createdBy: { type: String, optional: true },

  users: { type: [String], optional: true },
  food: { type: [String], optional: true },
  discount: { type: Object, optional: true, blackbox: true },
});