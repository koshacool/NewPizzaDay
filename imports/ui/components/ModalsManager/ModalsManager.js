import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

import ConfirmContainer from './Containers/ConfirmContainer';
import CreateFoodContainer from './Containers/CreateFoodContainer';
import UserGroupContainer from './Containers/UserGroupContainer';
import GroupsListContainer from './Containers/GroupsListContainer';

const ModalsList = {
    Confirm: (props) => (<ConfirmContainer props={props} />),
    CreateFood: (props) => (<CreateFoodContainer props={props} />),
    UserGroup: (props) => (<UserGroupContainer props={props} />),
    GroupsList: (props) => (<GroupsListContainer props={props} />),
};

class ModalsManager extends PureComponent {
    constructor(props) {
        super(props);

        //this.state = { visible: !!props.modal };
    }

    render() {
        const { modalName } = this.props;
        return  ModalsList[modalName](this.props);
    }
}

ModalsManager.propTypes = {
    modalName: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
    otherProps: PropTypes.object.isRequired,
};

export default ModalsManager;