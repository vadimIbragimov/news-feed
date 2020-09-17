import React from 'react';
import './App.css';
import {graphql, QueryRenderer} from 'react-relay'
import environment from './Relay/emvironment'



function App() {
  return (
    <div className="App">
      <h1>
        Hello world!!!
      </h1>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserQuery {
            viewer {
              id
            }
          }
        `}
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>User ID: {props.viewer.id}</div>;
        }}
      />
    </div>
  );
}

export default App;
