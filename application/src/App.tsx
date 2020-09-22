import React from 'react';
import './App.css';
import { graphql } from 'react-relay/hooks'
import RelayEnvironment from './Relay/RelayEnvironment'
import {
  RelayEnvironmentProvider,
  preloadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks'
import ArticleComponent from './components/ArticleComponent';

const { Suspense } = React;

const RepositoryNameQuery = graphql`
  query AppQuery{
    articles{
      id
    }
  }
`;

const preloadedQuery = preloadQuery(RelayEnvironment, RepositoryNameQuery, {id: 1});


function  App(props: any) {
  const data: any = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery);
  return (
    <div className="App">
      <header className="App-header">
        Какой-то хэдер
      </header>
      <ArticleComponent info={data}/>
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
