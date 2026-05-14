import {createContext,useEffect,useState} from "react"

import { getme } from "../services/auth.api"

export const AuthContext =createContext()

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =useState(null)

  const [loading, setLoading] =useState(true)

  const [isAuthenticated,setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          const data =await getme()
          setUser(data.user)
          setIsAuthenticated(true)
        } catch (error) {
          console.log(error)
          setUser(null)
          setIsAuthenticated(false)
        } finally {

          setLoading(false)
        }
      }

    fetchUser()

  }, [])

  return (

    <AuthContext.Provider value={{user,setUser,loading,setLoading,isAuthenticated,setIsAuthenticated
      }}
    >
      {children}

    </AuthContext.Provider>
  )
}