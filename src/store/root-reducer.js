import { combineReducers } from 'redux';
import { cartReducer } from './cart/cart.reducer';
import { currencyReducer } from './currency/currency.reducer';

export const rootReducer = combineReducers({
    cartItems: cartReducer,
    currency: currencyReducer,
});
