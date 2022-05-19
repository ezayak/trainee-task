import './product-colors.style.scss';
import React from 'react';

class ProductColors extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            colors: props.colors ? props.colors : []
        }
    }

    render() { 
        const { colors } = this.state;

        return (
            <div className='colors-container'>
                <span className='color-header'>Color:</span>
                <div className='colors'>
                    {
                        colors.map(color => {
                            const classname = color.selected ? 'color-container active-color' : 'color-container';
                            return (
                                <div className={classname} key={color.color}>
                                    <div className='color' style={{ 'backgroundColor': color.color }}></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export { ProductColors };