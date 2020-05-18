import Link from "next/link"
import React from "react"

const SiteMenu = () => (
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

    {/*language=CSS*/}
    <style jsx>{`
      .menu {
        display: flex;
        list-style: none;
      }

      li {
        margin-right: 8px;
      }
    `}</style>
  </ul>
)

export default SiteMenu
