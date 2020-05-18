import gql from "graphql-tag"
import Link from "next/link"
import React from "react"
import initApolloSchemaClient from "../../api/schemaClient"

const postsQuery = gql`
  {
    authenticatedUser {
      fullName
      email
    }
    posts {
      postId
      title
    }
  }
`

const PostListPage = ({ posts }) => (
  <div>
    <h1>Post list</h1>
    <ul>
      {posts.map(post => (
        <li key={post.postId}>
          <Link href={"/posts/[postId]"} as={`/posts/${post.postId}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export async function getStaticProps() {
  const apolloClient = await initApolloSchemaClient()

  const { data } = await apolloClient.query({
    query: postsQuery
  })

  console.log(data)

  return {
    unstable_revalidate: 1,
    props: { posts: data.posts }
  }
}

export default PostListPage
