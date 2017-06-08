import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';

import { handleResult } from '../../../utils/client-utils';
import { createUserGroup } from '../../../api/userGroups/methods';

import UserItem from './UserItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';
import ModalsManagerContainer from '../ModalsManager/Containers/ModalsManagerContainer';

import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';

const ucFirst = str => str[0].toUpperCase() + str.slice(1);
const checkEvailable = (arr, value) => arr.indexOf(value) !== -1;


class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };

        this.hideModal = this.hideModal.bind(this);
        this.onAvailableToggle = this.onAvailableToggle.bind(this);
        
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    hideModal() {
        this.setState({
            modal: false,
        });
    }

    showModal(name) {
        return () => this.setState({
            modal: ucFirst(name),
        });
    }

    modalUserGroup() { 
    createUserGroup.call({ group: {} }, handleResult((groupId) => {
          console.log(groupId)
    }));
  
        // return (<ModalsManagerContainer
        //     modalName={this.state.modal}
        //     hideModal={this.hideModal}
        //     event={this.props.event}
        // />);
    }

    
    

    onAvailableToggle(userId) {
        const {event} = this.props;
        let usersArray = event.users;

        const userPosition = usersArray.indexOf(userId);
        if (userPosition === -1) {
            usersArray.push(userId);
        } else {
            usersArray.splice(userPosition, 1);
        }

        const updatedEvent = {
            _id: this.props.event._id,
            partToUpdate: {users: usersArray},
        };

        updateEvent.call(updatedEvent, handleResult());
    }


    render() {

        const { loading, event, users } = this.props;
        const { modal } = this.state;
        
        return (
            <Spinner loading={loading}>
                <Row className="m-b-20">
                    <Col >                        
                        <Button raised primary label="NEW GROUP" onClick={this.modalUserGroup}/>
                        <Button raised primary label="GROUPS" onClick={this.showModal('groups')}/>
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
                                    checked={checkEvailable(event.users, user._id)}
                                    
                                />

                            ))}
                        </List>

                    </Col>
                </Row>
                
                {modal && this[`modal${modal}`]()}
            </Spinner>
        );
    }
}

UsersList.propTypes = {
    loading: PropTypes.bool.isRequired,
    event: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    onUnmount: PropTypes.func.isRequired,
};

export default UsersList;