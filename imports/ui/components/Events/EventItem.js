import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import CardActions from 'react-md/lib/Cards/CardActions';
import Button from 'react-md/lib/Buttons/Button';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import ListItem from 'react-md/lib/Lists/ListItem';
import List from 'react-md/lib/Lists/List';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';


const getCheckboxId = poll => `checkbox-${poll._id}`;

const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;


const EventItem = ({ event }) => {

    const canEdit = event.createdBy === Meteor.userId();

    return (
        <Col xs={12} className="m-b-20">
            <Card>
                <CardTitle
                    title={event.title}
                    subtitle={getTimeAgo(event.createdAt)}
                />

                <CardText>
                    testatat
                </CardText>

                <CardActions>
                    <LinkButton
                        flat
                        to={`/order/${event._id}`}
                        label="Order"
                    />

                    {canEdit && (
                        <LinkButton
                            flat
                            to={`/event/${event._id}`}
                            label="Edit"
                        />
                    )}
                    <List className="md-cell--right">
                    <ListItem
                        primaryText={`Status: ${event.status}`}
                        active
                        threeLines
                    >
                        {canEdit && (<MenuButtonStatus />)}
                    </ListItem>
                   </List>

                </CardActions>
            </Card>
        </Col>
    );
};





EventItem.propTypes = {
    event: PropTypes.object.isRequired,
};


export default EventItem;
