import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';

import { handleResult } from '../../../utils/client-utils';
import { createOrder } from '../../../api/orders/methods';

import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';

import OrderFoodContainer from '../Containers/OrderFoodContainer';


class Order extends React.Component {
  constructor(props) {
    super(props);   

  }

  componentWillUnmount() {
    this.props.onUnmount();
  } 

  renderFood() {
    const {event, order} = this.props;
        return (<OrderFoodContainer event={event} order={order} />);
  }

  submitOrder() {
    console.log(123)
  }
  

  render() {
    const { loading, order } = this.props;
    
    return (
      <Spinner loading={loading}>
        { order && (
          <Row center="xs">
            {this.renderFood()}
          </Row>
        )}

       <Button floating fixed primary onClick={this.submitOrder}> done </Button>
      </Spinner>
    );
  }
}


Order.propTypes = {
  order: PropTypes.object,
  event: PropTypes.object,
  loading: PropTypes.bool.isRequired,  
  onUnmount: PropTypes.func.isRequired,
};


export default Order;
