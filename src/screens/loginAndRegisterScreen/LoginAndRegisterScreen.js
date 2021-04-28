import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link, Redirect } from 'react-router-dom';

import './LoginAndRegisterScreen.css';

const LoginAndRegister = () => {
	const { signIn, signUp, user } = useContext(GlobalContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = (e) => {
		e.preventDefault();
		signIn(email, password);
	};

	const register = (e) => {
		e.preventDefault();
		signUp(email, password);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div className='login'>
			<Link to='/'>
				<img
					className='login_logo'
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
					alt=''
				/>
			</Link>

			<div className='login_container'>
				<h1>Sign-in</h1>

				<form onSubmit={login}>
					<h5>E-mail</h5>
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<h5>Password</h5>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button className='login_signInButton'>Sign In</button>
				</form>

				<p>
					By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>

				<button onClick={register} className='login_registerButton'>
					Create your Amazon Account
				</button>
			</div>
		</div>
	);
};

export default LoginAndRegister;
