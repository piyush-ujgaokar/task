import UserRow from "./UserRow"

const UserTable = ({users,handleDelete}) => {

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        {
          users.map((user) => (
            <UserRow key={user._id} user={user} handleDelete={handleDelete}/>
          ))
        }

      </tbody>

    </table>
  )
}

export default UserTable