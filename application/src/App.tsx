import React from 'react';
import './App.css';
import { graphql, QueryRenderer } from 'react-relay'
import graphql from 'babel-plugin-relay'
import environment from './Relay/emvironment'



function App() {
  return (
    <div className="App">
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery($id: ID){
            author(id: $id){
              id
            }
          }
        `}
        variables={{
          id: '5f5b48ecf9ab6f7548c30d83'
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          console.log(props);
          return <div>See props in console log </div>;
        }}

      />
    </div>
  );
}

export default App;
