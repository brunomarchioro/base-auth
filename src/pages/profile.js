import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import usePrivateRoute from "../lib/hooks/auth/usePrivateRoute"

const userQuery = gql`
  {
    viewer {
      fullName
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

  if (data?.viewer) {
    return (
      <div>
        <h1>Profile</h1>
        <p>{data.viewer.fullName}</p>
        <p>{data.viewer.email}</p>
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
