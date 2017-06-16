import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

import ConfirmContainer from './Containers/ConfirmContainer';
import CreateFoodContainer from './Containers/CreateFoodContainer';
import UserGroupContainer from './Containers/UserGroupContainer';
import GroupsListContainer from './Containers/GroupsListContainer';

const ModalComponents = {
    Confirm:    ConfirmContainer,
    CreateFood: CreateFoodContainer,
    UserGroup:  UserGroupContainer,
    GroupsList: GroupsListContainer,
};

const customStyles = {
    width: 'auto',
    overflow: 'auto',
};

class ModalsManager extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {visible: true};
        this.closeDialog = this.closeDialog.bind(this);
    }

    closeDialog() {
        this.setState({visible: false});
        this.props.hideModal();
    };

    render() {
        const { modalName, modalDescription } = this.props;
        const ModalComponent = ModalComponents[modalName];

        return (
            <Dialog
                id="modalDialog"
                dialogStyle={customStyles}
                visible={this.state.visible}
                title={modalDescription}
                onHide={this.closeDialog}
            >
                <ModalComponent props={this.props}/>
            </Dialog>
        )
    }
}

ModalsManager.propTypes = {
    modalName: PropTypes.string.isRequired,
    modalDescription: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
    otherProps: PropTypes.object.isRequired,
};

export default ModalsManager;