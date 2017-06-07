import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';

import { handleResult } from '../../../utils/client-utils';
import { createEvent } from '../../../api/events/methods';

import FoodItem from './FoodItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';
import ModalsManagerContainer from '../ModalsManager/Containers/ModalsManagerContainer';

const ucFirst = (str) => str[0].toUpperCase() + str.slice(1);

class FoodList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };

    this.createFood = this.createFood.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.modalCreateFood = this.modalCreateFood.bind(this);

  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  modalCreateFood() {
    return (<ModalsManagerContainer
        modalName={this.state.modal}
        hideModal={this.hideModal}
        event={this.props.event}
    />);
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

  createFood(event) {
     event.preventDefault();

    createEvent.call({ event: {} }, handleResult((eventId) => {
          this.context.router.push(`event/${eventId}`);
  }));
  }
  

  render() {
    const { loading, event, food } = this.props;
    const { modal } = this.state;
    return (
      <Spinner loading={loading}>
        <Row>

            <Button raised primary label="NEW FOOD" onClick={this.showModal('createFood')} />


          {!loading && food.length === 0 && <NoItems text="You don't have any food"/>}

          {food.length > 0 && food.map(foodItem => (
            <FoodItem
              key={foodItem._id}
              foodItem={foodItem}
            />
          ))}
        </Row>
        {console.log(modal)}
        {modal && this[`modal${modal}`]()}
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