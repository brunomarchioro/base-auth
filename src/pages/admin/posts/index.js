import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Link from "next/link"
import React from "react"

const postsQuery = gql`
  {
    posts {
      id
      title
    }
  }
`

const AdminPostsListPage = () => {
  const { loading, data } = useQuery(postsQuery);

  if (loading) return 'Loading...';

  return (
    <div>
      <h1>Post</h1>
      <ul>
        <li>
          <Link href={"/admin/posts/new"}>
            <a>new post</a>
          </Link>
        </li>
      </ul>
      <ul>
        {data?.posts.map(post => (
          <li key={post.id}>
            <Link href={"/admin/posts/[id]"} as={`/admin/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPostsListPage
