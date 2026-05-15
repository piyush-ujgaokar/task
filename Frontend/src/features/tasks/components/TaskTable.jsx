import TaskRow from "./TaskRow";

const TaskTable = ({ tasks, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Title</th>
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Status</th>
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Assigned To</th>
            <th className="py-4 px-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <TaskRow key={task._id} task={task} handleDelete={handleDelete} />
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
