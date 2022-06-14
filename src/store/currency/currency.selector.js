import { createSelector } from '@reduxjs/toolkit';

const selectCurrencyReducer = (state) => state.currency;

export const selectCurrency = createSelector(
    selectCurrencyReducer,
    (currencySlice) => ({ currency: currencySlice.currency }),
);
