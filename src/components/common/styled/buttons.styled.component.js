import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    background-color: var(--clr-white); 
    border: 0;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    text-transform: uppercase;
    color: var(--clr-black);
    text-align: center;
    z-index: 0;

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    }

    &:hover{
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, .2);
    }
`;

const ButtonSize = styled(Button)`
    min-width: ${props => props.modal ? '24px' : '63px'};
    height: ${props => props.modal ? '24px' : '45px'};
    font-family: 'Source Sans Pro';
    font-style: normal;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid var(--clr-black);
    text-align: center;  
    margin-top: 8px;
    background-color: ${props => props.selected ? 'var(--clr-black)' : 'var(--clr-white)'};
    color: ${props => props.selected ? 'var(--clr-white)' : 'var(--clr-black)'};
`;

const ColorDiv = styled.div`
    width: ${props => props.modal ? '16px' : '28px'};
    height: ${props => props.modal ? '16px' : '28px'};
    background-color: ${props => props.color || 'var(--clr-white)'};
`;

const ButtonColorOutline = styled(Button)`
    width: ${props => props.modal ? '20px' : '32px'};
    height: ${props => props.modal ? '20px' : '32px'};
    background-color: ${props => props.selected ?'var(--clr-white)' : props.color};
    border: ${props => props && props.selected ? '1px solid var(--clr-green)' : props.color === '#FFFFFF' ? '1px solid var(--clr-black)' :'0px'};
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center
`;

const ButtonQuantity = styled(Button)`
    border: 1px solid var(--clr-black);
    width: ${props => props.modal ? '24px' :'45px'};
    height: ${props => props.modal ? '24px' :'45px'};
    font-weight: 400;
    font-size: ${props => props.modal ? '20px' : '27px'};
    line-height: 160%;
`;

const ButtonCheckout = styled(Button)`
    background: var(--clr-green);  
    color: var(--clr-white);
    border: 0;
    width: ${props => props.modal ? '140px' : '279px'};
    height: 43px;
`;

export { ButtonSize, ButtonColorOutline, ColorDiv, ButtonQuantity, ButtonCheckout };