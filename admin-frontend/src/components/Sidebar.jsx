import {
  Link,
  useNavigate,
} from "react-router-dom";
import { FaUsers ,FaUser ,FaTasks } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { FaSquarePollVertical } from "react-icons/fa6";

function Sidebar() {
  const navigate =
    useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="sidebar">
     <div className="sidebar-header">

      <h2>   Admin Panel</h2>

      <Link to="/dashboard">
        <MdDashboardCustomize /> Dashboard
      </Link>

      <Link to="/users">
        <FaUsers /> Users
      </Link>

      <Link to="/tasks">
        <FaTasks /> Tasks
      </Link>

      <Link to="/reports">
        <FaSquarePollVertical /> Reports
      </Link>

      <button
        className="btn"
        onClick={logout}
      >
       <IoMdLogOut />
 Logout
      </button>
    </div>

    </div>
  );
}

export default Sidebar;