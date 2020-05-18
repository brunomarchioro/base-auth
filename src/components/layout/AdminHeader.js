import Link from "next/link"
import { useAuth } from "../../lib/contexts/AuthContext"

const AdminHeader = () => {
  const { user } = useAuth()

  return (
    <div className="header">
      <p>
        Área administrativa
      </p>

      <ul>
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
      </ul>

      {/*language=CSS*/}
      <style jsx>{`
        .header {
          background-color: red;
          padding: 5px 10px;
        }

        ul {
          display: flex;
          list-style: none;
          padding: 0;
        }

        li {
          margin-right: 8px;
        }
      `}</style>
    </div>
  )
}

export default AdminHeader
