import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';

import { updateGroup } from '../../../../api/foodGroups/methods';
import { updateEventRemoveFood, updateEventAddFood } from '../../../../api/events/methods';
import { handleResult, valueInArray } from '../../../../utils/client-utils';

import GroupItem from './GroupItem';
import Spinner from '../../Spinner';
import NoItems from '../../NoItems';

/**
 * Class for display list of groups with food
 */
class GroupsList extends Component {
    constructor(props) {
        super(props);

        this.onAvailableToggle = this.onAvailableToggle.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    /**
     * If group selected add food items from group to event
     * else remove food items from event
     *
     * @param {object} group
     * @returns {Function}
     */
    onAvailableToggle(group) {
        return (isChecked) => {
            const {_id: eventId} = this.props.event;
            const {_id: groupId, events: eventsArray, food: foodArray} = group;

            if (isChecked) {
                eventsArray.push(eventId);
                updateEventAddFood.call({_id: eventId, food: foodArray}, handleResult());
            } else {
                eventsArray.splice(eventsArray.indexOf(eventId), 1);
                updateEventRemoveFood.call({_id: eventId, food: foodArray}, handleResult());
            }

            updateGroup.call({
                _id: groupId,
                partToUpdate: {events: eventsArray},
            }, handleResult());
        };
    }


    render() {
        const { loading, hideModal, groups, event, editGroup } = this.props;

        return (
            <div>
                < Button raised primary label="Close" className="md-cell--middle" onClick={hideModal}/>
                <Divider />

                <Spinner loading={loading}>
                    <List>
                        <Subheader primaryText="Groups list" primary/>

                        {groups.length > 0 && groups.map(group => (
                            <GroupItem
                                key={group._id}
                                group={group}
                                onAvailableToggle={this.onAvailableToggle}
                                checked={valueInArray(group.events, event._id)}
                                editGroup={editGroup}
                            />
                        ))}

                        {groups.length === 0 && <NoItems text="You haven't any group"/> }

                    </List>
                </Spinner>
            </div>
        )
    }
}

GroupsList.propTypes = {
    hideModal: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired,
};

export default GroupsList;