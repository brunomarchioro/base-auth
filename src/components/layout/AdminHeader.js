import Link from "next/link"
import { useAuth } from "../../lib/contexts/AuthContext"

const AdminHeader = () => {
  const { user } = useAuth()

  return (
    <ul className="header">
      <li>{user?.fullName}</li>
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
      <li>
        <Link href={"/logout"}>
          <a>logout</a>
        </Link>
      </li>

      {/*language=CSS*/}
      <style jsx>{`
        .header {
          display: flex;
          list-style: none;
        }

        li {
          margin-right: 8px;
        }
      `}</style>
    </ul>
  )
}

export default AdminHeader
