import React from 'react';
import { useHistory } from 'react-router';
import { numberWithCommas } from '../../utils/format';

import './Subtotal.css';

const Subtotal = ({ subtotal }) => {
	const history = useHistory();
	return (
		<div className='subtotal'>
			<p>
				subtotal (0 items):{' '}
				<strong>${numberWithCommas(Math.abs(subtotal))}</strong>
			</p>
			<small className='subtotal__gift'>
				<input type='checkbox' /> This order contains a gift
			</small>
			<button onClick={(e) => history.push('/payment')}>
				Proceed to Checkout
			</button>
		</div>
	);
};

export default Subtotal;
