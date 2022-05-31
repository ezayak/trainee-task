import { CURRENCY_TYPES } from "./currency.types";

const INITIAL_STATE = {
    currency: {
        label: '',
        symbol: ''
    }
}

export const currencyReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CURRENCY_TYPES.SET_CURRENCY:
            return {
                ...state,
                currency : payload.currency
            };
        default:
            return state;
    }
}