import './product-card.style.scss';
import cartIcon from '../../assets/icons/cart-white.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { CONST_OUT_OF_STOCK, getPrice } from '../../utils/common.utils';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { connect } from 'react-redux';

const mapStateToProps = (state) => selectCartItems;

const mapDispatchToProps = {
    addItemToCart
};

class ProductCard extends React.Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            id: props.product.id,
            name: props.product.name,
            img: props.product.images.length > 0 ? props.product.images[0] : '',
            price: getPrice(props.currency, props.product.prices),
            inStock: props.product.inStock,
            currency: props.currency
        };
    };

    componentDidUpdate = () => {
        if (this.props.currency && this.props.currency.label !== this.state.currency.label) {
            this.setState({
                currency: this.props.currency,
                price: getPrice(this.props.currency, this.props.product.prices)
            })
        }
    }

    render() { 
        const { name, img, id, inStock, currency } = this.state;
        const classTitle = !inStock ? ' text-out-of-stock' : '';
        const price = this.state.price.toFixed(2);

        return (
            <Link to={`/pdp/${id}`}>
                <div className='product-card'>
                    <div className='product-container'>
                        <div
                            className='product-image'
                            style={{ 'backgroundImage': `url('${img}')`, 'backgroundSize': 'cover'}}
                        >
                            {
                                !inStock &&  
                                <div className='out-of-stock'>
                                      { CONST_OUT_OF_STOCK }  
                                </div>
                            }
                        </div>
                        {
                            inStock &&
                                <button className='product-add-to-cart-button hide' onClick={ this.onAddToCart }>
                                    <img src={cartIcon} alt='' />
                                </button>
                        }
                    </div>
                    <div className='product-spacer'></div>
                    <div className={`product-content ${classTitle}`}>
                        <div className='product-title'>
                            {name}
                        </div>
                        <div className='product-price'>
                            { currency.symbol } {price}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    onAddToCart = (event) => { 
        event.preventDefault();
        this.props.addItemToCart(this.props.cartItems, this.props.product);
        this.props.onAddToCart(this.state.name);

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);