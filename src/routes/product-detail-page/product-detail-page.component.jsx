import './product-detail-page.style.scss';
import React from "react";
import { getPrice } from '../../utils/common.utils';
import { TitleDiv, BrandDiv, PriceDiv, ColorSizeSpan } from '../../components/shopping-cart/shopping-cart.styled.component';
import { ProductColors } from '../../components/product-elements/product-colors.component';
import { ProductSizes } from '../../components/product-elements/product-sizes.component';
import { ButtonCheckout } from '../../components/common/styled/buttons.styled.component';
import { getProductById } from "../../utils/apis/products.api";
import { connect } from 'react-redux';
import { changeAttribute, addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const mapStateToProps = (state) => selectCartItems;
const mapDispatchToProps = {
    addItemToCart
};

class ProductDetailPage extends React.Component { 
    constructor(props) { 
        super(props);

        this.state = {
            ...props,
            loading: true,
            item: {},
        }
    };


    loadInfo = (id) => {
        getProductById(id)
            .then(data => { 
                this.setState({
                    loading: false,
                    item: data
                })
            });
    }

    componentDidMount() { 
        this.loadInfo(this.state.productId);
    };

    componentDidUpdate() {
        if (this.props.currency.label !== this.state.currency.label) {
            this.setState({ currency: this.props.currency });
        }
    }

    render() { 
        const item = this.state.item;
        const currency = this.state.currency;
        const price = this.state.loading ? 0 : getPrice(currency, item.prices);

        return (
            <div className='main-content'>
                {
                    !this.state.loading &&
                        <div className="pdp-container">
                            <div className="pdp-images-container">
                                {item.images.map((image, index) => { 
                                    return (
                                        <div className='pdp-small-image' key={`small-image-${index}`}>
                                            <img src={image} alt=""  style={{'width': '100%'}}/>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="pdp-image-container">
                                { item.images.length > 0 && <img src={item.images[0]} alt="" style={{'width': '100%'}}/> }
                            </div>
                            <div className="pdp-info-container">
                                <div className='pdp-info-title'>
                                    <BrandDiv>{item.brand}</BrandDiv>
                                    <TitleDiv>{item.name}</TitleDiv>
                                </div>
                                <ProductSizes sizes={item.sizes} onChange={ this.onChangeCartItem}/>
                                <ProductColors colors={item.colors} onChange={ this.onChangeCartItem}/>
                                <ColorSizeSpan >Price:</ColorSizeSpan>
                                <PriceDiv>{ currency.symbol } {price}</PriceDiv>
                                <ButtonCheckout onClick={this.addToCart}>Add to cart</ButtonCheckout>
                                <div className='pdp-info-description' dangerouslySetInnerHTML={this.createMarkup()}></div>
                            </div>
                        </div>
                }
            </div>
        );
    }

    createMarkup = () => {
        return {__html: this.state.item.description};
    }

    addToCart = () => {
        this.props.addItemToCart(this.props.cartItems, this.state.item);
    }


    onChangeCartItem = (event, id, type, value) => {
        switch (type) {
            case 'size': {
                const newAttributes = changeAttribute(this.state.item, { name: 'size', value: value });
                this.setState({ item: { ...this.state.item, sizes: newAttributes } });
                break;
            }
            case 'color': {
                const newAttributes = changeAttribute(this.state.item, { name: 'color', value: value });
                this.setState({ item: { ...this.state.item, colors: newAttributes } });
                break;
            }
            default: break;
        }
        event.stopPropagation();
    }   
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);