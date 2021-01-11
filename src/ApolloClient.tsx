import {ApolloClient, InMemoryCache} from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://homework.nextbil.com/graphql",
    cache: new InMemoryCache()
});

export default apolloClient;
