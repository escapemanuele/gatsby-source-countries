const fetch = require('node-fetch');

exports.sourceNodes = async ({
    actions,
    createNodeId,
    createContentDigest
}) => {
    const NODE_TYPE = 'Country';
    const API = `https://restcountries.eu/rest/v2`

    const response = await fetch(API);

    const countries = await response.json();
    countries.forEach((country) => {
        actions.createNode({
            ...country,
            id: createNodeId(`${NODE_TYPE}-${country.numericCode}`),
            parent: null,
            children: [],
            internal: {
                type: NODE_TYPE,
                content: JSON.stringify(country),
                contentDigest: createContentDigest(country)
            }
        });
    })
}