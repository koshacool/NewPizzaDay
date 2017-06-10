import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/client-utils';
import { createOrder } from '../../../api/orders/methods';

import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';


class Order extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    this.props.onUnmount();
  } 
  

  render() {
    const { loading, order } = this.props;
   
    return (
      <Spinner loading={loading}>
        <Row>
          {order}
        </Row>

        <LinkButton floating fixed primary onClick={this.createEvent}>add</LinkButton>
      </Spinner>
    );
  }
}


Order.propTypes = {
  loading: PropTypes.bool.isRequired,
  order: PropTypes.array.isRequired,
  onUnmount: PropTypes.func.isRequired,
};


export default Order;
