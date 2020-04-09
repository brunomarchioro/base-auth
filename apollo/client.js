import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

let globalApolloClient = null

export function initApolloClient(ctx = {}, initialState= {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(ctx, initialState)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(ctx, initialState)
  }

  return globalApolloClient
}

function createApolloClient(ctx, initialState) {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(initialState)

  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(ctx),
    cache,
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
