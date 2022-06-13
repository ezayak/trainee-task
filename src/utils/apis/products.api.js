const CATEGORY_PRODUCT_LIST = `
    query($input: CategoryInput){
        category(input: $input) {
            name,
            products {
                id,
                name,
                brand,
                inStock,
                description,
                category,
                attributes {
                id,
                name,
                type,
                items {
                    displayValue,
                    value,
                    id
                }
                }
                gallery,
                prices {
                currency {symbol, label},
                amount
                }
            }
        }
    }
`;

const PRODUCT_INFO = `
    query($id: String!) {
        product(id: $id) {
            id,
            name,
            inStock,
            gallery,
            description,
            category,
            attributes {
                id,
                name,
                type,
                items {
                    id,
                    displayValue,
                    value
                }
            },
            prices {
                amount,
                currency {
                    label,
                    symbol
                }
            },
            brand
        }
    }
`;

const getProductListByCategory = (categoryName) => {
    return fetch('http://localhost:4000/graphql', {
        method: "POST", 
        body: JSON.stringify({
            query: CATEGORY_PRODUCT_LIST,
            variables: { "input": { "title": categoryName } }
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then( response => response.json() )
        .then(data => {
            if (data.data !== null) {
                return formatDataArray(data.data.category.products);
            } else {
                return [];
            }
    })
};


const getProductById = (id) => {
    return fetch('http://localhost:4000/graphql', {
        method: "POST", 
        body: JSON.stringify({
            query: PRODUCT_INFO,
            variables: { "id": id }
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then( response => response.json() )
        .then(data => {
            if (data.data !== null) {
                return formatItem(data.data.product);
            } else {
                return [];
            }
    })
};

const formatDataArray = (data) => { 
    const newData = data.map(item => {
        return formatItem(item);
    });

    return newData;
}

const formatItem = (item) => {
    return {
        id: item.id,
        name: item.name,
        inStock: item.inStock,
        description: item.description,
        category: item.category,
        brand: item.brand ? item.brand : '',
        title: (item.brand ? item.brand + ' ' : '') + item.name,
        sizes: getAttributeArray(item.attributes, 'text'),
        colors: getAttributeArray(item.attributes, 'swatch'),
        images: item.gallery,
        prices: item.prices,
        price: 0
    };
}

const getAttributeArray = (attributes, type) => { 
    const attributesFilter = attributes.filter(attribute => { 
        return attribute.type === type;
    });

    const res = [];

    attributesFilter.forEach(attribute => { 
        const items = attribute.items.map((item, index) => {
            if (index === 0) {
                return { ...item, selected: true };
            } else {
                return { ...item, selected: false };
            }
        });

        res.push({id: attribute.id, name: attribute.name, items: items});
    });

    return res;
}

export { getProductListByCategory, getProductById };