import './product-sizes.style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonSize } from '../common/styled/buttons.styled.component';
import { ColorSizeSpan } from '../shopping-cart/shopping-cart.styled.component';

class ProductSizes extends React.Component { 
    render() { 
        const { sizes, modal } = this.props;

        return (
            <>
                {
                    sizes.items && sizes.items.length > 0 &&
                    <div className='sizes-container'>
                            <ColorSizeSpan modal={modal}>{ sizes.name }</ColorSizeSpan>
                        <div className='sizes'>
                            {
                                sizes.items.map(size => {
                                    const selected = !size.selected ? false : size.selected;
                                    return (
                                        <ButtonSize key={`${sizes.id}${size.id}`} id={size.id} modal={modal} selected={selected} onClick={this.changeSize}>
                                            {size.value}
                                        </ButtonSize>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </>
        );
    }

    changeSize = (event) => {
        console.log('event', event.target.id);
        this.props.onChange(event, this.props.sizes.id, 'size', event.target.id, this.props.id);
    }
}

ProductSizes.propTypes = {
    sizes: PropTypes.any,
    modal: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string
}

export { ProductSizes };