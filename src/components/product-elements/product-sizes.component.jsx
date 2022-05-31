import './product-sizes.style.scss';
import React from 'react';
import { ButtonSize } from '../common/styled/buttons.styled.component';
import { ColorSizeSpan } from '../shopping-cart/shopping-cart.styled.component';

class ProductSizes extends React.Component { 
    render() { 
        const { sizes, modal } = this.props;
        

        return (
            <>
                {
                    sizes.length > 0 &&
                    <div className='sizes-container'>
                        <ColorSizeSpan modal={modal}>Size:</ColorSizeSpan>
                        <div className='sizes'>
                            {
                                sizes.map(size => {
                                    const selected = !size.selected ? false : size.selected;
                                    return (
                                        <ButtonSize key={size.id} id={size.id} modal={modal} selected={selected} onClick={this.changeSize}>
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
        this.props.onChange(event, this.props.id, 'size', event.target.id);
    }
}

export { ProductSizes };