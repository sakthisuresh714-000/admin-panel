import axios from "axios";
import { useState } from "react";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/forgot-password",
      { email }
    );

    alert("Reset Link Sent");
  };

  return (
    <div className="login-container">

      <form
        className="login-card"
        onSubmit={submit}
      >

        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button>
          Send Link
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;