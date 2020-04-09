import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import usePrivateRoute from "../lib/hooks/auth/usePrivateRoute"

const userQuery = gql`
  {
    user {
      id
      email
    }
  }
`

const Profile = () => {
  const { isAuthenticated } = usePrivateRoute()
  const { data, loading } = useQuery(userQuery, {
    skip: !isAuthenticated
  })

  if (loading) return <p>Loading...</p>

  if (data?.user) {
    return (
      <div>
        <h1>Profile</h1>
        <p>{data.user.email}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile
