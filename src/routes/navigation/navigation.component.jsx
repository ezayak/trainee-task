import './navigation.style.scss';
import React, { Fragment } from 'react';
import { GroupLabel } from '../../components/navigation/group-label/group-label.component';
import { Outlet } from 'react-router-dom';
import { CurrencyMenu } from '../../components/navigation/currency-menu/currency-menu.component';
import { ShoppingCartSmall } from '../../components/shopping-cart/shopping-cart-small.component';

class Navigation extends React.Component {
    state = {
        groups: ['Women', 'Men', 'kids'],
        visibleCurrencyMenu: false,
        visibleCart: false,
        currencies: ['$ USD', 'EUR', 'JPY'],
        cartItems: [
            {
                id: 1,
                title: 'Apollo Running short',
                price: 50,
                size: 's',
                sizes: [{size:'xs', selected: false}, {size:'s', selected: false}, {size:'m', selected: true}, {size:'l', selected: false}],
                colors: [{color: 'red', selected: false}, {color: 'green', selected: true}, {color: 'blue', selected: false}],
                images: ['./Product Card/Elements/Image.png', './Product Card/Elements/Image.png'],
                quantity: 1
            },
            {
                id: 2,
                title: 'Apollo Running short',
                price: 50,
                size: 's',
                sizes: [{size:'xs', selected: false}, {size:'s', selected: false}, {size:'m', selected: false}, {size:'l', selected: true}],
                colors: [{color: 'red', selected: false}, {color: 'green', selected: false}, {color: 'yellow', selected: true}],
                images: ['./Product Card/Elements/Image.png'],
                quantity: 1
            }
        ]
    }

    render() { 
        const { groups,
            visibleCurrencyMenu,
            currencies,
            visibleCart,
            cartItems} = this.state;

        return (
            <Fragment>
                <div className='header'>
                    <div className='navigation'>
                        {groups.map(group => { 
                            return <GroupLabel key={group} name={group}/>;
                        })}
                    </div>
                    <div className='logo-box'>
                        <img src='./icons/logo.png' alt='Logo' className='logo'/>
                    </div>
                    <div className='action'>
                        <div className='currency-box' onClick={this.changeCurrencyVisibility}>
                            <span>$</span>
                            <span><img src='./icons/vector.png' alt=''/></span>
                        </div>
                        <div className='cart-box' onClick={this.changeCartVisibility}>
                            <img src='./icons/cart.png' alt='cart' className='cart'/>
                        </div>
                    </div>
                </div>
                {visibleCurrencyMenu && <CurrencyMenu currencies={currencies}/>}
                {visibleCart && <ShoppingCartSmall cartItems={cartItems}/>}
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
                console.log('changeCartVisibility', this.state.visibleCart);
                document.addEventListener('click', this.closeCart);
            })
        } else { 
            this.closeCart();
        }
    }

    closeCart = (event) => { 
        console.log('closeCart');
        this.setState({ visibleCart: false }, () => { 
            console.log('closeCart', this.state.visibleCart);
            document.removeEventListener('click', this.closeCart);
        });
    }
}

export { Navigation };