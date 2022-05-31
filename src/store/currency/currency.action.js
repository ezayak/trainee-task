import { CURRENCY_TYPES } from "./currency.types";
import { createAction } from "../../utils/reducer/reducer.util";

export const setActiveCurrency = (activeCurrency) => {
    return createAction(CURRENCY_TYPES.SET_CURRENCY, {
        currency: activeCurrency
    });
}
