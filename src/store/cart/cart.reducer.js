import { CART_ACTION_TYPES } from "./cart.types";

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];
const INITIAL_STATE = {
    cartItems: items
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: {
                localStorage.setItem('cartItems', JSON.stringify(payload));

                return {
                ...state,
                cartItems: payload,
                };
        }
        default:
            return state;
    }
}