import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Food } from '../../../api/food/food';
import OrderFoodList from '../Food/OrderFoodList';


export default createContainer(({event, order}) => {
  const subsHandler = Meteor.subscribe('food.userList');
  
  return {
  	loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
    event,
    order,
    food: Food.find({}, { sort: { createdAt: -1 } }).fetch(),
    
  };
}, OrderFoodList);