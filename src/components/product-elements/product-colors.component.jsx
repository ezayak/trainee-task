import './product-colors.style.scss';
import React from 'react';
import { ColorSizeSpan } from '../shopping-cart/shopping-cart.styled.component';
import { ColorDiv, ButtonColorOutline } from '../common/styled/buttons.styled.component';

class ProductColors extends React.Component { 
    render() { 
        const { colors, modal } = this.props;

        return (
            <>
                {
                    colors.length > 0 &&
                    <div className='colors-container'>
                        <ColorSizeSpan modal={modal}>Color:</ColorSizeSpan>
                        <div className='colors'>
                            {
                                colors.map(color => {
                                    const selected = !color.selected ? false : color.selected;
                                    return (
                                        <ButtonColorOutline key={color.id} modal={modal} selected={ selected } onClick={this.changeColor}>
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
        this.props.onChange(event, this.props.id, 'color', event.target.id);
    }
}

export { ProductColors };