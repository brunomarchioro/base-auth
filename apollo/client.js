import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

let globalApolloClient = null

export function initApolloClient(ctx = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    console.log('[server] - creating apollo client')
    return createApolloClient(ctx)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    console.log('[client] - creating apollo client')
    globalApolloClient = createApolloClient(ctx)
  }

  console.log('[client] - reusing apollo client')
  return globalApolloClient
}

function createApolloClient(ctx) {
  const ssrMode = typeof window === 'undefined'

  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(ctx),
    cache: new InMemoryCache()
  })
}

function createIsomorphLink(ctx) {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('apollo-link-schema')
    const { schema } = require('./schema')
    return new SchemaLink({ schema, context: ctx })
  } else {
    const { HttpLink } = require('apollo-link-http')

    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
  }
}
