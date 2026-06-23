import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import Navbar from "../components/Navbar";


function Users() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const addUser = async (e) => {
    e.preventDefault();

    await API.post(
      "/users",
      formData
    );

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });

    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(
      `/users/${id}`
    );

    fetchUsers();
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="head1-content1">
        <h1>Users</h1>
        <div className="heading-line1"></div>
        </div>
        
<div className="content">
        <form
          className="form-container"
          onSubmit={addUser}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="employee">
              Employee
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button className="btn">
            Add User
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>
                  <button
                    className="btn-danger"
                    onClick={() =>
                      deleteUser(
                        user._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;