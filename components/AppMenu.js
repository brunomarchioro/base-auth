import Link from "next/link"
import React from "react"

const AppMenu = () => {
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
        <Link href={"/SSG/posts"}>
          <a>posts (SSG)</a>
        </Link>
      </li>
      <li>
        <Link href={"/SSR/posts"}>
          <a>posts (SSR)</a>
        </Link>
      </li>
      <li>
        <Link href={"/posts"}>
          <a>posts (client)</a>
        </Link>
      </li>

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
