import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events/events';
import EventsList from '../Events/EventsList';


export default createContainer(() => {
  const subsHandler = Meteor.subscribe('events.currentUser');
  
  return {
    loading: !subsHandler.ready(),
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
    onUnmount: subsHandler.stop,
  };
}, EventsList);
