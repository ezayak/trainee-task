import { createSelector } from "@reduxjs/toolkit";
import { calculateTax, getPrice } from "../../utils/common.utils";

const selectCartReducer = (state) => state.cartItems;
const selectCurrencyReducer = (state) => state.currency;

export const selectCartItems = createSelector(
    [selectCartReducer, selectCurrencyReducer],
    (cartItemsSlice, currencySlice) => {
        const total = cartItemsSlice.cartItems.reduce((acc, cartItem) => {
            const price = getPrice(currencySlice.currency, cartItem.prices);
            return Math.round(price * cartItem.quantity * 100) / 100 + acc
        }, 0);
        const quantity = cartItemsSlice.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
        const tax = calculateTax(total);
        return {
            cartItems: cartItemsSlice.cartItems,
            total: Math.round(total* 100) / 100,
            quantity,
            tax: Math.round(tax* 100) / 100,
            currency: currencySlice.currency
        }
    }
);

export const selectCartQuantity = createSelector(
    selectCartItems, selectCurrencyReducer,
    (cartItemsSlice, currencySlice) => {
        const quantitySlice = cartItemsSlice.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
        return {
            cartQuantity: quantitySlice,
            currency: currencySlice.currency
        }
    }
);

