import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Confirm from '../Confirm';

export default createContainer(({ props: { hideModal, onConfirm } }) => {
  return {
    hideModal,
    onConfirm
  };
}, Confirm);