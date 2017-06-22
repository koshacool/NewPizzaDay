import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Food } from '../../../../api/food/food';
import EditFood from '../EditFood';


export default createContainer(({props: { hideModal, foodItem } }) => {
  return {
    hideModal,
    foodItem,
  };
}, EditFood);