import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Orders } from '../../../api/orders/orders';
import Order from '../Orders/Order';



export default createContainer(({ eventId }) => {
  const subsHandler = Meteor.subscribe('order.byEventId', eventId);
  
  return {
    order: Orders.findOne({_id: eventId}),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
  };
}, Order);