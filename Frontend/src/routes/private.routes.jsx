import {Navigate} from "react-router-dom"

import { useAuth }from "../features/auth/hooks/useAuth"

const PrivateRoute = ({children,allowedRoles}) => {

  const {user,loading,isAuthenticated} = useAuth()

  // loading state

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  // not logged in

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" />
    )
  }

  // role check

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return (
      <h1>
        Access Denied
      </h1>
    )
  }

  return children
}

export default PrivateRoute