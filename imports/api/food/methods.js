
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