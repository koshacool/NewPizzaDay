import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

const border = {
    border: '1px solid black',
};

const UserOrderTable = ({ order }) => (
    <table>
        <thead>
        <tr>
            <th >Name</th>
            <th >Quantity</th>
            <th >Price</th>
        </tr>
        </thead>
        <tbody>
        {
            order.map((orderItem, i) => {                
                const {name, quantity, price} = orderItem;

                return (
                    <tr key={i}>
                        <td style={border}>{name}</td>
                        <td style={border}>{quantity}</td>
                        <td style={border}>{(quantity * price).toFixed(2)}</td>
                    </tr>
                );
            })
        }
        </tbody>
    </table>
);


UserOrderTable.propTypes = {
    order: PropTypes.array.isRequired,//[{foodName, quantity, price}],
};

export default UserOrderTable;