import React from 'react';
import { ProductSizes } from '../product-elements/product-sizes.component';
import { ProductColors } from '../product-elements/product-colors.component';
import { ButtonQuantity } from '../common/styled/buttons.styled.component';
import { TitleDiv, BrandDiv, PriceDiv, ShoppingCartImageDiv, InfoDiv, ShoppingCartQuantityDiv, ShoppingCartItemDiv } from './shopping-cart.styled.component';
import { getPrice } from '../../utils/common.utils';

class ShoppingCartItem extends React.Component { 
    render() { 
        const price = getPrice(this.props.currency, this.props.prices).toFixed(2);

        return (
            <ShoppingCartItemDiv modal={ this.props.modal }>
                <InfoDiv modal={this.props.modal}>
                    { this.props.brand && this.props.brand !== '' && <BrandDiv modal={ this.props.modal }>{ this.props.brand }</BrandDiv>}
                    <TitleDiv modal={ this.props.modal }>{ this.props.name }</TitleDiv>
                    <PriceDiv modal={this.props.modal}>{ this.props.currency.symbol } {price}</PriceDiv>
                    <ProductSizes sizes={this.props.sizes} modal={this.props.modal} onChange={this.props.onChange} id={ this.props.id }/>
                    <ProductColors colors={ this.props.colors } modal={ this.props.modal } onChange={ this.props.onChange } id={ this.props.id }/>
                </InfoDiv>
                <ShoppingCartQuantityDiv modal={ this.props.modal }>
                    <ButtonQuantity modal={this.props.modal} onClick={ (event) => this.onChangeQuantity(event, 1) }>+</ButtonQuantity>
                    <div>{this.props.quantity}</div>
                    <ButtonQuantity modal={ this.props.modal } onClick={ (event) => this.onChangeQuantity(event, -1) }>-</ButtonQuantity>                        
                </ShoppingCartQuantityDiv>
                <ShoppingCartImageDiv modal={this.props.modal}>
                    {this.props.images && this.props.images.length > 0 && <img src={this.props.images[0]} alt='' style={{'width':'100%', 'height':'100%'}}/>}
                </ShoppingCartImageDiv>
            </ShoppingCartItemDiv>
        );
    }

    // onChangeSize = (event, newValue) => {
    //     this.props.onChange(event, this.props.id, 'size', newValue);
    // }
    
    // onChangeColor = (event, newValue) => { 
    //     this.props.onChange(event, this.props.id, 'color', newValue);
    // }

    onChangeQuantity = (event, newValue) => { 
        this.props.onChange(event, this.props.id, 'quantity', newValue);
    }
}

export { ShoppingCartItem };