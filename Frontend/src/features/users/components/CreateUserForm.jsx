import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";

const CreateUserForm = () => {
  const { handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    reportsTo: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await handleRegister(formData);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={changeHandler}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={changeHandler}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={changeHandler}
      />

      <select name="role" onChange={changeHandler}>
        <option>Select Role</option>

        <option value="Admin">Admin</option>

        <option value="Manager">Manager</option>

        <option value="Employee">Employee</option>
      </select>

      <input
        type="text"
        name="reportsTo"
        placeholder="reportsTo User ID"
        onChange={changeHandler}
      />

      <button>Create User</button>
    </form>
  );
};

export default CreateUserForm;
