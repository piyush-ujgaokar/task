const TaskHistory = ({ logs }) => {
  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div key={log._id} className="border p-3">
          <p>{log.oldStatus}→{log.newStatus}</p>

          <p>By:{log.changedBy?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskHistory;
