import React, { useContext } from 'react';
import Subtotal from '../../components/subtotal/Subtotal';
import { GlobalContext } from '../../context/GlobalState';

import CheckoutProduct from '../../components/checkoutProduct/CheckoutProduct';

import './CheckoutScreen.css';

const Checkout = () => {
	const { getBasketTotal, basket, user } = useContext(GlobalContext);

	const subtotal = getBasketTotal(basket);

	return (
		<div className='checkout'>
			<div className='checkout_left'>
				<img
					className='checkout_ad'
					src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
					alt=''
				/>

				<div>
					<h3>Hello, {!user ? 'Guest' : user.email}</h3>
					<h2 className='checkout_title'>Your Shopping Basket</h2>

					{basket.map((item, i) => (
						<CheckoutProduct item={item} key={i} />
					))}
				</div>
			</div>

			<div className='checkout_right'>
				<Subtotal subtotal={subtotal} />
			</div>
		</div>
	);
};

export default Checkout;
