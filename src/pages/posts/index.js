import gql from "graphql-tag"
import Link from "next/link"
import React from "react"
import initApolloSchemaClient from "../../api/schemaClient"

const postsQuery = gql`
  {
    scope {
      posts {
        id
        title
      } 
    }
  }
`

const PostListPage = ({ posts }) => (
  <div>
    <h1>Post list</h1>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={"/posts/[id]"} as={`/posts/${post.id}`}>
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

  return {
    unstable_revalidate: 1,
    props: { posts: data.scope.posts }
  }
}

export default PostListPage
