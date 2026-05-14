import DashboardLayout from "../../dashboard/layouts/DashboardLayout"

import useUsers from "../hooks/useUsers"

const UsersPage = () => {

  const {users,loading} = useUsers()

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl mb-5">
        Users
      </h1>

      {
        users.map((user) => (
          <div key={user._id} className="border p-3 mb-3">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        ))
      }

    </DashboardLayout>
  )
}

export default UsersPage