import React, { useContext } from 'react';
import './CheckoutProduct.css';

import { GlobalContext } from '../../context/GlobalState';

const CheckoutProduct = ({
	item: { id, image, title, price, rating },
	hideButton,
}) => {
	const { removeFromBasket } = useContext(GlobalContext);

	const remove = (e) => {
		removeFromBasket(id);
	};

	return (
		<div className='checkoutProduct'>
			<img className='checkoutProduct_image' src={image} alt='' />

			<div className='checkoutProduct_info'>
				<p className='checkoutProduct_title'>{title}</p>
				<p className='checkoutProduct_price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className='checkoutProduct_rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p key={i}>🌟</p>
						))}
				</div>
				{!hideButton && <button onClick={remove}>Remove from Basket</button>}
			</div>
		</div>
	);
};

export default CheckoutProduct;
