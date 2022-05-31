import React from "react";
import ShoppingCart from "../../components/shopping-cart/shopping-cart.component";

class CartPage extends React.Component {

    render() { 
        return (
            <div className='main-content'>
                <ShoppingCart modal={ false }/>
            </div>
        );
    }
}

export default CartPage;