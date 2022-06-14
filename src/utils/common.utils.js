const CONST_TAX = 21;
const CONST_OUT_OF_STOCK = 'Out of stock';

const calculateTax = (sum) => Math.round(sum * CONST_TAX * 100 / 100, 2) / 100;

const getPrice = (currency, prices) => {
    const price = prices.find((price) => price.currency.label === currency.label);

    return price ? price.amount : 0;
};

const objectsEqual = (o1, o2) => Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every((p) => o1[p] === o2[p]);

export {
    calculateTax, CONST_OUT_OF_STOCK, getPrice, objectsEqual,
};
