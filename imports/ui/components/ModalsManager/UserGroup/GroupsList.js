import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';

import { updateGroup } from '../../../../api/userGroups/methods';
import { updateEventRemoveUsers, updateEventAddUsers } from '../../../../api/events/methods';
import { handleResult } from '../../../../utils/client-utils';
import GroupItem from './GroupItem';
import Spinner from '../../Spinner';

const checkEvailable = (arr, value) => arr.indexOf(value) !== -1;

class GroupsList extends Component {
    constructor(props) {
        super(props);


        this.onAvailableToggle = this.onAvailableToggle.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }



    onAvailableToggle(group, isChecked) {
        const {_id: eventId} = this.props.event;
        const {_id: groupId, events: eventsArray, users: usersArray} = group;
        
        if (isChecked) {
            eventsArray.push(eventId);
            updateEventAddUsers.call({_id: eventId, users: usersArray}, handleResult());
        } else {
            eventsArray.splice(eventsArray.indexOf(eventId), 1);
            updateEventRemoveUsers.call({_id: eventId, users: usersArray}, handleResult());
        }

        updateGroup.call({
            _id: groupId,
            partToUpdate: {events: eventsArray},
        }, handleResult());
    }



    render() {
        const { loading, hideModal, groups, event } = this.props;

        return (
            <Dialog
                id="speedBoost"
                visible={true}
                title="Groups List"
                aria-labelledby="accessibleContent"
                modal
            >
                < Button raised primary label="Close" className="md-cell--middle" onClick={hideModal}/>
                <Divider />

                <Spinner loading={loading}>



                        <List>
                            {groups.length > 0 && groups.map(group => (
                                    <GroupItem
                                        key={group._id}
                                        group={group}
                                        onAvailableToggle={this.onAvailableToggle}
                                        checked={checkEvailable(group.events, event._id)}
                                    />
                            ))}
                        </List>

                </Spinner>
            </Dialog>

        )
    }
}

GroupsList.propTypes = {
    hideModal: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
};

export default GroupsList;