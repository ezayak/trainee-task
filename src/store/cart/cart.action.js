import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";
import { objectsEqual } from '../../utils/common.utils';

const compareAttributes = (attr1, attr2) => { 
    let arraysEqual = true;

    attr1.forEach((element, index) => {
        if ( objectsEqual(attr1[index], attr2[index]) ) { 
            arraysEqual = false;        }
    });

    return arraysEqual;
}

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => {
            if (cartItem.id !== productToAdd.id) {
                return false;
            } else {
                return compareAttributes(productToAdd.sizes, cartItem.sizes) && compareAttributes(productToAdd.colors, cartItem.colors);
            }
        }
    );

    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
  };
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const changeCartQuantity = (cartItems, id, quantity) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === id
    );

    if (existingCartItem) { 
        if (existingCartItem.quantity + quantity === 0) {
            return cartItems.filter((cartItem) => cartItem.id !== id);
        } else {
            return cartItems.map((cartItem) =>
                {return cartItem.id === id
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

const changeCartOptions = (cartItems, id, selectedOption) => { 
    const elementName = selectedOption.name + 's';
    return cartItems.map((cartItem) => {
        if (cartItem.id === id) { 
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
  
export const changeItemQuantity = (cartItems, id, quantity) => { 
    const newCartItems = changeCartQuantity(cartItems, id, quantity);
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

