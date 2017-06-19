import React from 'react';
import PropTypes from 'prop-types';

import UserOrderTable from './UserOrderTable';

const border = {
    border: '1px solid black',
};

class OrdersTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderUserOrder = this.renderUserOrder.bind(this);
    }

    renderUserOrder() {
        const {orders} = this.props;

        return orders.map((order, i) =>  (
                <tr key={i}>
                    <td>{order.userName}</td>
                    <td>
                        <UserOrderTable
                            order={order.order}
                        />
                    </td>
                    <td>{234 + 'grn.'}</td>
                </tr>
            )
        );

    }

    render() {
        const {orders, totalPrice} = this.props;

        return (
            <table style={border}>
                <thead>
                <tr >
                    <th >Name</th>
                    <th >Quantity</th>
                    <th >Total price</th>
                </tr>
                </thead>

                <tbody>
                { this.renderUserOrder() }
                </tbody>

                <tfoot>
                <tr>
                    <td>
                        Total price: ₴{totalPrice}
                    </td>
                </tr>
                </tfoot>
            </table>
        );
    }
}


OrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,//[{ userNamem, order[{foodName, count, price}, ...] }]
    totalPrice: PropTypes.number.isRequired,//Sum of all users price
};


export default OrdersTable;