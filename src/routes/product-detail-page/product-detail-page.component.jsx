import './product-detail-page.style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { getPrice } from '../../utils/common.utils';
import { TitleDiv, BrandDiv, PriceDiv, ColorSizeSpan } from '../../components/shopping-cart/shopping-cart.styled.component';
import { ProductColors } from '../../components/product-elements/product-colors.component';
import { ProductSizes } from '../../components/product-elements/product-sizes.component';
import { ButtonCheckout } from '../../components/common/styled/buttons.styled.component';
import { getProductById } from '../../utils/apis/products.api';
import { connect } from 'react-redux';
import { changeAttribute, addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CONST_OUT_OF_STOCK } from '../../utils/common.utils';

const mapStateToProps = () => selectCartItems;
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
            selectedPicture: '',
            currentPicture: ''
        }
    }


    loadInfo = (id) => {
        getProductById(id)
            .then(data => { 
                this.setState({
                    loading: false,
                    item: data,
                    productId: id,
                    selectedPicture: data.images.length > 0 ? data.images[0] : ''
                })
            });
    }

    componentDidMount() { 
        this.loadInfo(this.state.productId);
    }

    componentDidUpdate() {
        if (this.props.currency.label !== this.state.currency.label) {
            this.setState({ currency: this.props.currency });
        }
        if (this.props.productId !== this.state.productId) {
            this.loadInfo(this.props.productId);
        }
    }

    render() { 
        const { currentPicture, selectedPicture } = this.state;
        const item = this.state.item;
        const currency = this.state.currency;
        const price = this.state.loading ? 0 : getPrice(currency, item.prices);

        console.log('item', item);

        return (
            <div className='main-content'>
                {
                    !this.state.loading &&
                        <div className='pdp-container'>
                            <div className='pdp-images-container'>
                                {item.images.map((image, index) => { 
                                    return (
                                        <div key={`small-image-${index}`} className="pdp-image-div">
                                            <img src={image} alt=''  style={{'width': '100%'}}  className='pdp-small-image'  onMouseOver={this.showCurrentPicture} onMouseOut={this.showSelectedPicture} onClick={this.selectPicture}/>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='pdp-image-container'
                                style={{
                                    'backgroundImage': currentPicture !== '' ? `url(${currentPicture})` : `url(${selectedPicture})`,
                                    'backgroundColor': 'var(--clr-white)',
                                    'backgroundSize': 'contain',
                                    'backgroundRepeat': 'no-repeat',
                                    'backgroundPosition': '50% 50%'
                                }}
                            >
                                {
                                    !item.inStock &&
                                    <>
                                        <div className='out-of-stock-detailed'></div>
                                        <div className='text-box-out-of-stock-detailed'>
                                            { CONST_OUT_OF_STOCK }  
                                        </div>
                                    </>
                                }
                            </div>
                            <div className='pdp-info-container'>
                                <div className='pdp-info-title'>
                                    <BrandDiv>{item.brand}</BrandDiv>
                                    <TitleDiv>{item.name}</TitleDiv>
                                </div>
                                {
                                    item.sizes.map(sizes => {
                                        return <ProductSizes key={sizes.id} sizes={sizes} onChange={this.onChangeCartItem} />;
                                    })
                                }
                                {
                                    item.colors.map(colors => { 
                                        return <ProductColors key={colors.id} colors={colors} onChange={this.onChangeCartItem} />;
                                    })
                                }
                                
                                <ColorSizeSpan >Price:</ColorSizeSpan>
                                <PriceDiv>{currency.symbol} {price}</PriceDiv>
                                { item.inStock && <ButtonCheckout onClick={this.addToCart}>Add to cart</ButtonCheckout> }
                                <div className='pdp-info-description' dangerouslySetInnerHTML={this.createMarkup()}></div>
                            </div>
                        </div>
                }
            </div>
        );
    }

    showCurrentPicture = (event) => {
        this.setState({currentPicture: event.target.src});
    }

    showSelectedPicture = () => { 
        this.setState({currentPicture: ''});
    }

    selectPicture = (event) => { 
        this.setState({selectedPicture: event.target.src});
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
                const newAttributes = changeAttribute(this.state.item, { name: 'size', value: value, id :id });
                this.setState({ item: { ...this.state.item, sizes: newAttributes } });
                break;
            }
            case 'color': {
                const newAttributes = changeAttribute(this.state.item, { name: 'color', value: value, id :id });
                this.setState({ item: { ...this.state.item, colors: newAttributes } });
                break;
            }
            default: break;
        }
        event.stopPropagation();
    }   
    
}

ProductDetailPage.propTypes = {
    currency: PropTypes.any,
    productId: PropTypes.string,
    addItemToCart: PropTypes.func,
    cartItems: PropTypes.array,
    idCart: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);