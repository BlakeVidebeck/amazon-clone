import React, { useState, useEffect, useContext } from 'react';

import { db } from '../../firebase';
import { GlobalContext } from '../../context/GlobalState';

import './OrdersScreen.css';
import Order from '../../components/order/Order';

const OrdersScreen = () => {
	const { user } = useContext(GlobalContext);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.orderBy('created', 'desc')
				.onSnapshot((snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				});
		} else {
			setOrders([]);
		}
	}, [user]);

	return (
		<div className='orders'>
			<h1>Your orders</h1>
			<div className='orders_order'>
				{orders?.map((order) => (
					<Order order={order} />
				))}
			</div>
		</div>
	);
};

export default OrdersScreen;
