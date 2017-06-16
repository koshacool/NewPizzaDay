import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';

import { handleResult, ucFirst, valueInArray } from '../../../utils/client-utils';
import { createUserGroup } from '../../../api/userGroups/methods';
import { updateEvent } from '../../../api/events/methods';

import UserItem from './UserItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';
import ModalsManagerContainer from '../ModalsManager/Containers/ModalsManagerContainer';


class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modalParams: null,
        };

        this.onAvailableToggle = this.onAvailableToggle.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.modalEditGroup = this.modalEditGroup.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        this.setState({
            modal: false,
        });
    }

    showModal(name) {
      return (modalParams = null) =>  this.setState({
            modal: ucFirst(name),
            modalParams,
        });
    }


    modalGroupsList() {
        return (<ModalsManagerContainer
            modalName={this.state.modal}
            hideModal={this.hideModal}
            modalDescription="Your Groups"
            event={this.props.event}
            editGroup={this.showModal('editGroup')}
        />);
    }

    modalEditGroup(groupId) {
         return (<ModalsManagerContainer
             modalName={this.state.modal}
             hideModal={this.hideModal}
             modalDescription="Edit Group"
             event={this.props.event}
             groupId={groupId}
             users={this.props.users}
             modal={true}
         />);
    }

    createGroup() {
        createUserGroup.call({ group: {} }, handleResult((groupId) => {
            this.showModal('editGroup')(groupId);
        }));
    }

    onAvailableToggle(userId, isChecked) {
        const {event} = this.props;
        let usersArray = event.users;

        if (isChecked) {
            usersArray.push(userId);
        } else {
            usersArray.splice(usersArray.indexOf(userId), 1);
        }

        const updatedEvent = {
            _id: event._id,
            partToUpdate: {users: usersArray},
        };

        updateEvent.call(updatedEvent, handleResult());
    }

    render() {
        const { loading, event, users } = this.props;
        const { modal, modalParams } = this.state;
        
        return (
            <Spinner loading={loading}>
                <Row className="m-b-20">
                    <Col >                        
                        <Button raised primary label="NEW GROUP" onClick={this.createGroup}/>
                        <Button raised primary label="GROUPS" onClick={this.showModal('groupsList')}/>
                    </Col>
                </Row>
                <Divider />
                <Row center="xs">
                    <Col xs={12} md={12} sm={12}>
                        {!loading && users.length === 0 && <NoItems text="Nobody registered"/>}

                        <List>
                            { !loading && users.length > 1 &&  <Subheader primaryText="Users list" primary/> }
                            <Divider />
                            {users.length > 1 && users.map(user => (
                                user._id === Meteor.userId() ?
                                '' :
                                <UserItem
                                    key={user._id}
                                    user={user}
                                    onAvailableToggle={this.onAvailableToggle}
                                    checked={valueInArray(event.users, user._id)}
                                />

                            ))}
                        </List>

                    </Col>
                </Row>
                
                {modal && this[`modal${modal}`](modalParams)}
            </Spinner>
        );
    }
}

UsersList.propTypes = {
    loading: PropTypes.bool.isRequired,
    event: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    onUnmount: PropTypes.func.isRequired,
};

export default UsersList;