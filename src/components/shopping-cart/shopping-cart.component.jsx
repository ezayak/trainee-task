import React from "react";
import PropTypes from 'prop-types';
import ShoppingCartMoldal from './shopping-cart-modal.component';
import ShoppingCartPage from './shopping-cart-page.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { changeItemQuantity, changeCartItemColor, changeCartItemSize } from '../../store/cart/cart.action';
import { connect } from "react-redux";


const mapStateToProps = () => selectCartItems;
const mapDispatchToProps = {
    changeItemQuantity,
    changeCartItemColor,
    changeCartItemSize
};

class ShoppingCart extends React.Component { 
    render() { 
        const { modal } = this.props;
        
        return (
            <>
            {
                modal ?
                    <ShoppingCartMoldal {...this.props} onChange = { this.onChangeCartItem } /> 
                :
                    <ShoppingCartPage {...this.props} onChange={this.onChangeCartItem} />
            }                
            </>
        );
    }

    onChangeCartItem = (event, id, type, value, idCart) => {
        switch (type) {
            case 'size': this.props.changeCartItemSize(this.props.cartItems, idCart, { value: value, id :id }); break;
            case 'color': this.props.changeCartItemColor(this.props.cartItems, idCart, { value: value, id :id }); break;
            case 'quantity': this.props.changeItemQuantity(this.props.cartItems, idCart, value); break;
            default: break;
        }
        event.stopPropagation();
    }
}

ShoppingCart.propTypes = {
    modal: PropTypes.bool,
    changeCartItemColor: PropTypes.func,
    changeCartItemSize: PropTypes.func,
    changeItemQuantity: PropTypes.func,
    cartItems: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);