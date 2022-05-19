import './shopping-cart.style.scss';
import React from 'react';
import { ProductSizes } from '../product-elements/product-sizes.component';
import { ProductColors } from '../product-elements/product-colors.component';

class ShoppingCartItem extends React.Component { 
    constructor(props) { 
        super(props);

        this.state = {...props};
    }

    render() { 
        return (
            <div className='shopping-cart-item'>
                <div className='shopping-cart-item-info'>
                    <div className='shopping-cart-item-title'>{ this.state.title }</div>
                    <div className='shopping-cart-item-price'>{this.state.price}</div>
                    <ProductSizes sizes={ this.state.sizes }/>
                    <ProductColors colors={ this.state.colors }/>
                </div>
                <div className='shopping-cart-item-quantity'>
                    <div className='shopping-cart-item-quantity-btn'>+</div>
                    <div>{this.state.quantity}</div>
                    <div className='shopping-cart-item-quantity-btn'>-</div>
                </div>
                <div className='shopping-cart-image'>
                    {
                        this.state.images.length > 0 && <img src={this.state.images[0]} alt='' className='shopping-cart-image'/>
                    }
                    
                </div>
            </div>
        );
    }
}

export { ShoppingCartItem };