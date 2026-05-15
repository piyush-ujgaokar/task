import { useEffect, useState } from "react";

import { getTaskById, getTaskLogs } from "../services/tasks.api";

const useTaskDetails = (id) => {
  const [task, setTask] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskById(id);
        const logsData = await getTaskLogs(id);

        setTask(taskData.task);
        setLogs(logsData.logs);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return {
    task,
    logs,
    loading,
  };
};

export default useTaskDetails;
