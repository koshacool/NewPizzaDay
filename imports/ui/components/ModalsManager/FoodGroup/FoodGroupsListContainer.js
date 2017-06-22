import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { FoodGroups } from '../../../../api/foodGroups/foodGroups';
import GroupsList from './GroupsList';



export default createContainer(({props: {hideModal, event, editGroup}}) => {
  const subsHandler = Meteor.subscribe('foodGroups.currentUser');

  return {
    hideModal,
    event,
    editGroup,
    groups: FoodGroups.find().fetch(),
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,    
  };
}, GroupsList);