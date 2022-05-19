import './product-sizes.style.scss';
import React from 'react';

class ProductSizes extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            sizes: props.sizes ? props.sizes : []
        }
    }

    render() { 
        const { sizes } = this.state;
        

        return (
            <div className='sizes-container'>
                <span className='size-header'>Size:</span>
                <div className='sizes'>
                    {
                        sizes.map(size => {
                            const classname = size.selected ? 'size active' : 'size';
                            return (
                                <div className={classname} key={size.size}>
                                    {size.size}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    getClassName = (size) => {
        return size.selected ? 'size active' : 'size';
    }
}

export { ProductSizes };