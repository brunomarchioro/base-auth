import Link from "next/link"
import { Fragment } from "react"
import { useAuth } from "../lib/contexts/AuthContext"

const AppHeader = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <ul className="app-header">
      {isAuthenticated ? (
        <Fragment>
          <li>{user?.fullName}</li>
          <li>
            <Link href={"/posts/new"}>
              <a>new post</a>
            </Link>
          </li>
          <li>
            <Link href={"/logout"}>
              <a>logout</a>
            </Link>
          </li>
        </Fragment>
      ) : (
        <li>
          <Link href={"/login"}>
            <a>login</a>
          </Link>
        </li>
      )}

      {/*language=CSS*/}
      <style jsx>{`
        .app-header {
          display: flex;
          list-style: none;
        }

        .app-header li {
          margin-right: 8px;
        }
      `}</style>
    </ul>
  )
}

export default AppHeader