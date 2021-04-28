import React from 'react';
import moment from 'moment';

import './Order.css';
import CheckoutProduct from '../checkoutProduct/CheckoutProduct';
import { numberWithCommas } from '../../utils/format';

const Order = ({ order }) => {
	return (
		<div className='order'>
			<h2>Order</h2>
			<p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma ')}</p>
			<p className='order_id'>
				<small>{order.id}</small>
			</p>

			{order.data.basket.map((item) => (
				<CheckoutProduct item={item} hideButton />
			))}

			<p className='order_total'>
				${numberWithCommas(Math.abs(order.data.amount / 100))}
			</p>
		</div>
	);
};

export default Order;
