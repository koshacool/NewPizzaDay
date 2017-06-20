import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import OrderFoodList from './OrderFoodList';


export default createContainer(({event, order, onSubmit}) => {
  const subsHandler = Meteor.subscribe('food.userList');
  
  return {
  	loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
    event,
    order,
    onSubmit,
  };
}, OrderFoodList);