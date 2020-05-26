import Link from "next/link"
import { useAuth } from "lib/contexts/AuthContext"

const AdminHeader = () => {
  const { user } = useAuth()

  return (
    <header>
      <h1>
        base-app admin
      </h1>

      <nav>
        <ul>
          <li>
            <Link href={"/"}>
              <a>site</a>
            </Link>
          </li>
          <li>
            <Link href={"/admin"}>
              <a>admin</a>
            </Link>
          </li>
          <li>
            <Link href={"/admin/posts"}>
              <a>posts</a>
            </Link>
          </li>
          <li>{user?.fullName}</li>
          <li>
            <Link href={"/logout"}>
              <a>logout</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AdminHeader
