import React from 'react';
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import {store} from './store/store';
import { Page } from './components/Page';


const client = new ApolloClient({
  uri: 'http://it2810-46.idi.ntnu.no:4001/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  
  return (
    <Provider store={store}>
    <ApolloProvider client={client}>
          <Page />
    </ApolloProvider>
    </Provider>
  );
}


export default App;
