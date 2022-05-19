import './category-page.style.scss';
import React from 'react';
import { ProductCard } from '../../components/product-card/product-card.component';

const products = [];

for (let i = 0; i < 6; i++) { 
    products.push({
        id: i,
        img: './Product Card/Elements/Image.png',
        price: '50',
        name: 'Appolo Running Short'
    });
}


class CategoryPage extends React.Component {
    state = {
        products: products,
    };

    render() { 
        const { products } = this.state;

        return (
            <div className='main-content'>
                <div className='category-header'>Category name</div>
                <div className='products-container'>
                    {products.map(product => { 
                        return <ProductCard key={product.id} {...product}/>
                    }) }
                </div>
            </div>
        );
    }
}

export { CategoryPage };