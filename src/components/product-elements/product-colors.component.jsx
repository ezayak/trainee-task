import './product-colors.style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { ColorSizeSpan } from '../shopping-cart/shopping-cart.styled.component';
import { ColorDiv, ButtonColorOutline } from '../common/styled/buttons.styled.component';

class ProductColors extends React.Component { 
    render() { 
        const { colors, modal } = this.props;

        return (
            <>
                {
                    colors.items.length > 0 &&
                    <div className='colors-container'>
                            <ColorSizeSpan modal={modal}>{ colors.name }</ColorSizeSpan>
                        <div className='colors'>
                            {
                                colors.items.map(color => {
                                    const selected = !color.selected ? false : color.selected;
                                    return (
                                        <ButtonColorOutline key={`${colors.id}${color.id}`} modal={modal} selected={ selected } onClick={this.changeColor}  color={color.value}>
                                            <ColorDiv color={color.value} id={color.id} modal={modal} />
                                        </ButtonColorOutline>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </>
        );
    }


    changeColor = (event) => {
        this.props.onChange(event, this.props.colors.id, 'color', event.target.id, this.props.id);
    }
}

ProductColors.propTypes = {
    colors: PropTypes.any,
    modal: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string
}

export { ProductColors };