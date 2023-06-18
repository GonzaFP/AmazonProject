import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	cartItems: [],
	user: null,
};

export const ReducerFunction = createSlice({
	name: "appReducer",
	initialState,
	reducers: {
		getStoredItems: (state, action) => {
			return {
				cartItems: action.payload.cart,
				user: action.payload.user,
			};
		},

		AddToBasket: (state, action) => {
			const foundItem = state.cartItems.some(
				(item) => item.id === action.payload.id
			);
			if (!foundItem) {
				// localStorage.setItem(
				// 	"State",
				// 	JSON.stringify({
				// 		...state,
				// 		cartItems: [...state.cartItems, action.payload],
				// 	})
				// );

				return {
					...state,
					cartItems: [...state.cartItems, action.payload],
				};
			} else {
				const UpdatedCartItems = state.cartItems.map((item) => {
					if (item.id === action.payload.id) {
						return {
							...item,
							qty: item.qty + 1,
						};
					}
					return item;
				});
				// localStorage.setItem(
				// 	"State",
				// 	JSON.stringify({ ...state, cartItems: UpdatedCartItems })
				// );
				return {
					...state,
					cartItems: UpdatedCartItems,
				};
			}
		},

		AddSubQty: (state, action) => {
			const UpdatedCartItems = state.cartItems.map((item) => {
				if (item.id === action.payload.productId) {
					return {
						...item,
						qty:
							action.payload.operator === "+"
								? item.qty + 1
								: item.qty === 1
								? 1
								: item.qty - 1,
					};
				}
				return item;
			});
			// localStorage.setItem(
			// 	"State",
			// 	JSON.stringify({ ...state, cartItems: UpdatedCartItems })
			// );
			return {
				...state,
				cartItems: UpdatedCartItems,
			};
		},

		DeleteItem: (state, action) => {
			// localStorage.setItem(
			// 	"State",
			// 	JSON.stringify({
			// 		...state,
			// 		cartItems: state.cartItems.filter(
			// 			(item) => item.id !== action.payload
			// 		),
			// 	})
			// );
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item.id !== action.payload
				),
			};
		},

		login: (state, action) => {
			// localStorage.setItem(
			// 	"State",
			// 	JSON.stringify({
			// 		...state,
			// 		user: action.payload,
			// 	})
			// );
			return {
				...state,
				user: action.payload,
			};
		},

		logout: (state) => {
			// localStorage.setItem(
			// 	"State",
			// 	JSON.stringify({
			// 		...state,
			// 		user: null,
			// 	})
			// );
			return {
				...state,
				user: null,
			};
		},
		EmptyCart: (state) => {
			// localStorage.setItem(
			// 	"State",
			// 	JSON.stringify({
			// 		...state,
			// 		cartItems: [],
			// 	})
			// );
			return {
				...state,
				cartItems: [],
			};
		},
	},
});

export const {
	login,
	logout,
	DeleteItem,
	AddSubQty,
	AddToBasket,
	getStoredItems,
	EmptyCart,
} = ReducerFunction.actions;

export default ReducerFunction.reducer;
