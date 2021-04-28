import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../axios';

import CheckoutProduct from '../../components/checkoutProduct/CheckoutProduct';
import { GlobalContext } from '../../context/GlobalState';
import { numberWithCommas } from '../../utils/format';
import { db } from '../../firebase';

import './PaymentScreen.css';

const PaymentScreen = () => {
	const { basket, user, getBasketTotal, emptyBasket } = useContext(
		GlobalContext
	);
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState('');
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	const history = useHistory();

	useEffect(() => {
		// generate stripe secret key
		const getClientSecret = async () => {
			const res = await axios({
				method: 'post',
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(res.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('hit');

		setProcessing(true);
		await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				console.log(paymentIntent, user);

				// push the order to the database with the payment intent
				db.collection('users')
					.doc(user?.uid)
					.collection('orders')
					.doc(paymentIntent.id)
					.set({
						basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);
				emptyBasket();

				history.replace('/orders');
			});
	};

	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : '');
	};

	const subtotal = getBasketTotal(basket);

	return (
		<div className='payment'>
			<div className='payment_container'>
				<h1>
					Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
				</h1>
				{/* payment section - delivery address */}
				<div className='payment_section'>
					<div className='payment_title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment_address'>
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>

				{/* payment section - review item */}
				<div className='payment_section'>
					<div className='payment_title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment_items'>
						{basket.map((item, i) => (
							<CheckoutProduct key={i} item={item} />
						))}
					</div>
				</div>

				{/* payment section - payment method */}
				<div className='payment_section'>
					<div className='payment_title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment_details'>
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className='payment_priceContainer'>
								<h3>Order Total: ${numberWithCommas(Math.abs(subtotal))}</h3>

								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
								</button>
							</div>

							{/* error */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentScreen;
