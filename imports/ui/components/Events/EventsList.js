import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server'

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/client-utils';
import { createEvent } from '../../../api/events/methods';
import { createOrder } from '../../../api/orders/methods';

import EventItemContainer from './EventItemContainer';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';


class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateEvent = this.onCreateEvent.bind(this);
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

  

  render() {
    const { loading, events } = this.props;
   
    return (
      <Spinner loading={loading}>
        <Row>
          {!loading && events.length === 0 && <NoItems text="You don't have any events"/>}

          {events.length > 0 && events.map(event => (
            <EventItemContainer
              key={event._id}
              event={event}
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
