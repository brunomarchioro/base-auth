import gql from "graphql-tag"
import React from "react"
import { initApolloClient } from "../../../apollo/client"

const postQuery = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`

function PostShowPage({ post }) {
  return (
    <div>
      <h1>Post (SSR)</h1>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params
  const apolloClient = initApolloClient(ctx)

  const { data } = await apolloClient.query({
    query: postQuery,
    variables: { id }
  })

  return { props: { post: data.post } }
}

export default PostShowPage
