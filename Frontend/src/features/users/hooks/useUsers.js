import {useEffect,useState} from "react"

import {getUsers,updateUser,deleteUser} from "../services/users.api"

const useUsers = () => {
  const [users, setUsers] =useState([])

  const [loading, setLoading] =useState(true)

  const fetchUsers =async () => {
      try {

        const data =await getUsers()
        setUsers(data.users)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete =async (id) => {
      try {
        await deleteUser(id)
        fetchUsers()
      } catch (error) {
        console.log(error)
      }
    }

  return {
    users,
    loading,
    handleDelete
  }
}

export default useUsers