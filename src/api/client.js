import React from "react"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import toSnakeCase from "to-snake-case"

export const dataIdFromObject = (object) => {
  // switch (object.__typename) {
  //   case 'Post': return `${object.__typename}.${object.postId}`;
  //   case 'Scope': return `${object.__typename}.${object.scopeId}`;
  //   case 'User': return `${object.__typename}.${object.userId}`;
  //   case 'Viewer': return `${object.__typename}.${object.reportId}`;
  //
  //   default: return defaultDataIdFromObject(object); // fall back to default handling
  // }

  const objectIdName = `${toSnakeCase(object.__typename)}Id`
  return `${object.__typename}.${object[objectIdName]}`
}

export const initApolloClient = () => {
  console.log("[client] - creating apollo client")

  return new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin"
    }),
    cache: new InMemoryCache({ dataIdFromObject })
  })
}


