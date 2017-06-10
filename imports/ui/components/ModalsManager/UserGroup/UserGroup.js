import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';

import { handleResult } from '../../../../utils/client-utils';
import { updateGroup, removeGroup } from '../../../../api/userGroups/methods';
import UserGroupInfo from './UserGroupInfo';
import UserItem from '../../Users/UserItem';
import Spinner from '../../Spinner';

const getFieldValue = form => field => form[field].value || '';
const checkEvailable = (arr, value) => arr.indexOf(value) !== -1;

class UserGroup extends Component {
    constructor(props) {
        super(props);

        this.onGroupUpdate = this.onGroupUpdate.bind(this);
        this.onGroupRemove = this.onGroupRemove.bind(this);
        this.onUserAvailableToggle = this.onUserAvailableToggle.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    onGroupUpdate(field) {
        return (value) => {
            const updatedGroup = {
                _id: this.props.groupId,
                partToUpdate: {[field]: value},
            };

            updateGroup.call(updatedGroup, handleResult());
        };
    }

    onGroupRemove() {
        const {groupId, hideModal} = this.props;

        removeGroup.call({_id: groupId}, handleResult(() => {
            hideModal();
        }));
    }

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

        return (            
                <Spinner loading={loading}>
                    {group && <div>
                        <UserGroupInfo
                            group={group}
                            onGroupUpdate={this.onGroupUpdate}
                            onGroupRemove={this.onGroupRemove}
                        />

                        < Button raised primary label="Close" className="md-cell--middle" onClick={hideModal}/>
                        <Divider />

                        <List>
                            {users.length > 1 && users.map(user => (
                                user._id === Meteor.userId() ?
                                    '' :
                                    <UserItem
                                        key={user._id}
                                        user={user}
                                        onAvailableToggle={this.onUserAvailableToggle}
                                        checked={checkEvailable(group.users, user._id)}
                                    />
                            ))}
                        </List>
                    </div> }
                </Spinner>          

        )
    }
}

UserGroup.propTypes = {
    hideModal: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
};

export default UserGroup;