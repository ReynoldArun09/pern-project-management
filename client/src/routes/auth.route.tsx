import useAuth from "@/hooks/useAuth"
import { Outlet, useLocation, Navigate } from "react-router-dom"
import { isAuthRoute } from "./common/routePaths"


export default function AuthRoute() {
  const location = useLocation()
  const { data: authData, isLoading } = useAuth()
  console.log(authData)
  const user = authData?.data
  const _isAuthroute = isAuthRoute(location.pathname)


  if (isLoading && !_isAuthroute) {
    return <h1>Loading..</h1>
  }

  if (!user) {
    return <Outlet />
  }


  return <Navigate to={`workspace/${user.currentWorkspaceId}`} />

}

