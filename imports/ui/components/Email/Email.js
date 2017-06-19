import React from 'react';
import PropTypes from 'prop-types';

import userOrderTable from './userOrderTable';

const border = {
    border: '1px solid black',
};

class Email extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {orders, totalPrice} = this.props;
        console.log(orders)
        return (
            <table style={border}>
                <thead>
                <tr >
                    <th >Name</th>
                    <th >Order</th>
                    <th >Total price</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order, i) => {

                        return (
                            <tr key={i}>
                                <td>{order.userName}</td>
                                <td>
                                    <userOrderTable
                                        order={order.order}
                                    />
                                </td>
                                <td>{234 + 'grn.'}</td>
                            </tr>
                        );

                    })
                }
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


Email.propTypes = {
    orders: PropTypes.array.isRequired,//[{ userNamem, order[{foodName, count, price}, ...] }]
    totalPrice: PropTypes.number.isRequired,
};


export default Email;