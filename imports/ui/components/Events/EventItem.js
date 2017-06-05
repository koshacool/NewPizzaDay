import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Button from 'react-md/lib/Buttons/Button';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import LinkButton from '../LinkButton';


const getCheckboxId = poll => `checkbox-${poll._id}`;

const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;


const EventItem = ({ Event }) => { 

  const canEditEvent = event.createdBy === Meteor.userId();

  return (
    <Col xs={12} className="m-b-20">
      <Card>
        test
      </Card>
    </Col>
  );
};


EventItem.defaultProps = {
  onPublicityToggle: () => true,
};


EventItem.propTypes = {
  event: PropTypes.object.isRequired,

  onPublicityToggle: PropTypes.func,
};


export default EventItem;
