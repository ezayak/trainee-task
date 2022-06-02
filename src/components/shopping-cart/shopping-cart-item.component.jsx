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

        return (
            <ShoppingCartItemDiv modal={ this.props.modal }>
                <InfoDiv modal={this.props.modal} onClick={this.openPDP}>
                    { this.props.brand && this.props.brand !== '' && <BrandDiv modal={ this.props.modal }>{ this.props.brand }</BrandDiv>}
                    <Link to={`/pdp/${this.props.id}`}><TitleDiv modal={ this.props.modal }>{ this.props.name }</TitleDiv></Link>
                    <PriceDiv modal={this.props.modal}>{ this.props.currency.symbol } {price}</PriceDiv>
                    <ProductSizes sizes={this.props.sizes} modal={this.props.modal} onChange={this.props.onChange} id={ this.props.idCart }/>
                    <ProductColors colors={ this.props.colors } modal={ this.props.modal } onChange={ this.props.onChange } id={ this.props.idCart }/>
                </InfoDiv>
                <ShoppingCartQuantityDiv modal={ this.props.modal }>
                    <ButtonQuantity modal={this.props.modal} onClick={ (event) => this.onChangeQuantity(event, 1) }>+</ButtonQuantity>
                    <div>{this.props.quantity}</div>
                    <ButtonQuantity modal={ this.props.modal } onClick={ (event) => this.onChangeQuantity(event, -1) }>-</ButtonQuantity>                        
                </ShoppingCartQuantityDiv>
                <ShoppingCartImageDiv modal={this.props.modal}>
                    {this.props.images && this.props.images.length > 0 && <img src={this.props.images[this.state.indexPicture]} alt='' style={{ 'width': '100%', 'height': '100%' }} />}
                    {
                        !this.props.modal && this.props.images && this.props.images.length > 1 &&
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
        this.props.onChange(event, this.props.idCart, 'quantity', newValue);
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