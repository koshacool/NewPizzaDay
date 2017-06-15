import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events/events';
import EditEvent from './EditEvent';


export default createContainer(({eventId, children}) => {
  const subsHandler = Meteor.subscribe('events.byId', eventId);
  
  return {
    event: Events.findOne({_id: eventId}),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
  };
}, EditEvent);