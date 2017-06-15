import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Food } from '../../../api/food/food';
import OrderFoodList from './OrderFoodList';


export default createContainer(({event, order, onSubmit}) => {
  const subsHandler = Meteor.subscribe('food.userList');
  
  return {
  	loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
    event,
    order,
    onSubmit,
    food: Food.find({}, { sort: { createdAt: -1 } }).fetch(),
    
  };
}, OrderFoodList);