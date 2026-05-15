import { Link } from "react-router-dom";

const TaskRow = ({ task, handleDelete }) => {
  return (
    <tr>
      <td>
        <Link to={`/tasks/${task._id}`}>{task.title}</Link>
      </td>

      <td>{task.status}</td>
      <td>{task.priority}</td>
      <td>{task.assignedTo?.name}</td>
      <td>
        <button>Edit</button>

        <button onClick={() => handleDelete(task._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskRow;
