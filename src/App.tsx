import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/Home/HomePage';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
const URL = "https://y0e7u0o2zf.execute-api.us-east-1.amazonaws.com/dev/graphql";

const client = new ApolloClient({
  uri: URL,
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
