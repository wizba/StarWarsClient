import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from 'antd';
import {createUseStyles} from 'react-jss'
import HomePage from './pages/Home/HomePage';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:3000/dev/graphql',
  cache: new InMemoryCache()
});

function App() {
    return (
      <ApolloProvider client={client}>
    <div className="App" >
       <HomePage/>

    </div>
    </ApolloProvider>
  );
}

export default App;
