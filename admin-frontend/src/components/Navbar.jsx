import { FaSearch, FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const name =
    localStorage.getItem("name") ||
    "Admin";



  return (
    <div className="navbar">

      <div className="search-box-nav">
        <FaSearch />
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="nav-right">

        {name?.toLowerCase() === "admin" && (
          <button
            className="icon-btn"
            onClick={() =>
              navigate("/settings")
            }
          >
            <IoSettingsSharp />
          </button>
        )}

        <div className="profile">
          <FaUserCircle />
          <span>{name}</span>
        </div>

      </div>

    </div>
  );
}

export default Navbar;