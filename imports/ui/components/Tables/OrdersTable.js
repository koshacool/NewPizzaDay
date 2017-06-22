import React from 'react';
import PropTypes from 'prop-types';

import UserOrderTable from './UserOrderTable';

const border = {
    border: '1px solid black',
};

/**
 * Class for create table of users order
 */
class OrdersTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderUserOrder = this.renderUserOrder.bind(this);
    }

    /**
     * Create array of components with each user orders
     * @returns {array}
     */
    renderUserOrder() {
        const {orders} = this.props;

        return orders.map((order, i) => (
                <tr key={i}>
                    <td>{order.userName}</td>
                    <td>
                        <UserOrderTable
                            order={order.order}
                        />
                    </td>
                    <td>{`₴${this.getUserTotalPrice(order.order)}`}</td>
                </tr>
            )
        );
    }

    /**
     * Count total price in one order
     *
     * @param {object} order
     * @returns {number}
     */
    getUserTotalPrice(order) {
        return order.reduce((sum, current) => {
            const {quantity, price} = current;
            return sum + quantity * price;
        }, 0).toFixed(2);
    }

    render() {
        const {orders, totalPrice} = this.props;

        return (
            <table style={border}>
                <thead>
                <tr >
                    <th >Name</th>
                    <th >Order</th>
                    <th >User price</th>
                </tr>
                </thead>

                <tbody>
                { this.renderUserOrder() }
                </tbody>

                { totalPrice && (
                    <tfoot>
                    <tr>
                        <td>
                            Total price: ₴{totalPrice}
                        </td>
                    </tr>
                    </tfoot>
                ) }
            </table>
        );
    }
}


OrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,//[{ userNamem, order[{foodName, count, price}, ...] }]
    totalPrice: PropTypes.number,//Sum of all users price
};


export default OrdersTable;