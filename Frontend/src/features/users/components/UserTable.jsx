import UserRow from "./UserRow"

const UserTable = ({users, handleDelete}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Name</th>
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Email</th>
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Role</th>
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <UserRow key={user._id} user={user} handleDelete={handleDelete}/>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="py-8 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable