import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useRouter } from 'next/router'

const postQuery = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      postId
      title
      body
    }
  }
`

function PostShowPage() {
  const router = useRouter()
  const { postId } = router.query
  const { loading, data } = useQuery(postQuery, {
    variables: { postId },
    skip: !postId
  });

  if (loading) return 'Loading...';

  return (
    <div>
      <h1>Post (client)</h1>
      <h2>{data?.post?.title}</h2>
      <p>{data?.post?.body}</p>
    </div>
  )
}

export default PostShowPage
