import { useState } from "react";

import { createTask } from "../services/tasks.api";

const CreateTaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Low",
    dueDate: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await createTask(formData);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        onChange={changeHandler}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={changeHandler}
      />

      <input
        type="text"
        name="assignedTo"
        placeholder="Assign User ID"
        onChange={changeHandler}
      />

      <select name="priority" onChange={changeHandler}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input type="date" name="dueDate" onChange={changeHandler} />

      <button>Create Task</button>
    </form>
  );
};

export default CreateTaskForm;
