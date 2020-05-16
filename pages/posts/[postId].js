import gql from "graphql-tag"
import { initApolloClient } from "../../apollo/client"

const postQuery = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      postId
      title
      body
    }
  }
`

function PostShowPage({ post }) {
  return (
    <div>
      <h1>Post</h1>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </div>
  )
}

export async function getStaticProps(ctx) {
  const { postId } = ctx.params
  const apolloClient = initApolloClient(ctx)

  const { data } = await apolloClient.query({
    query: postQuery,
    variables: { postId }
  })

  return { props: { post: data.post } }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export default PostShowPage
