
import {useContext} from "react"
import {AuthContext} from "../auth.context"
import {registerUser,loginUser,logoutUser} from "../services/auth.api"
import {useNavigate} from "react-router-dom"

export const useAuth = () => {

  const navigate = useNavigate()
  const context =useContext(AuthContext)
  const {user,setUser,loading,setLoading,isAuthenticated,setIsAuthenticated} = context

  // LOGIN

  const handleLogin =async ({email,password}) => {
      setLoading(true)
      try {
        const data =await loginUser({ email,password})
        // save token
        localStorage.setItem(
          "token",
          data.token
        )

        setUser(data.user)
        setIsAuthenticated(true)

        // role redirect

        if (data.user.role === "Super Admin") {
          navigate("/dashboard/super-admin")
        }
        else if (data.user.role === "Admin") {
          navigate("/dashboard/admin")
        }
        else if (data.user.role === "Manager") {
          navigate("/dashboard/manager")
        }
        else {
          navigate("/dashboard/employee")
        }

      } catch (error) {
        const msg = (error && error.message) ? error.message : (typeof error === 'string' ? error : 'Login failed')
        alert(msg)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  // REGISTER

  const handleRegister =async ({name,email,password,role,reportsTo}) => {
      setLoading(true)
      try {
        const data =await registerUser({name,email,password,role,reportsTo})
        return data

      } catch (error) {
        const msg = (error && error.message) ? error.message : (typeof error === 'string' ? error : 'Registration failed')
        alert(msg)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  // LOGOUT

  const handleLogout =async () => {
    setLoading(true)
      try {
        await logoutUser()
        localStorage.removeItem(
          "token"
        )
        setUser(null)
        setIsAuthenticated(false)
        navigate("/")

      } catch (error) {
        const msg = (error && error.message) ? error.message : (typeof error === 'string' ? error : 'Logout failed')
        alert(msg)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  return {user,loading,isAuthenticated,handleLogin,handleRegister,handleLogout}

}