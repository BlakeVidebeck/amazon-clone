import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { auth } from '../firebase';

const initialState = {
	basket: [],
	user: null,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component - to let other components use the state
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// actions
	const addToBasket = (item) => {
		try {
			dispatch({
				type: 'ADD_TO_BASKET',
				payload: item,
			});
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: error.message,
			});
		}
	};

	const removeFromBasket = (id) => {
		// remove the item from the basket
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			payload: id,
		});
	};

	const getBasketTotal = (basket) =>
		basket?.reduce((amount, item) => item.price + amount, 0);

	const signIn = async (email, password) => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
		} catch (err) {
			console.error(err.message);
		}
	};

	const signUp = async (email, password) => {
		try {
			await auth.createUserWithEmailAndPassword(email, password);
		} catch (err) {
			console.error(err.message);
		}
	};

	const signOut = () => {
		if (state.user) auth.signOut();
	};

	const setUser = (user) => {
		dispatch({
			type: 'SET_USER',
			payload: user,
		});
	};

	const emptyBasket = () => {
		dispatch({
			type: 'EMPTY_BASKET',
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				basket: state.basket,
				user: state.user,
				addToBasket,
				getBasketTotal,
				emptyBasket,
				removeFromBasket,
				signIn,
				signUp,
				signOut,
				setUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
