import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

import ConfirmContainer from './Containers/ConfirmContainer';
import CreateFoodContainer from './Containers/CreateFoodContainer';

import EditUserGroupContainer from './Containers/EditUserGroupContainer';
import UserGroupsListContainer from './Containers/UserGroupsListContainer';

import EditFoodGroupContainer from './Containers/EditFoodGroupContainer';

const ModalComponents = {
    Confirm:    ConfirmContainer,
    CreateFood: CreateFoodContainer,
    EditUserGroup:  EditUserGroupContainer,
    UserGroupsList: UserGroupsListContainer,
    EditFoodGroup:  EditFoodGroupContainer,
};

const customStyles = {
    width: 'auto',
    overflow: 'auto',
    top: '50%',
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
    }

    render() {
        const { modalName, modalDescription, modal } = this.props;
        const ModalComponent = ModalComponents[modalName];

        return (
            <Dialog
                id={modalName}
                dialogStyle={customStyles}
                visible={this.state.visible}
                title={modalDescription}
                onHide={this.closeDialog}
                modal={modal ? true : false}
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
    modal: PropTypes.bool,
    otherProps: PropTypes.object.isRequired,

};

export default ModalsManager;