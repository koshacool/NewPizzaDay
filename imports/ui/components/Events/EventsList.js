import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/client-utils';
import { createEvent, updateEvent } from '../../../api/events/methods';
import { sendEmail } from '../../../api/messages/methods';
import { createOrder } from '../../../api/orders/methods';

import EventItem from './EventItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';


class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateEvent = this.onCreateEvent.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  onCreateEvent(event) {
    event.preventDefault();

    createEvent.call({ event: {} }, handleResult((eventId) => {          
          this.context.router.push(`event/${eventId}`);
    }));
  }

  onChangeStatus(status, eventId) {
    return () => {
      const updatedEvent = {
        _id: eventId,
        partToUpdate: {'status': status},
      };

      updateEvent.call(updatedEvent, handleResult());

      Meteor.call('sendEmail',
          'roman.kushytskyy@gmail.com',
          'Hello from Bob!',
          'This is a test of Email.send.'
      );
      
    };
  }

  render() {
    const { loading, events } = this.props;
   
    return (
      <Spinner loading={loading}>
        <Row>
          {!loading && events.length === 0 && <NoItems text="You don't have any events"/>}

          {events.length > 0 && events.map(event => (
            <EventItem
              key={event._id}
              event={event}
              onChangeStatus={this.onChangeStatus}
            />
          ))}
        </Row>

        <LinkButton floating fixed primary onClick={this.onCreateEvent}>add</LinkButton>
      </Spinner>
    );
  }
}


EventsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  onUnmount: PropTypes.func.isRequired,
};


EventsList.contextTypes = {
  router: PropTypes.object.isRequired,
};


export default EventsList;
