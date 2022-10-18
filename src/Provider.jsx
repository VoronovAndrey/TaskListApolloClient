import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})



const Provider = (props) =>  {
  return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
  )
}

export default Provider