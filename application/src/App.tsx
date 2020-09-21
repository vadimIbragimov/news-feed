import React from 'react';
import './App.css';
import { graphql, QueryRenderer } from 'react-relay'
import environment from './Relay/emvironment'

const query = graphql`
  query AppQuery($id: ID){
    author(id: $id){
      id
    }
  }
`
interface Props {
  error: Error | null;
  props: any;
}

const renderComponent = ({ error, props }: Props) => {
  if(error) {
    return <div>Error!</div>
  }
  if(!props) {
    return <div>Loading..</div>
  }
  console.log('[renderComponent] : error ', error, ', props', props)
  return <div>See props in console log </div>
};

function App() {
  return (
    <div className="App">
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{
          id: '5f5b48ecf9ab6f7548c30d83'
        }}
        render={renderComponent}
      />
    </div>
  );
}

export default App;
