import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/client-utils';
import { createEvent } from '../../../api/events/methods';

import EventItem from './EventItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';


class EventsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.onUnmount();
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
            />
          ))}
        </Row>

        <LinkButton floating fixed primary >add</LinkButton>
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
