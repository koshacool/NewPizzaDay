import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import Dialog from 'react-md/lib/Dialogs';


const Confirm = ({hideModal}) => {

  return (
      <Dialog
          id="speedBoost"
          visible={true}
          title="Are you sure you want to remove this event?"
          aria-labelledby="speedBoostDescription"
          modal
          actions={[{
            onClick: hideModal,
            primary: true,
            label: 'Yes',
          }, {
            onClick: hideModal,
            primary: true,
            label: 'Now',
          }]}
      >
      </Dialog>
  );
};


Confirm.propTypes = {
  hideModal: PropTypes.func.isRequired,
};


export default Confirm;
