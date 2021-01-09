import {ApolloClient, InMemoryCache} from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "http://homework.nextbil.com/graphql",
    cache: new InMemoryCache()
});

export default apolloClient;
