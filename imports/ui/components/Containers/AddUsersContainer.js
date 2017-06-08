import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import UsersList from '../Users/UsersList';
import { UserGroups } from '../../../api/userGroups/userGroups';

export default createContainer(({event}) => {
  const subsHandler1 = Meteor.subscribe('users.list');
  const subsHandler2 = Meteor.subscribe('userGroups.currentUser');
  
  return {
    event,
    users: Meteor.users.find({}, { sort: { username: 1 } }).fetch(),
    groups: UserGroups.find({}, { sort: { name: 1 } }).fetch(),
    loading: !subsHandler1.ready() || !subsHandler2.ready(),
    onUnmount: () => {
    	subsHandler1.stop();
    	subsHandler2.stop();
    },
  };
}, UsersList);