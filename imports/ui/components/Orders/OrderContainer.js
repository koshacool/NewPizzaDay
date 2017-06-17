import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events/events';
import { Orders } from '../../../api/orders/orders';
import Order from './Order';


export default createContainer(({ eventId }) => {
  const subsHandler1 = Meteor.subscribe('orders.byEventId', eventId);
  const subsHandler2 = Meteor.subscribe('orders.currentUserByEventId', eventId);
  const subsHandler3 = Meteor.subscribe('events.byId', eventId);
  
  return {
    eventId,
    orders: Orders.find({eventId: eventId}).fetch(),
    currentUserOrder: Orders.findOne({eventId: eventId}),
    event: Events.findOne({_id: eventId}),
    loading: !subsHandler1.ready() || 
             !subsHandler2.ready() ||
             !subsHandler3.ready(),
    onUnmount: () => {
    	subsHandler1.stop();
    	subsHandler2.stop();
      subsHandler3.stop();
    },
  };
}, Order);