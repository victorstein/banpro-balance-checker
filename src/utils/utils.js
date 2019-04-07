import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'https://banpro-api.herokuapp.com/graphql'
})