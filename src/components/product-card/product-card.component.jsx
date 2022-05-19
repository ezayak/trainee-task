import './product-card.style.scss';
import React from 'react';

class ProductCard extends React.Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            id: props.id,
            name: props.name,
            img: props.img,
            price: props.price
        };
    };

    render() { 
        const { price, name, img } = this.state;

        return (
            <div className='product-card'>
                <div className='product-container'>
                    <div
                        className='product-image'
                        style={{ 'backgroundImage': `url('${img}')`}}
                    >
                    </div>
                    <div className='product-add-to-cart-button hide'>
                        <img src="./icons/cart-white.png" alt="" />
                    </div>
                </div>
                <div className='product-spacer'></div>
                <div className='product-content'>
                    <div className='product-title'>
                        {name}
                    </div>
                    <div className='product-price'>
                        {price}
                    </div>
                </div>
            </div>
        )
    }
}

export { ProductCard }