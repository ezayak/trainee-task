import './navigation.style.scss';
import logo from '../../assets/icons/logo.png';
import cartIcon from '../../assets/icons/cart.png';
import vaectortIcon from '../../assets/icons/vector.png';
import React, { Fragment } from 'react';
import { GroupLabel } from '../../components/navigation/group-label/group-label.component';
import { Link, Outlet } from 'react-router-dom';
import CurrencyMenu from '../../components/navigation/currency-menu/currency-menu.component';
import ShoppingCart from '../../components/shopping-cart/shopping-cart.component';
import { connect } from 'react-redux';
import { selectCartQuantity } from '../../store/cart/cart.selector';
import { getCategories } from '../../utils/apis/categories.api';
import { getCurrencies } from '../../utils/apis/currency.api';
import { setActiveCurrency } from '../../store/currency/currency.action';

const mapStateToProps = (state) => selectCartQuantity;
const mapDispatchToProps = {
    setActiveCurrency
};

class Navigation extends React.Component {
    constructor(props) { 
        super(props);

        this.state = {
            groups: [],
            visibleCurrencyMenu: false,
            visibleCart: false,
            cartQuantity: props.cartQuantity,
            currencies: [],
            currency: props.currency
        };   

        this.cartRef = React.createRef();
    }

    loadCategories = () => {
        getCategories()
            .then(data => {
                this.setState({ groups: data });
            })
    }

    loadCurrencies = () => { 
        getCurrencies()
            .then(data => { 
                this.setState({
                    currencies: data
                });
                
                if (this.props.currency.label === '' && data.length > 0) {
                    this.props.setActiveCurrency(data[0]);
                }
            })
    };

    componentDidMount() {
        this.loadCategories();
        this.loadCurrencies();
    }

    componentDidUpdate() { 
        if (this.props.cartQuantity !== this.state.cartQuantity) { 
            this.setState({ cartQuantity: this.props.cartQuantity });
        }

        if (this.props.currency && this.props.currency.label !== this.state.currency.label) {
            this.setState({currency : this.props.currency});
        }
    }

    render() { 
        const { groups, currency,
            visibleCurrencyMenu,
            currencies,
            visibleCart, cartQuantity} = this.state;

        return (
            <Fragment>
                <div className='header'>
                    <div className='navigation'>
                        {groups.map(group => { 
                            return <GroupLabel key={group.name} name={group.name}  onClick={ this.reload}/>;
                        })}
                    </div>
                    <div className='logo-box'>
                        <Link to='/'><img src={logo} alt='Logo' className='logo'/></Link>
                    </div>
                    <div className='action'>
                        <div className='currency-box' onClick={this.changeCurrencyVisibility}>
                            <span>{currency.symbol}</span>
                            <span><img src={vaectortIcon} alt=''/></span>
                        </div>
                        <div className='cart-box' onClick={this.changeCartVisibility}>
                            <img src={cartIcon} alt='cart' className='cart' />
                            {
                                cartQuantity > 0 &&
                                <div className='cart-quantity'>{ cartQuantity }</div>
                            }
                        </div>
                    </div>
                </div>
                {visibleCurrencyMenu && <CurrencyMenu currencies={currencies} />}
                {
                    visibleCart && 
                        <div ref={this.cartRef}>
                            <ShoppingCart modal={ true }/>
                        </div>
                }
                <Outlet />
            </Fragment>
        );
    }

    changeCurrencyVisibility = (event) => {
        if (!this.state.visibleCurrencyMenu) {
            event.stopPropagation();
            this.setState({ 'visibleCurrencyMenu': true }, () => {
                document.addEventListener('click', this.closeCurrencyMenu);
            });
        } else { 
            this.closeCurrencyMenu();
        }
    }

    closeCurrencyMenu = () => { 
        this.setState({ 'visibleCurrencyMenu': false }, () => {
            document.removeEventListener('click', this.closeCurrencyMenu);
        });
    }

    changeCartVisibility = (event) => { 
        if (!this.state.visibleCart) {
            event.stopPropagation();
            this.setState({ visibleCart: true }, () => {
                document.addEventListener('click', this.closeCart);
            })
        } else { 
            this.closeCart();
        }
    }

    closeCart = (event) => { 
        if (this.cartRef && this.cartRef.current &&
            ((!this.cartRef.current.contains(event.target) || event.target.className === 'shopping-cart-overlay') ||
                event.target.className.includes('shopping-cart-btn-bag'))) {
            this.setState({ visibleCart: false }, () => {
                document.removeEventListener('click', this.closeCart);
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);