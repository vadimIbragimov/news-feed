import React from 'react';
import './App.css';
import { graphql } from 'react-relay'
import { Environment, GraphQLTaggedNode } from 'relay-runtime'
import getEnvironment from './Relay/RelayEnvironment'
import {
    RelayEnvironmentProvider,
    loadQuery as lq,
    preloadQuery,
    usePreloadedQuery,
    PreloadedQuery
} from 'react-relay/hooks'
import ArticleComponent from './components/ArticleComponent';

const { Suspense } = React;

const RepositoryNameQuery = graphql`
  query AppQuery{
    news{
      id
      heading
      text
      author{
          nickname
      }
    }
  }
`
const RelayEnvironment = getEnvironment('http://localhost:808/graphql')
const preloadedQuery = lq.loadQuery(RelayEnvironment, RepositoryNameQuery, {})


const App = (props: {preloadedQuery: any}): JSX.Element =>{
    const data: any = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery)
    return (
        <div className="App">
            <header className="App-header">
                Новости для любителя json
      </header>
            <ArticleComponent info={data} />
        </div>
    );
}

const AppRoot = (): JSX.Element => {
    return (
        <RelayEnvironmentProvider environment={RelayEnvironment}>
            <Suspense fallback={'Loading...'}>
                <App preloadedQuery={preloadedQuery} />
            </Suspense>
        </RelayEnvironmentProvider>
    );
}



export default AppRoot;