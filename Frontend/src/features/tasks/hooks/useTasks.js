import { useEffect, useState } from "react";

import { getTasks, deleteTask } from "../services/tasks.api";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return {tasks,loading,handleDelete};
};

export default useTasks;
