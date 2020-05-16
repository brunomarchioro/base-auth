import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Link from "next/link"
import React from "react"

const postsQuery = gql`
  {
    posts {
      postId
      title
    }
  }
`

function PostListPage() {
  const { loading, data } = useQuery(postsQuery);

  if (loading) return 'Loading...';

  return (
    <div>
      <h1>Post (client)</h1>
      <ul>
        {data?.posts.map(post => (
          <li key={post.postId}>
            <Link href={"/posts/[postId]"} as={`/posts/${post.postId}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostListPage
