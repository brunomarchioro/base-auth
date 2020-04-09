import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"

const usePrivateRoute = () => {
  const router = useRouter()
  const { isAuthenticated, loading, user, redirectTo } = useAuth()

  useEffect(() => {
    console.log("usePrivateRoute", { loading, isAuthenticated })
    if (!loading && !isAuthenticated) {
      redirectTo(router.asPath)
      router.push("/login")
    }
  }, [isAuthenticated, loading])

  return { isAuthenticated, user }
}

export default usePrivateRoute
