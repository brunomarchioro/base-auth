import gql from "graphql-tag"
import initApolloSchemaClient from "../../api/schemaClient"

const postQuery = gql`
  query post($postId: Int!) {
    scope {
      post(postId: $postId) {
        postId
        title
        content
      }
    }
  }
`

const PostShowPage = ({ post }) => (
  <div>
    <h1>Post</h1>
    <h2>{post?.title}</h2>
    <p>{post?.content}</p>
  </div>
)

export async function getStaticProps(ctx) {
  const { postId } = ctx.params
  const apolloClient = await initApolloSchemaClient()

  const { data } = await apolloClient.query({
    query: postQuery,
    variables: { postId: parseInt(postId, 10) }
  })

  return {
    unstable_revalidate: 1,
    props: { post: data.scope.post }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export default PostShowPage
