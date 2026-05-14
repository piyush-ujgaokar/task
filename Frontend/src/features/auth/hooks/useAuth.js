// import { useContext } from "react"
// import { AuthContext } from "../auth.context"
// import { loginUser } from "../services/auth.api"



// export const useAuth=()=>{

//     const context=useContext(AuthContext)

//     const {user,setUser,loading,setLoading,isAuthenticated,setIsAuthenticated}=context


//     const handleLogin=async ({email,password})=>{
//         setLoading(true)
//         try{
//             const data=await loginUser({email,password})
//             setUser(data.user)
//             setIsAuthenticated(true)
//         }catch(error){
//             console.log(error)
//         }finally{
//         setLoading(false)
//         }
//     }

//     const handleRegister=async ({name,email,password,role,reportsTo})=>{
//         setLoading(true)
//         try{
//             const data=await registerUser({name,email,password,role,reportsTo})
//             setUser(data.user)
//             setIsAuthenticated(true)
//         }catch(error){
//             console.log(error)
//         }finally{
//         setLoading(false)
//         }
//     }

//     const handleLogout=async()=>{
//         setLoading(true)    
//         try{
//             await logoutUser()
//             setUser(null)
//             setIsAuthenticated(false)
//         }catch(error){
//             console.log(error)
//         }finally{
//         setLoading(false)
//         }
//     }

//     return {
//         user,
//         loading,    
//         isAuthenticated,
//         handleLogin,
//         handleRegister,
//         handleLogout
//     }

// }



import {useContext} from "react"

import {AuthContext} from "../context/auth.context"

import {register,login,logout} from "../services/auth.api"

import {useNavigate} from "react-router-dom"

export const useAuth = () => {

  const navigate = useNavigate()
  const context =useContext(AuthContext)
  const {user,setUser,loading,setLoading,isAuthenticated,setIsAuthenticated} = context

  // LOGIN

  const handleLogin =async ({email,password}) => {
      setLoading(true)
      try {
        const data =await login({ email,password})

        // save token

        localStorage.setItem(
          "token",
          data.token
        )

        setUser(data.user)
        setIsAuthenticated(true)

        // role redirect

        if (data.user.role ==="Super Admin") {
          navigate("/super-admin")
        }

        else if (data.user.role ==="Admin") {
          navigate("/admin")
        }

        else if (data.user.role ==="Manager") {
          navigate("/manager")
        }

        else {navigate("/employee")}

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  // REGISTER

  const handleRegister =async ({name,email,password,role,reportsTo}) => {
      setLoading(true)
      try {
        const data =await register({name,email,password,role,reportsTo})
        return data

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  // LOGOUT

  const handleLogout =async () => {
    setLoading(true)
      try {
        await logout()
        localStorage.removeItem(
          "token"
        )
        setUser(null)
        setIsAuthenticated(false)
        navigate("/")

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  return {user,loading,isAuthenticated,handleLogin,handleRegister,handleLogout}

}