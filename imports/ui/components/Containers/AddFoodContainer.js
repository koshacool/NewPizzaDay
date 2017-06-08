import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Food } from '../../../api/food/food';
import FoodList from '../Food/FoodList';


export default createContainer(({event}) => {
  const subsHandler = Meteor.subscribe('food.userList');
  
  return {
    event,
    food: Food.find({}, { sort: { createdAt: -1 } }).fetch(),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
  };
}, FoodList);