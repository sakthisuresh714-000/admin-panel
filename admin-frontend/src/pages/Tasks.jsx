import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import Navbar from "../components/Navbar";


function Tasks() {
  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      assignedTo: "",
      status: "Pending",
    });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks =
    async () => {
      const res =
        await API.get("/tasks");

      setTasks(res.data);
    };

  const fetchUsers =
    async () => {
      const res =
        await API.get("/users");

      setUsers(res.data);
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const createTask =
    async (e) => {
      e.preventDefault();

      await API.post(
        "/tasks",
        formData
      );

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        status: "Pending",
      });

      fetchTasks();
    };

  const deleteTask =
    async (id) => {
      await API.delete(
        `/tasks/${id}`
      );

      fetchTasks();
    };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="head1-content1">
        <h1>Tasks</h1>
        <div className="heading-line1"></div>
        </div>
      <div className="content">
       

        <form
          className="form-container"
          onSubmit={createTask}
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={handleChange}
          />

          <select
            name="assignedTo"
            value={
              formData.assignedTo
            }
            onChange={handleChange}
          >
            <option value="">
              Select Employee
            </option>

            {users.map(
              (user) => (
                <option
                  key={user._id}
                  value={
                    user._id
                  }
                >
                  {user.name}
                </option>
              )
            )}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>
              Pending
            </option>

            <option>
              In Progress
            </option>

            <option>
              Completed
            </option>
          </select>

          <button className="btn">
            Create Task
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>
                  {task.title}
                </td>

                <td>
                  {
                    task
                      ?.assignedTo
                      ?.name
                  }
                </td>

                <td>
                  {task.status}
                </td>

                <td>
                  <button
                    className="btn-danger"
                    onClick={() =>
                      deleteTask(
                        task._id
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

export default Tasks;