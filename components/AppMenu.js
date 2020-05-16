import Link from "next/link"
import React from "react"
import { useAuth } from "../lib/contexts/AuthContext"

const AppMenu = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <ul className="menu">
      <li>
        <Link href="/">
          <a>home</a>
        </Link>
      </li>
      <li>
        <Link href={"/about"}>
          <a>about</a>
        </Link>
      </li>
      <li>
        <Link href={"/contact"}>
          <a>contact</a>
        </Link>
      </li>
      <li>
        <Link href={"/profile"}>
          <a>profile</a>
        </Link>
      </li>
      <li>
        <Link href={"/posts"}>
          <a>posts</a>
        </Link>
      </li>
      {isAuthenticated && (
        <li>
          <Link href={"admin/posts/new"}>
            <a>new post</a>
          </Link>
        </li>
      )}

      {/*language=CSS*/}
      <style jsx>{`
        .menu {
          display: flex;
          list-style: none;
        }

        .menu li {
          margin-right: 8px;
        }
      `}</style>
    </ul>
  )
}

export default AppMenu
