import { onError } from '@apollo/client/link/error';


export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.error(`GraphQL Error: ${message}`);
      // Here, you can handle the error, e.g., display a message to the user
    });
  }

  if (networkError) {
    console.error(`Network Error: ${networkError}`);
    // Handle network errors, e.g., show a notification to the user
  }
});


