'use client'
import { QueryClient ,QueryClientProvider as ClientProvider} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import client from '@/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
const queryClient=new QueryClient()
const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
   <ClientProvider client={queryClient} >
   <ApolloProvider client={client}>
   {children}
   </ApolloProvider>
   </ClientProvider>
  )
}

export default QueryClientProvider