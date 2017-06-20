import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import OrderFoodList from './OrderFoodList';


export default createContainer(({event, order, food, onSubmit}) => {
  
  return {
    event,
    order,
    food,
    onSubmit,
  };
}, OrderFoodList);