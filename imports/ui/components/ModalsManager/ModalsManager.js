import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

import ConfirmContainer from './Containers/ConfirmContainer';

import CreateFoodContainer from './Containers/CreateFoodContainer';
import EditFoodContainer from './Containers/EditFoodContainer';

import EditUserGroupContainer from './Containers/EditUserGroupContainer';
import UserGroupsListContainer from './Containers/UserGroupsListContainer';

import EditFoodGroupContainer from './Containers/EditFoodGroupContainer';
import FoodGroupsListContainer from './Containers/FoodGroupsListContainer';

/**
 * Object with modal components names
 *
 * @type {object}
 */
const ModalComponents = {
    Confirm:        ConfirmContainer,
    CreateFood:     CreateFoodContainer,
    EditFood:       EditFoodContainer,
    EditUserGroup:  EditUserGroupContainer,
    UserGroupsList: UserGroupsListContainer,
    EditFoodGroup:  EditFoodGroupContainer,
    FoodGroupsList: FoodGroupsListContainer,
};

/**
 * Style for modal windows
 * @type {object}
 */
const customStyles = {
    width: 'auto',
    overflow: 'auto',
    top: '50%',
};

/**
 * Class for display modal windows
 */
class ModalsManager extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {visible: true};
        this.closeDialog = this.closeDialog.bind(this);
    }

    /**
     * Hide modal window
     * @return {void}
     */
    closeDialog() {
        this.setState({visible: false});
        this.props.hideModal();
    }

    render() {
        const { modalName, modalDescription, modal } = this.props;
        const ModalComponent = ModalComponents[modalName];//Get component from object by name

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