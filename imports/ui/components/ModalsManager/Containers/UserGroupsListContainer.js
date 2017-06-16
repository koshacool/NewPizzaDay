import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { UserGroups } from '../../../../api/userGroups/userGroups';
import GroupsList from '../UserGroup/GroupsList';



export default createContainer(({props: {hideModal, event, editGroup}}) => {
  const subsHandler = Meteor.subscribe('userGroups.currentUser');

  return {
    hideModal,
    event,
    editGroup,
    groups: UserGroups.find().fetch(),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,    
  };
}, GroupsList);