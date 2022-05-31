import './currency-menu.style.scss';
import React from "react";
import { setActiveCurrency } from '../../../store/currency/currency.action';
import { selectCurrency } from '../../../store/currency/currency.selector';
import { connect } from 'react-redux';

const mapStateToProps = (state) => selectCurrency;

const mapDispatchToProps = {
    setActiveCurrency
};

class CurrencyMenu extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            currencies: this.props.currencies
        }
    }

    render() { 
        const { currencies } = this.state;

        return (
            <div className='currency-menu'>
                {
                    currencies.map(currency => { 
                        return <div className='currency-element' onClick={this.selectCurrency} key={currency.label}><span id={currency.label}> { currency.symbol } { currency.label }</span></div>
                    })
                }
            </div>
        );
    }

    selectCurrency = (event) => {
        const findCurrency = this.state.currencies.find(currency => {
            return currency.label === event.target.id;
        });
        this.props.setActiveCurrency(findCurrency);
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(CurrencyMenu);