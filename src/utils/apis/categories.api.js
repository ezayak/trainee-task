const CATEGORIES_LIST = `
    query{
        categories {
            name
        }
    }
`;

const getCategories = () => fetch('http://localhost:4000/graphql', {
    method: 'POST',
    body: JSON.stringify({
        query: CATEGORIES_LIST,
    }),
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => {
        if (data.data !== null) {
            return data.data.categories;
        }
        return [];
    });

export { getCategories };
