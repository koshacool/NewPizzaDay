import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import Dialog from 'react-md/lib/Dialogs';


const Confirm = ({question, onConfirm, onReject, visible, closeDialog}) => {

  return (
      <Dialog
          id="speedBoost"
          visible={visible}
          title="Are you sure you want to remove this event?"
          onHide={this.closeDialog}
          aria-labelledby="speedBoostDescription"
          modal
          actions={[{
            onClick: this.closeDialog,
            primary: true,
            label: 'Yes',
          }, {
            onClick: this.closeDialog,
            primary: true,
            label: 'Now',
          }]}
      >
      </Dialog>
  );
};





EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};


export default EventItem;
