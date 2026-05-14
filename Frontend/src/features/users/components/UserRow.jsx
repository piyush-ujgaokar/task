import {Link} from "react-router-dom"

const UserRow = ({user,handleDelete}) => {

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>

        <Link to={`/users/edit/${user._id}`}>Edit</Link>

        <button onClick={() =>
            handleDelete(user._id)
          }
        >Delete</button>

      </td>

    </tr>
  )
}

export default UserRow