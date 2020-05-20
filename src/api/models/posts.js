import SQL from "sql-template-strings"

export const getPublicPosts = () => {

}

export const getPrivatePosts = async ({ auth }, db) => {
  console.log(auth.user.permissions.map(p => `'${p.scope}'`).join(','))
  return db.all(SQL`
      SELECT
          *
      FROM posts
               LEFT JOIN posts_x_scopes on posts.id = posts_x_scopes.postId
               LEFT JOIN scopes on posts_x_scopes.scopeId = scopes.id
      WHERE
          scopes.codename IN
  `.append(`(${auth.user.permissions.map(p => `'${p.scope}'`).join(',')})`))
}
