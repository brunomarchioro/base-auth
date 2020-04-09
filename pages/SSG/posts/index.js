import gql from "graphql-tag"
import Link from "next/link"
import React from "react"
import { initApolloClient } from "../../../apollo/client"

const postsQuery = gql`
  {
    posts {
      id
      title
    }
  }
`

function PostListPage({ posts }) {
  return (
    <div>
      <h1>Post (SSG)</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={"/SSG/posts/[id]"} as={`/SSG/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps(ctx) {
  const apolloClient = initApolloClient(ctx)

  const { data } = await apolloClient.query({
    query: postsQuery
  })

  return { props: { posts: data.posts } }
}

export default PostListPage
