const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ADD_TO_BASKET':
			return {
				...state,
				basket: [...state.basket, payload],
			};
		case 'REMOVE_FROM_BASKET':
			return {
				...state,
				basket: state.basket.filter((item) => item.id !== payload),
			};
		case 'SET_USER':
			return {
				...state,
				user: payload,
			};
		case 'EMPTY_BASKET':
			return {
				...state,
				basket: [],
			};
		case 'ERROR':
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};

export default reducer;
