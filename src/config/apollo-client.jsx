import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://first-ghoul-30.hasura.app/v1/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "x-hasura-admin-secret":
      "grqaD0ZXMqmeG4E7hXGAVxLXw6nu53SFEa0oSs2qWAHJs5t45OD0wmhDke5B1161",
  },
});
