import './shopping-cart.style.scss';
import React, { Fragment } from "react";
import { ShoppingCartItem } from './shopping-cart-item.component';
import { ButtonCheckout } from '../common/styled/buttons.styled.component';
import { ShoppingCartListDiv } from './shopping-cart.styled.component';

class ShoppingCartPage extends React.Component { 
    render() {
        const { cartItems, currency, quantity, onChange } = this.props;
        const tax = this.props.tax.toFixed(2);
        const total = this.props.total.toFixed(2);

        return (
            <div className="shopping-cart-container">
                <div className='shopping-cart-content'>
                    <div className='shopping-cart-header'>
                        Cart
                    </div>
                    <ShoppingCartListDiv>
                        <hr/>
                        {cartItems.length > 0 && cartItems.map((item, index) => {
                            const id = item.id.concat(index);
                            return (
                                <Fragment  key={id}>
                                    <ShoppingCartItem {...item} currency={currency} onChange={ onChange }/>
                                    <hr/>
                                </Fragment>
                            );
                        })}
                    </ShoppingCartListDiv>
                    <div className='shopping-cart-total'>
                        <div className='shopping-cart-total-row'><div>Tax 21%: </div><div><span>{ currency.symbol } { tax }</span></div></div>
                        <div className='shopping-cart-total-row'><div>Quantity: </div><div><span>{quantity}</span></div></div>
                        <div className='shopping-cart-total-row'><div>Total: </div><div><span>{ currency.symbol } {total}</span></div></div>
                        <div className='shopping-cart-total-row'></div>
                        <ButtonCheckout>Order</ButtonCheckout>
                    </div>
                </div>                
            </div>
        );
    }
}

export default ShoppingCartPage;