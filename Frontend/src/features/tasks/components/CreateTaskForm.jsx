import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/tasks.api";

const CreateTaskForm = () => {
  const navigate = useNavigate();
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
    try {
      await createTask(formData);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Design Landing Page"
          onChange={changeHandler}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 bg-white/80"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          placeholder="Detailed description of the task..."
          onChange={changeHandler}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 bg-white/80 min-h-[120px]"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Assign To (User ID)</label>
          <input
            type="text"
            name="assignedTo"
            placeholder="User ID"
            onChange={changeHandler}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 bg-white/80"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
          <select 
            name="priority" 
            onChange={changeHandler}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 bg-white/80"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
        <input 
          type="date" 
          name="dueDate" 
          onChange={changeHandler} 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 bg-white/80"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
