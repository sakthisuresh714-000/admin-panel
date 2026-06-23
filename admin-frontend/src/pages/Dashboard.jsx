import { useEffect, useState } from "react";

import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [data, setData] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const res =
        await API.get(
          "/dashboard"
        );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />

      

        <Navbar />
<div className="main-content">

        <div className="dashboard-header">
          <h3>Dashboard</h3>

          <div className="heading-line"></div>
        </div>

        <div className="cards">

          <div className="card users-card">

            <div>

              <h3>
                Total Users
              </h3>

              <p>
                {data.totalUsers}
              </p>

            </div>

            <div className="card-icon users-icon">
              <FaUsers />
            </div>

          </div>

          <div className="card tasks-card">

            <div>

              <h3>
                Total Tasks
              </h3>

              <p>
                {data.totalTasks}
              </p>

            </div>

            <div className="card-icon tasks-icon">
              <FaTasks />
            </div>

          </div>

          <div className="card completed-card">

            <div>

              <h3>
                Completed
              </h3>

              <p>
                {data.completedTasks}
              </p>

            </div>

            <div className="card-icon completed-icon">
              <FaCheckCircle />
            </div>

          </div>

          <div className="card pending-card">

            <div>

              <h3>
                Pending
              </h3>

              <p>
                {data.pendingTasks}
              </p>

            </div>

            <div className="card-icon pending-icon">
              <FaClock />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;