import React, { Component } from 'react';
import MainRouter from './router/MainRouter'
import { Container } from 'reactstrap'
import { ApolloProvider } from 'react-apollo'
import { client } from './utils/utils'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container style={{ height: '100vh' }}>
          <MainRouter />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
