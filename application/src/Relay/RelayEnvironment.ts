import {
    Environment,
    FetchFunction,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
  
const fetchQuery: FetchFunction = async (operation, variables) => {
    console.log(`fetching query ${operation.name} with ${JSON.stringify(variables)}`);
    const response = await fetch('http://localhost:808/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    });
    return await response.json();
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;