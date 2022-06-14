import './category-page.style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../../components/product-card/product-card.component';
import Alert from '../../components/common/alert/alert.component';
import { getProductListByCategory } from '../../utils/apis/products.api';

class CategoryPage extends React.Component {
    constructor(props) { 
        super(props);

        this.state = {
            products: [],
            loading: true,
            alertVisible: false,
            message: '',
            categoryName: props.name ? props.name : 'all',
            //loadProductsCount: 0
        };
    }

    loadProducts = (categoryName) => {
        getProductListByCategory(categoryName)
            .then(data => {
                if (data) {
                    this.setState({
                        loading: false,
                        products: data,
                        categoryName
                    });
                }
            });
    }

    componentDidMount() {
        this.loadProducts(this.state.categoryName);
    }

    componentDidUpdate() {
        if (this.props.name !== this.state.categoryName && this.state.categoryName !== 'all') {
            console.log('componentDidUpdate loadProducts');
            this.loadProducts(this.props.name ? this.props.name : 'all');
        }
    }

    render() { 
        const { products, alertVisible,  message, categoryName} = this.state;

        return (
            <div className='main-content'>
                <div className='category-header'>{ categoryName }</div>
                <div className='products-container'>
                    {products.length > 0 && products.map(product => { 
                        return <ProductCard key={product.id} product={product} onAddToCart={ this.onAddToCart }/>
                    }) }
                </div>
                {
                    alertVisible && <Alert message={message} toggleAlert={this.toggleAlert} timeOut={3000}/>
                }
                
            </div>
        );
    }

    onAddToCart = (title) => {
        this.setState({
            message: `${title} was added to the cart`
        });
        this.toggleAlert();
    };


    toggleAlert = () => { 
        this.setState({alertVisible: !this.state.alertVisible})
    }    
}

CategoryPage.propTypes = {
    name: PropTypes.string
}

export default CategoryPage;