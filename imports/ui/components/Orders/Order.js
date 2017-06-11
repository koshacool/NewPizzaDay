import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

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
  

  render() {
    const { loading, order } = this.props;
    
    return (
      <Spinner loading={loading}>
        { order && (
          <Row>
            {this.renderFood()}
          </Row>
        )}

       
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
