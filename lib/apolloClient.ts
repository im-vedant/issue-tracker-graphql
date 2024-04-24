import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { errorLink } from './error';
const httpLink = createHttpLink({
  uri: 'https://main.d2gs6danr36tqd.amplifyapp.com/api/graphql',
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;
