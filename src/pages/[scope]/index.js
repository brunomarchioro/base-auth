import gql from "graphql-tag"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import initApolloSchemaClient from "../../api/schemaClient"

const scopeQuery = gql`
  query scope($codename: String!) {
    scope(codename: $codename) {
      id
      codename
      name
    }
    posts(scopeCodename: $codename) {
      id
      title
    }
  }
`

const scopesQuery = gql`
  query {
    scopes {
      id
      codename
      name
    }
  }
`

const Scope = ({ scope, posts }) => {
  return (
    <div>
      <h1>{scope.name}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={"/posts/[id]"} as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps(ctx) {
  const { scope } = ctx.params
  const apolloClient = await initApolloSchemaClient()

  const { data } = await apolloClient.query({
    query: scopeQuery,
    variables: { codename: scope }
  })

  console.log(data)

  return {
    unstable_revalidate: 1,
    props: {
      scope: data.scope,
      posts: data.posts
    }
  }
}

export async function getStaticPaths() {
  const apolloClient = await initApolloSchemaClient()

  const { data } = await apolloClient.query({
    query: scopesQuery
  })

  return {
    paths: data.scopes.map(scope => ({ params: { scope: scope.codename } })),
    fallback: false
  };
}

export default Scope
