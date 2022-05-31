import styled from 'styled-components';

const TitleDiv = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: ${props => props.modal ? '300' : '400'};
    font-size: ${props => props.modal ? '16px' : '30px'};
    line-height: ${props => props.modal ? '25.6px' : '27px'};
`;

const BrandDiv = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: ${props => props.modal ? '400' : '600'};
    font-size: ${props => props.modal ? '16px' : '30px'};
    line-height: ${props => props.modal ? '160%' : '27px'};
`;

const PriceDiv = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: ${props => props.modal ? '500' : '700'};
    font-size: ${props => props.modal ? '16px' : '24px'};
    line-height: ${props => props.modal ? '160%' : '24px'};        
`;

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px;
    gap: 8px;

    width: ${props => props.modal ? '136px' : 'calc(100% - 200px - 24px)'};
    min-height: ${props => props.modal ? '220px' : '280px'};
`;

const ShoppingCartItemDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
    gap: 8px;

    width: 100%;
    height: ${props => props.modal ? '100%' : '280px'};

    font-family: 'Raleway';
    font-style: normal;  
`;

const ShoppingCartImageDiv = styled.div`
    width: ${props => props.modal ? '121px' : '200px'};
    flex: none;
    order: 1;
    display:flex;
    align-self: stretch;
    flex-grow: 1;
    right: var(--right);
`;

const ShoppingCartQuantityDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 32px;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    font-size: ${props => props.modal ? '16px' : '24px'};
    line-height: '160%';

    width: ${props => props.modal ? '24px' : '45px'};
`;

const ColorSizeSpan = styled.span`
    font-family: ${props => props.modal ? 'Raleway' : 'Roboto Condensed'};
    font-style: normal;
    font-weight: ${props => props.modal ? '400' : '700'};
    font-size: ${props => props.modal ? '14px' : '18px'};
    line-height: ${props => props.modal ? '16px' : '18px'};
    text-transform: ${props => props.modal ? 'none' : 'uppercase'};
`;

const ShoppingCartListDiv = styled.div`
    margin: 20px 0 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    ${props => props.modal && 'max-height: 470px;min-height: 470px;overflow-y: auto !important;overflow-x: hidden;'}

`;

export { TitleDiv, BrandDiv, PriceDiv, InfoDiv, ShoppingCartItemDiv, ShoppingCartImageDiv, ShoppingCartQuantityDiv, ColorSizeSpan, ShoppingCartListDiv };