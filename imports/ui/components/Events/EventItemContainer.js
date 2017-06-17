import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Orders } from '../../../api/orders/orders';
import EventItem from './EventItem';


export default createContainer(({ event }) => {
  const subsHandler = Meteor.subscribe('orders.byEventId', event._id);
  
  return {
  	event,
    loading: !subsHandler.ready(),
    orders: Orders.find({eventId: event._id}).fetch(),
    onUnmount: subsHandler.stop,
  };
}, EventItem);
