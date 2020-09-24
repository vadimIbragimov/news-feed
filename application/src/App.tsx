import React from 'react';
import './App.css';
import { graphql } from 'react-relay'
import { Environment } from 'relay-runtime'
import getEnvironment from './Relay/RelayEnvironment'
import {
    RelayEnvironmentProvider,
    loadQuery as lq,
    usePreloadedQuery,
} from 'react-relay/hooks'
import ArticleComponent from './components/ArticleComponent';

const { Suspense } = React;

const RepositoryNameQuery = graphql`
  query AppQuery{
    news{
      id
    }
  }
`;
const RelayEnvironment = getEnvironment('http://localhost:808/graphql') as Environment
console.log('[App]: RelayEnvironment instanceof Environment? ', RelayEnvironment instanceof Environment)
console.log(lq);
const preloadedQuery = lq.loadQuery(RelayEnvironment, RepositoryNameQuery, {});

function App(props: any) {
    const data: any = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery);
    return (
        <div className="App">
            <header className="App-header">
                Какой-то хэдер
      </header>
            <ArticleComponent info={data} />
        </div>
    );
}

function AppRoot(props: any) {
    return (
        <RelayEnvironmentProvider environment={RelayEnvironment}>
            <Suspense fallback={'Loading...'}>
                <App preloadedQuery={preloadedQuery} />
            </Suspense>
        </RelayEnvironmentProvider>
    );
}

export default AppRoot;