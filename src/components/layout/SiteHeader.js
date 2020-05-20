import Link from "next/link"
import { Fragment } from "react"
import { useAuth } from "../../lib/contexts/AuthContext"

const SiteHeader = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <header>
      <h1>base-app</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href={"/posts"}>
              <a>posts</a>
            </Link>
          </li>
          <li>
            <Link href={"/erechim"}>
              <a>Campus Erechim</a>
            </Link>
          </li>

          {isAuthenticated ? (
            <Fragment>
              <li>{user?.fullName}</li>
              <li>
                <Link href={"/admin"}>
                  <a>admin</a>
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
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
