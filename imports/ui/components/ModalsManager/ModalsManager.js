import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

export default class ModalsManager extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: !!props.modal };
  }



  render() {
    const { visible } = this.state;
    const { onConfirm, hideModal } = this.props;

    return (
      <div>
        <Dialog
          id="speedBoost"
          visible={visible}
          title="Are you sure you want to remove this event?"
          onHide={hideModal}
          aria-labelledby="speedBoostDescription"
          actions={[{
            onClick: onConfirm,
            primary: true,
            label: 'Yes',
          }, {
            onClick: hideModal,
            primary: true,
            label: 'No',
          }]}
        >
        </Dialog>
      </div>
    );
  }
}