import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { FoodGroups } from '../../../../api/foodGroups/foodGroups';
import EditGroup from '../FoodGroup/EditGroup';



export default createContainer(({props: {hideModal, food, groupId}}) => {
  const subsHandler = Meteor.subscribe('foodGroups.byId', groupId);
 
  return {
    hideModal,
    food,
    groupId,
    group: FoodGroups.findOne({_id: groupId}),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
  };
}, EditGroup);