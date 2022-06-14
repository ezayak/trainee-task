import { CART_ACTION_TYPES } from './cart.types';

let items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

// fixing problems with old format basket
items.forEach((item) => {
    if ((item.sizes.length > 0 && item.sizes[0].name === undefined) || (item.colors.length > 0 && item.colors[0].name === undefined)) {
        items = [];
    }
});

const INITIAL_STATE = {
    cartItems: items,
};

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
};
