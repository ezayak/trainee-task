import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";
import { objectsEqual } from '../../utils/common.utils';

const compareAttributes = (attr1, attr2) => { 
    let arraysEqual = true;

    attr1.forEach((element, index) => {
        if ( !objectsEqual(attr1[index], attr2[index]) ) { 
            arraysEqual = false;        }
    });

    return arraysEqual;
}

const isSameProduct = (product1, product2) => { 
    if (product1.id !== product2.id) { 
        return false;
    } else {
        return compareAttributes(product1.sizes, product2.sizes) && compareAttributes(product1.colors, product2.colors);
    }
};

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => isSameProduct(cartItem, productToAdd)
    );

    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        existingCartItem.idCart === cartItem.idCart
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
      );
  };
  
    return [...cartItems, { ...productToAdd, idCart: productToAdd.id.concat(cartItems.length), quantity: 1 }];
};

const changeCartQuantity = (cartItems, idCart, quantity) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.idCart === idCart
    );

    if (existingCartItem) { 
        if (existingCartItem.quantity + quantity === 0) {
            return cartItems.filter((cartItem) => cartItem.idCart !== idCart);
        } else {
            return cartItems.map((cartItem) =>
                {return cartItem.idCart === idCart
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem}
            );      
        }
    };
}

export const changeAttribute = (cartItem, selectedOption) => { 
    const newValues = cartItem[selectedOption.name + 's'].map(option => { 
        return option.id === selectedOption.value ? { ...option, selected: true } : { ...option, selected: false };
    });

    return newValues;
}

const changeCartOptions = (cartItems, idCart, selectedOption) => { 
    const elementName = selectedOption.name + 's';
    return cartItems.map((cartItem) => {
        if (cartItem.idCart === idCart) { 
            const newValues = changeAttribute(cartItem, selectedOption);
            return {
                ...cartItem,
                [elementName] : newValues
            }
        } else {
            return cartItem;
        }
    });
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
  
export const changeItemQuantity = (cartItems, idCart, quantity) => { 
    const newCartItems = changeCartQuantity(cartItems, idCart, quantity);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const changeCartItemColor = (cartItems, id, color) => {
    const newCartItems = changeCartOptions(cartItems, id, { name: 'color', value: color });
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


export const changeCartItemSize = (cartItems, id, size) => {
    const newCartItems = changeCartOptions(cartItems, id, { name: 'size', value: size });
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

