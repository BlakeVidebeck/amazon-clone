import React, { useContext } from 'react';

import { GlobalContext } from '../../context/GlobalState';

import './Product.css';

const Product = ({ id, title, image, price, rating }) => {
	const { addToBasket } = useContext(GlobalContext);

	const add = (e) => {
		const item = {
			id,
			title,
			image,
			price,
			rating,
		};

		addToBasket(item);
	};

	return (
		<div className='product'>
			<div className='product_info'>
				<p>{title}</p>
				<p className='product_price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className='product_rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p key={i}>🌟</p>
						))}
				</div>
			</div>

			<img src={image} alt='' />

			<button onClick={add}>Add to Basket</button>
		</div>
	);
};

export default Product;
