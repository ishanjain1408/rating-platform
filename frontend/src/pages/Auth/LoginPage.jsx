import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { saveToken } from "../../services/authHelpers";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email, password });
      saveToken(res.token);
      setAuth(res.token, res.user);
      if (res.user.role === "System Administrator") navigate("/admin");
      else if (res.user.role === "Store Owner") navigate("/owner");
      else navigate("/stores");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
