import TaskRow from "./TaskRow";

const TaskTable = ({ tasks, handleDelete }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Assigned To</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskRow key={task._id} task={task} handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
