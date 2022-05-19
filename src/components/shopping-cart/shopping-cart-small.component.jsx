import './shopping-cart.style.scss';
import React from 'react';
import { ShoppingCartItem } from './shopping-cart-item.component';

class ShoppingCartSmall extends React.Component {
    constructor(props) { 
        super(props);

        this.state = {
            cartItems: props.cartItems ? props.cartItems : []
        }
    }

    render() { 
        const { cartItems } = this.state;

        return (
            <div className='shopping-cart-overlay'>
                <div className='shopping-cart-container shopping-cart-modal'>
                    <div className='shopping-cart-content'>
                        <div className='shopping-cart-header'>
                            My bag,<span> { cartItems.length } items</span>
                        </div>
                        <div className='shopping-cart-list'>
                            {cartItems.map(item => { 
                                return <ShoppingCartItem key={item.id} {...item}/>
                            })}
                        </div>
                        <div className='shopping-cart-total'>
                            <div className='shopping-cart-total-title'>Total:</div>
                            <div className='shopping-cart-total-sum'>$ 500.00</div>
                        </div>
                    </div>
                    <div className='shopping-cart-actions'>
                        <div className='shopping-cart-btn-bag'>View bag</div>
                        <div className='shopping-cart-btn-checkout'>Check out</div>
                    </div>
                </div>
            </div>
        );
    }
}

export { ShoppingCartSmall };