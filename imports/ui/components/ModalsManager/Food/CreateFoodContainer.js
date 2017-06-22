import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CreateFood from './CreateFood';


export default createContainer(({props: {hideModal}}) => {
  return {
    hideModal,
  };
}, CreateFood);