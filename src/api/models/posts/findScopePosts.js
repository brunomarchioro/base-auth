import SQL from "sql-template-strings"

export default async function getScopePosts(scopeCodename, db) {
  try {
    console.log("fetch post list")

    const query = SQL`SELECT *
                      FROM posts`
    if (scopeCodename) {
      query.append(SQL`
            LEFT JOIN posts_x_scopes on posts.id = posts_x_scopes.postId
            LEFT JOIN scopes on posts_x_scopes.scopeId = scopes.id
            WHERE
            scopes.codename = ${scopeCodename}
          `)
    }
    return db.all(query)

  } catch (error) {
    console.error(error)
  }
}
