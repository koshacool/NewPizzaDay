import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ModalsManager from '../ModalsManager';


export default createContainer(({modalName, hideModal, modalDescription, ...otherProps}) => {

  return {
    modalName,
    hideModal,
    modalDescription,
    otherProps,
  };
}, ModalsManager);