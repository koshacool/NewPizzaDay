import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';

import ModalsManagerContainer from '../ModalsManagerContainer';

import { handleResult, valueInArray, ucFirst } from '../../../../utils/client-utils';
import { updateGroup, removeGroup } from '../../../../api/userGroups/methods';
import EditGroupInfo from './EditGroupInfo';
import UserItem from '../../Users/UserItem';
import Spinner from '../../Spinner';

/**
 * Class display window for edit group
 */
class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalParams: null,
        };

        this.onGroupUpdate = this.onGroupUpdate.bind(this);
        this.onGroupRemove = this.onGroupRemove.bind(this);
        this.onUserAvailableToggle = this.onUserAvailableToggle.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    componentDidUpdate(prevProps, prevState) {
        //Change manualy modal windows style, becouse
        //react-md dialogs auto change style
        if (!prevState.modal) {
            document.getElementById('EditUserGroup').style.top = "50%";
        }
    }

    /**
     * Hide modal window whis open in this component
     * @return {void}
     */
    hideModal() {
        this.setState({
            modal: false,
        });
    }

    /**
     * Show modal window by name
     *
     * @param {string} name
     * @returns {Function}
     */
    showModal(name) {
        return (modalParams = null) => {
            this.setState({
                modal: ucFirst(name),
                modalParams,
            });

        }
    }

    /**
     * Display modal window to confirm remove this group
     * @returns {XML}
     */
    modalConfirm() {
        return (<ModalsManagerContainer
            modalName={this.state.modal}
            hideModal={this.hideModal}
            modalDescription="Are you sure?"
            onConfirm={this.onGroupRemove}
            modal={true}
        />);
    }

    /**
     * Update group by field and value in this field
     *
     * @param {string} field
     * @returns {Function}
     */
    onGroupUpdate(field) {
        return (value) => {
            const updatedGroup = {
                _id: this.props.groupId,
                partToUpdate: {[field]: value},
            };

            updateGroup.call(updatedGroup, handleResult());
        };
    }

    /**
     * Remove group
     *
     * @return {void}
     */
    onGroupRemove() {
        const {groupId, hideModal} = this.props;

        removeGroup.call({_id: groupId}, handleResult(() => {
            hideModal();
        }));
    }

    /**
     * Add or remove user in this group
     * @param {string} userId
     *
     * @return [void}
     */
    onUserAvailableToggle(userId) {
        const {group} = this.props;
        let usersArray = group.users;

        const userPosition = usersArray.indexOf(userId);
        if (userPosition === -1) {
            usersArray.push(userId);
        } else {
            usersArray.splice(userPosition, 1);
        }

        const updatedGroup = {
            _id: this.props.group._id,
            partToUpdate: {users: usersArray},
        };

        updateGroup.call(updatedGroup, handleResult());
    }

    render() {
        const { loading, hideModal, group, users } = this.props;
        const { modal, modalParams } = this.state;

        return (
            <Spinner loading={loading}>
                {group && <div>
                    <EditGroupInfo
                        group={group}
                        onGroupUpdate={this.onGroupUpdate}
                        onGroupRemove={this.showModal('confirm')}
                    />

                    < Button raised primary label="Close" className="md-cell--middle" onClick={hideModal}/>
                    <Divider />

                    <List>
                        <Subheader primaryText="Users list" primary/>

                        {users.length > 1 && users.map(user => (
                            user._id === Meteor.userId() ?
                                '' :
                                <UserItem
                                    key={user._id}
                                    user={user}
                                    onAvailableToggle={this.onUserAvailableToggle}
                                    checked={valueInArray(group.users, user._id)}
                                />
                        ))}
                    </List>
                </div> }

                {modal && this[`modal${modal}`](modalParams)}
            </Spinner>

        )
    }
}

EditGroup.propTypes = {
    hideModal: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
};

export default EditGroup;
