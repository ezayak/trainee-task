import React from 'react';
import leftArrow from '../../assets/icons/vector-left.png';
import rightArrow from '../../assets/icons/vector-right.png';
import { ProductSizes } from '../product-elements/product-sizes.component';
import { ProductColors } from '../product-elements/product-colors.component';
import { ButtonQuantity } from '../common/styled/buttons.styled.component';
import { TitleDiv, BrandDiv, PriceDiv, ShoppingCartImageDiv, InfoDiv, ShoppingCartQuantityDiv, ShoppingCartItemDiv } from './shopping-cart.styled.component';
import { getPrice } from '../../utils/common.utils';
import { Link } from 'react-router-dom';

class ShoppingCartItem extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            indexPicture: 0
        };
    }

    render() { 
        const price = getPrice(this.props.currency, this.props.prices).toFixed(2);
        const { sizes, colors, id, brand, modal, name, currency, idCart, quantity, images, onChange } = this.props;
        const { indexPicture } = this.state;

        return (
            <ShoppingCartItemDiv modal={ modal }>
                <InfoDiv modal={modal} onClick={this.openPDP}>
                    { brand && brand !== '' && <BrandDiv modal={ modal }>{ brand }</BrandDiv>}
                    <Link to={`/pdp/${id}`}><TitleDiv modal={ modal }>{ name }</TitleDiv></Link>
                    <PriceDiv modal={modal}>{currency.symbol} {price}</PriceDiv>
                    {
                        sizes.map(size => { 
                            return <ProductSizes key={size.id} sizes={size} modal={modal} onChange={onChange} id={idCart}/>;
                        })
                    }
                    {
                        colors.map(color => {
                            return <ProductColors key={color.id} colors={ color } modal={ modal } onChange={ onChange } id={ idCart }/>
                        })
                    }                    
                </InfoDiv>
                <ShoppingCartQuantityDiv modal={ modal }>
                    <ButtonQuantity modal={modal} onClick={ (event) => this.onChangeQuantity(event, 1) }>+</ButtonQuantity>
                    <div>{quantity}</div>
                    <ButtonQuantity modal={ modal } onClick={ (event) => this.onChangeQuantity(event, -1) }>-</ButtonQuantity>                        
                </ShoppingCartQuantityDiv>
                <ShoppingCartImageDiv modal={modal}>
                    {images && images.length > 0 && <img src={images[indexPicture]} alt='' style={{ 'width': '100%', 'height': '100%' }} />}
                    {
                        !modal && images && images.length > 1 &&
                        <div className='cart-image-buttons'>
                            <div className='cart-image-button cart-image-left' onClick={this.changePicture}>
                                <img src={leftArrow} id='button-img-left' alt=''/>
                            </div>
                            <div className='cart-image-button cart-image-left' onClick={this.changePicture}>
                                <img src={rightArrow} id='button-img-right' alt=''/>
                            </div>
                        </div>
                     }
                </ShoppingCartImageDiv>
            </ShoppingCartItemDiv>
        );
    }

    onChangeQuantity = (event, newValue) => { 
        this.props.onChange(event, '', 'quantity', newValue, this.props.idCart);
    }

    changePicture = (event) => { 
        let step = 0;

        if (event.target.id === 'button-img-left') {
            --step;
        } else {
            ++step;
        }

        if (this.state.indexPicture + step > 0 && this.state.indexPicture + step < this.props.images.length) {
            this.setState({indexPicture: this.state.indexPicture + step});
        } else if (this.state.indexPicture + step < 0) {
            this.setState({indexPicture: this.props.images.length - 1});
        } else {
            this.setState({indexPicture: 0});
        }
    }
}

export { ShoppingCartItem };