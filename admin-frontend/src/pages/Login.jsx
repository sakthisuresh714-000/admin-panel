import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";



function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }
  };

  return (
    <div className="login-container">

      <form
        className="login-box"
        onSubmit={loginUser}
      >

        <h2>
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <div className="forgot-password">
  <span
    onClick={() =>
      navigate("/forgot-password")
    }
  >
    Forgot Password?
  </span>
</div>

        <button>
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;