import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { auth } from './firebase';
import { GlobalContext } from './context/GlobalState';

import Header from './components/header/Header';
import Home from './screens/homeScreen/HomeScreen';
import Checkout from './screens/checkoutScreen/CheckoutScreen';
import LoginAndRegister from './screens/loginAndRegisterScreen/LoginAndRegisterScreen';
import Payment from './screens/paymentScreen/PaymentScreen';
import Orders from './screens/ordersScreen/OrdersScreen';

import './App.css';

const promise = loadStripe(
	'pk_test_51HOsNEEyPPY3KneievjLrbiZba6ElTrqHMdPZP0VPhQgt7BRpHN6mJTDhBmovqkoNeKPXrwTFSUKN4aBjYxddplC00S5CJGUV8'
);

function App() {
	const { setUser } = useContext(GlobalContext);

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser);
			} else {
				setUser(null);
			}
		});
	}, []);

	return (
		<Router>
			<div className='app'>
				<Header />

				<Switch>
					<Route path='/orders'>
						<Orders />
					</Route>

					<Route path='/payment'>
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>

					<Route path='/login'>
						<LoginAndRegister />
					</Route>

					<Route path='/checkout'>
						<Checkout />
					</Route>

					<Route path='/'>
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
