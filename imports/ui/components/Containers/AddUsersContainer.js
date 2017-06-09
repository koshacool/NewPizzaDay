import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import UsersList from '../Users/UsersList';
import { UserGroups } from '../../../api/userGroups/userGroups';

export default createContainer(({event}) => {
  const subsHandler = Meteor.subscribe('users.list');
  
  return {
    event,
    users: Meteor.users.find({}, { sort: { username: 1 } }).fetch(),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
  };
}, UsersList);