import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FoodSchema = new SimpleSchema({
  _id: { type: String, optional: true,},
  name: { type: String, min: 1 },
  price: { type: String, label: 'Bad price' },

  description: { type: String, optional: true },
  createdBy: { type: String, optional: true },
});