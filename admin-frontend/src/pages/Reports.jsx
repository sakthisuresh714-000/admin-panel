import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function Reports() {

  const [report, setReport] =
    useState({
      totalUsers: 0,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      progressTasks: 0
    });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {

    try {

      const res =
        await API.get("/reports");

      setReport(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const pieData = [
    {
      name: "Completed",
      value: report.completedTasks
    },
    {
      name: "Pending",
      value: report.pendingTasks
    },
    {
      name: "In Progress",
      value: report.progressTasks
    }
  ];

  const barData = [
    {
      name: "Users",
      value: report.totalUsers
    },
    {
      name: "Tasks",
      value: report.totalTasks
    }
  ];

  const COLORS = [
    "#10b981",
    "#f59e0b",
    "#3b82f6"
  ];

  return (
    <> <Navbar />
      <Sidebar />

      <div className="main-content">

       

        <div className="dashboard-header">

          <h2>
            Reports
          </h2>

          <div className="heading-line"></div>

        </div>

        <div className="cards">

          <div className="card">
            <h3>Total Users</h3>
            <p>{report.totalUsers}</p>
          </div>

          <div className="card">
            <h3>Total Tasks</h3>
            <p>{report.totalTasks}</p>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <p>{report.completedTasks}</p>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <p>{report.pendingTasks}</p>
          </div>

        </div>

        <div className="report-charts">

          <div className="chart-box">

            <h3>
              Task Status Report
            </h3>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {pieData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="chart-box">

            <h3>
              Users vs Tasks
            </h3>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={barData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  fill="#4f46e5"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </>
  );
}

export default Reports;