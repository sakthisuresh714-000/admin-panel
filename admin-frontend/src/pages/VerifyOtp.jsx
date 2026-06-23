import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      alert(res.data.message);

      
      navigate("/reset-password", { state: { email } });

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={submitHandler}>
        <h2>Verify OTP</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="forgot-password">
          <span onClick={() => navigate("/forgot-password")}>
            Resend OTP
          </span>
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp;