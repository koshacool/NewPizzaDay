import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/client-utils';
import { createEvent } from '../../../api/events/methods';

import FoodItem from './FoodItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';


class FoodList extends React.Component {
  constructor(props) {
    super(props);

    this.createFood = this.createFood.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }
  

  createFood(event) {
    // event.preventDefault();

    createEvent.call({ event: {} }, handleResult((eventId) => {
          this.context.router.push(`event/${eventId}`);
  }));
  }
  

  render() {
    const { loading, event, food } = this.props;
   
    return (
      <Spinner loading={loading}>
        <Row>
          {!loading && food.length === 0 && <NoItems text="You don't have any food"/>}

          {food.length > 0 && food.map(foodItem => (
            <FoodItem
              key={foodItem._id}
              foodItem={foodItem}
            />
          ))}
        </Row>

        <LinkButton floating fixed primary onClick={this.createEvent}>add</LinkButton>
      </Spinner>
    );
  }
}


FoodList.propTypes = {
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  food: PropTypes.array.isRequired,
  onUnmount: PropTypes.func.isRequired,
};

export default FoodList;