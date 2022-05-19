import './currency-menu.style.scss';
import React from "react";

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
                        return <div className='currency-element' key={currency}><span>{ currency }</span></div>
                    })
                }
            </div>
        );
    }
}

export { CurrencyMenu };