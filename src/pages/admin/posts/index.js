import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Link from "next/link"
import React from "react"

const postsQuery = gql`
  {
    viewer {
      posts {
        entries {
          postId
          title
        }
      }
    }
  }
`

const AdminPostsListPage = () => {
  const { loading, data } = useQuery(postsQuery)

  if (loading) return "Loading..."

  console.log(data)

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
        {data?.viewer?.posts?.entries?.map(post => (
          <li key={post.postId}>
            <Link href={"/admin/posts/[postId]"} as={`/admin/posts/${post.postId}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPostsListPage
