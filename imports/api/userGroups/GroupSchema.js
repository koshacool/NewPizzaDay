import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const GroupSchema = new SimpleSchema({
  _id: { type: String, optional: true,},
  name: { type: String, optional: true  },
  createdBy: { type: String, optional: true },

  users: { type: [String], optional: true },
  events: { type: [String], optional: true },
});