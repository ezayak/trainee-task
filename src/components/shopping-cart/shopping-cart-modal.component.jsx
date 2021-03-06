import './shopping-cart.style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ShoppingCartItem } from './shopping-cart-item.component';
import { ButtonCheckout } from '../common/styled/buttons.styled.component';
import { ShoppingCartListDiv } from './shopping-cart.styled.component';

class ShoppingCartModal extends React.Component {
    render() { 
        const { modal, cartItems, currency, onChange } = this.props;
        const total = this.props.total.toFixed(2);

        return (
            <div className='shopping-cart-overlay'>
                <div className='shopping-cart-container shopping-cart-modal'>
                    <div className='shopping-cart-content'>
                        <div className='shopping-cart-header-modal'>
                            My bag,<span> { cartItems.length } items</span>
                        </div>
                        <ShoppingCartListDiv modal={modal}>
                            {cartItems.map(item => {
                                const id = item.idCart;
                                return <ShoppingCartItem key={id} {...item} currency={currency} modal={modal} onChange={onChange}/>
                            })}
                        </ShoppingCartListDiv>
                        <div className='shopping-cart-total-modal'>
                            <div className='shopping-cart-total-title'>Total:</div>
                            <div className='shopping-cart-total-sum'>{ currency.symbol } { total }</div>
                        </div>
                    </div>
                    <div className='shopping-cart-actions'>
                        <Link to='/cart' className='btn btn-cart-small shopping-cart-btn-bag'>View bag</Link>
                        <ButtonCheckout modal={modal}>Check out</ButtonCheckout>
                    </div>
                </div>
            </div>
        );
    }
}

ShoppingCartModal.propTypes = {
    modal: PropTypes.bool,
    cartItems: PropTypes.array,
    currency: PropTypes.any,
    onChange: PropTypes.func,
    total: PropTypes.number
}

export default ShoppingCartModal;