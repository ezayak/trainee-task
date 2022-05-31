import React from "react";
import ShoppingCartMoldal from './shopping-cart-modal.component';
import ShoppingCartPage from './shopping-cart-page.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { changeItemQuantity, changeCartItemColor, changeCartItemSize } from '../../store/cart/cart.action';
import { connect } from "react-redux";


const mapStateToProps = (state) => selectCartItems;
const mapDispatchToProps = {
    changeItemQuantity,
    changeCartItemColor,
    changeCartItemSize
};

class ShoppingCart extends React.Component { 
    render() { 
        return (
            <>
            {
                this.props.modal ?
                    <ShoppingCartMoldal {...this.props} onChange = { this.onChangeCartItem } /> 
                :
                    <ShoppingCartPage {...this.props} onChange={this.onChangeCartItem} />
            }                
            </>
        );
    }

    onChangeCartItem = (event, id, type, value) => {
        switch (type) {
            case 'size': this.props.changeCartItemSize(this.props.cartItems, id, value); break;
            case 'color': this.props.changeCartItemColor(this.props.cartItems, id, value); break;
            case 'quantity': this.props.changeItemQuantity(this.props.cartItems, id, value); break;
            default: break;
        }
        event.stopPropagation();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);