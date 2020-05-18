import React from "react"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"

export const initApolloClient = () => {
  console.log("[client] - creating apollo client")

  return new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin"
    }),
    cache: new InMemoryCache()
  })
}


