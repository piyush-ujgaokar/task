const TaskFilters = ({ filters, setFilters }) => {
  return (
    <div className="flex gap-3 mb-5">
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,

            status: e.target.value,
          })
        }
      >
        <option value="">All Status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) =>
          setFilters({
            ...filters,

            priority: e.target.value,
          })
        }
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilters;
