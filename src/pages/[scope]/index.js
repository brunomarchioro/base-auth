import gql from "graphql-tag"
import { useRouter } from "next/router"
import initApolloSchemaClient from "../../api/schemaClient"

const scopeQuery = gql`
  query scope($codename: String!) {
    scope(codename: $codename) {
      scopeId
      codename
      name
    }
    posts(scopeCodename: $codename) {
      postId
      title
    }
  }
`

const scopesQuery = gql`
  query {
    scopes {
      scopeId
      codename
      name
    }
  }
`

const Scope = ({ scope }) => {
  return (
    <div>
      <h1>{scope.name}</h1>
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
    props: { scope: data.scope }
  }
}

export async function getStaticPaths() {
  const apolloClient = await initApolloSchemaClient()

  const { data } = await apolloClient.query({
    query: scopesQuery
  })

  return {
    paths: data.scopes.map(scope => ({ params: { scope: scope.codename } })),
    fallback: true
  };
}

export default Scope
