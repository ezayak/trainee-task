const CURRENCY_LIST = `
    query{
        currencies {
            label, symbol
        }
    }
`;

const getCurrencies = () => {
    return fetch('http://localhost:4000/graphql', {
        method: "POST", 
        body: JSON.stringify({
            query: CURRENCY_LIST
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then( response => response.json() )
        .then(data => {
            if (data.data !== null) {
                return data.data.currencies;
            } else {
                return [];
            }
    })    
}

export { getCurrencies };