import React from 'react';
import OrderContainer from '../components/Orders/OrderContainer';


const OrderPage = ({ params: { _id } }) => (
  <div>
    <h1 className="md-text-center">Order</h1>

    <OrderContainer eventId={_id}/>
  </div>
);


export default OrderPage;