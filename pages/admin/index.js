import usePrivateRoute from "../../lib/hooks/auth/usePrivateRoute"

const Profile = () => {
  const { user } = usePrivateRoute()

  if (user) {
    return (
      <div>
        <h1>Admin</h1>
        <p>{user.fullName}</p>
        <p>{user.email}</p>
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
