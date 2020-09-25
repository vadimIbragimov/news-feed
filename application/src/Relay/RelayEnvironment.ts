import {
    Environment,
    FetchFunction,
    Network,
    RecordSource,
    Store,
    
} from 'relay-runtime'
  


const getEnvironment: (url: string) => Environment = (url)=>{
    const fetchQuery: FetchFunction = async (operation, variables) => {
        console.log(`fetching query ${operation.name} with ${JSON.stringify(variables)}`);
        const response = await fetch(url , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: operation.text,
                variables,
            }),
        });
        return await response.json()
    }

    const environment = new Environment({
        network: Network.create(fetchQuery),
        store: new Store(new RecordSource()),
    
    })
    return environment
};

export default getEnvironment