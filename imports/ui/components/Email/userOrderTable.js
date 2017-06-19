import React from 'react';
import PropTypes from 'prop-types';


const border = {
    border: '1px solid black',
};

const userOrderTable = ({ order }) => {
    console.log(order)
    return (
        <table>
            <thead>
            <tr>
                <th >Name</th>
                <th >Count</th>
                <th >Price</th>
            </tr>
            </thead>
            <tbody>
            {
                order.map((orderItem, i) => {
                    const {name, count, price} = orderItem;

                    return (
                        <tr key={i}>
                            <td style={border}>{name}</td>
                            <td style={border}>{count}</td>
                            <td style={border}>{count * price}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
};


userOrderTable.propTypes = {
    order: PropTypes.array.isRequired,//[{foodName, count, price}],
};

export default userOrderTable;