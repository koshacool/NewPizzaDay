import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { UserGroups } from '../../../../api/userGroups/userGroups';
import EditGroup from './EditGroup';



export default createContainer(({props: {hideModal, users, groupId}}) => {
  const subsHandler = Meteor.subscribe('userGroups.byId', groupId);

  return {
    hideModal,
    users,
    groupId,
    group: UserGroups.findOne({_id: groupId}),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
  };
}, EditGroup);