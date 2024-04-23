import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { errorLink } from './error';
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api/graphql',
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;